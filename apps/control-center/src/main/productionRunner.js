const { fork } = require('child_process');
const path = require('path');
const os = require('os');

let productionProcess = null;

function setupProductionRunner(ipcMain, mainWindow) {
  function safeSendIPC(channel, payload) {
    if (mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.webContents.send(channel, payload);
    }
  }

  ipcMain.on('production.resume', () => {
    if (productionProcess && typeof productionProcess.send === 'function') {
      productionProcess.send('resume');
    }
  });

  ipcMain.on('production.start', (event, options) => {
    if (productionProcess) {
      console.log('[PRODUCTION] Já existe um processo em execução.');
      return;
    }

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
      safeSendIPC('production-event', data);
    });

    childProcess.on('exit', (exitCode) => {
      console.log(`[PRODUCTION] Motor finalizado com código: ${exitCode}`);
      safeSendIPC('production-status', { status: 'ended', exitCode });
      productionProcess = null;
    });
  });

  ipcMain.on('production.stop', () => {
    if (productionProcess) {
      productionProcess.kill();
      productionProcess = null;
      safeSendIPC('production-status', { status: 'stopped' });
    }
  });
}

module.exports = { setupProductionRunner };
