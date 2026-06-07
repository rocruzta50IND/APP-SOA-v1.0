const { fork } = require('child_process');
const path = require('path');
const os = require('os');

let productionProcess = null;
let isProductionRunning = false;
let currentTemplate = null;
let productionLogs = [];
let automationState = 'running'; // 'running', 'pause-requested', 'awaiting-input'
let isPaused = false;
let pauseMessage = "";

function setupProductionRunner(ipcMain, mainWindow) {
  function safeSendIPC(channel, payload) {
    if (mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.webContents.send(channel, payload);
    }
  }

  ipcMain.handle('get-production-status', () => {
    return {
      isProductionRunning,
      currentTemplate,
      productionLogs,
      automationState,
      isPaused,
      pauseMessage
    };
  });

  ipcMain.on('production.resume', () => {
    if (productionProcess && typeof productionProcess.send === 'function') {
      productionProcess.send('resume');
      isPaused = false;
      pauseMessage = "";
    }
  });

  ipcMain.on('production.pause-request', () => {
    if (productionProcess && typeof productionProcess.send === 'function') {
      productionProcess.send('pause-request');
      automationState = 'pause-requested';
    }
  });

  ipcMain.on('production.resume-auto', () => {
    if (productionProcess && typeof productionProcess.send === 'function') {
      productionProcess.send('resume-auto-request');
      automationState = 'running';
    }
  });

  ipcMain.on('production.manual-command', (event, command) => {
    if (productionProcess && typeof productionProcess.send === 'function') {
      productionProcess.send({ type: 'manual-mission-command', payload: command });
    }
  });

  ipcMain.on('production.start', (event, options) => {
    if (productionProcess) {
      console.log('[PRODUCTION] Já existe um processo em execução.');
      return;
    }

    isProductionRunning = true;
    productionLogs = [];
    automationState = 'running';
    isPaused = false;
    pauseMessage = "";
    // Se o backend souber o currentTemplate pelo setup event, ele atualizará,
    // mas por hora reseta o template se não vier de um setup anterior.
    // currentTemplate = options?.template || null;

    const command = options?.command || '';
    console.log(`[PRODUCTION] Iniciando Motor da Fábrica MVP com comando: ${command}`);
    
    const projectRoot = path.resolve(__dirname, '../../../../');
    const scriptPath = path.join(projectRoot, '.scripts', 'auto-production.mjs');
    
    const childProcess = fork(scriptPath, [command], { 
      cwd: projectRoot, 
      env: { ...process.env, FORCE_COLOR: '1' }, 
      stdio: ['pipe', 'pipe', 'pipe', 'ipc'] 
    });

    productionProcess = childProcess;

    safeSendIPC('production-status', { status: 'started', phase: 'PHASE_DISCOVERY' });

    childProcess.stdout.on('data', (data) => {
      safeSendIPC('telemetry-raw', { 
        sessionId: 'PRODUCTION_ENGINE', 
        agentId: 'FACTORY_MANAGER', 
        data: data.toString() 
      });
    });

    childProcess.stderr.on('data', (data) => {
      safeSendIPC('telemetry-raw', { 
        sessionId: 'PRODUCTION_ENGINE', 
        agentId: 'FACTORY_MANAGER', 
        data: data.toString() 
      });
    });

    childProcess.on('message', (data) => {
      if (data.type === 'log') {
        productionLogs.push(data.message);
      } else if (data.type === 'status' && data.message === 'awaiting-manual-input') {
        automationState = 'awaiting-input';
      } else if (data.type === 'pause') {
        isPaused = true;
        pauseMessage = data.message || 'Aguardando confirmação para continuar.';
      } else if (data.type === 'setup') {
        currentTemplate = data.payload.template;
      }
      safeSendIPC('production-event', data);
    });

    childProcess.on('exit', (exitCode) => {
      console.log(`[PRODUCTION] Motor finalizado com código: ${exitCode}`);
      isProductionRunning = false;
      safeSendIPC('production-status', { status: 'ended', exitCode });
      productionProcess = null;
    });
  });

  ipcMain.on('production.stop', () => {
    if (productionProcess) {
      productionProcess.kill();
      productionProcess = null;
      isProductionRunning = false;
      safeSendIPC('production-status', { status: 'stopped' });
    }
  });
}

module.exports = { setupProductionRunner };
