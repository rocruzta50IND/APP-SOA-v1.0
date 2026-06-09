const { fork } = require('child_process');
const path = require('path');
const os = require('os');
const pty = require('node-pty');
const fs = require('fs');

let productionProcess = null; // o script auto-production.mjs (que gerencia o sandbox)
let isProductionRunning = false;
let currentTemplate = null;
let productionLogs = [];
let automationState = 'running'; // 'running', 'pause-requested', 'awaiting-input'
let isPaused = false;
let pauseMessage = "";

// PTY Variables
let geminiPtyProcess = null;
let ptyJourneyMode = null; // 'mvp' or 'freeform'
let ptyBuffer = '';
let isClearPending = false;
let mvpLoopInterval = null;

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

  // --- AUTOMATED MVP ENGINE & PTY HOOKS ---

  function initializeGeminiPty() {
    if (geminiPtyProcess) return;

    const projectRoot = path.resolve(__dirname, '../../../../');
    const sandboxPath = path.join(projectRoot, 'environment-sandbox');
    const shell = os.platform() === 'win32' ? 'powershell.exe' : 'bash';
    const shellArgs = os.platform() === 'win32' ? ['-NoProfile', '-Command', 'gemini --yolo'] : ['-c', 'gemini --yolo'];

    console.log('[PTY] Iniciando sessão contínua do gemini CLI...');
    
    geminiPtyProcess = pty.spawn(shell, shellArgs, {
      cwd: sandboxPath,
      env: { ...process.env, FORCE_COLOR: '1' }
    });

    geminiPtyProcess.onData((data) => {
      safeSendIPC('production-event', { type: 'log', message: data });
      safeSendIPC('telemetry-raw', {
        sessionId: 'PRODUCTION_ENGINE',
        agentId: 'FACTORY_MANAGER',
        data: data
      });

      // Prompt Hooking
      ptyBuffer += data;
      
      const plainText = ptyBuffer.replace(/\x1B\[[0-9;]*[mK]/g, '');
      if (plainText.trimEnd().endsWith('>')) {
        ptyBuffer = ''; 
        if (ptyJourneyMode === 'mvp') {
          handleIdleMvp();
        }
      }
    });

    geminiPtyProcess.onExit(() => {
      geminiPtyProcess = null;
      console.log('[PTY] Sessão gemini CLI encerrada.');
    });
  }

  function handleIdleMvp() {
    const projectRoot = path.resolve(__dirname, '../../../../');
    const missionPath = path.join(projectRoot, '.agent', 'mission.md');
    const instructionsPath = path.join(projectRoot, '.agent', 'instructions.md');

    if (isClearPending) {
       geminiPtyProcess.write('/clear\r');
       isClearPending = false;
       return;
    }

    if (fs.existsSync(missionPath) && fs.existsSync(instructionsPath)) {
       const mission = fs.readFileSync(missionPath, 'utf-8');
       const instructions = fs.readFileSync(instructionsPath, 'utf-8');
       const cmd = `Siga rigorosamente as instruções e cumpra a missão atual. MISSION: ${mission} INSTRUCTIONS: ${instructions}`;
       
       geminiPtyProcess.write(cmd + '\r');
       
       fs.unlinkSync(missionPath);
       fs.unlinkSync(instructionsPath);
       isClearPending = true;
    }
  }

  ipcMain.on('production.start-engine', () => {
    console.log('[PTY] Modo Esteira MVP ativado.');
    ptyJourneyMode = 'mvp';
    isClearPending = false;
    initializeGeminiPty();

    // Cria um loop de checagem, caso a IA já esteja em Idle e o mission.md apareça DEPOIS.
    if (mvpLoopInterval) clearInterval(mvpLoopInterval);
    mvpLoopInterval = setInterval(() => {
        if (ptyJourneyMode === 'mvp' && geminiPtyProcess) {
            const projectRoot = path.resolve(__dirname, '../../../../');
            const missionPath = path.join(projectRoot, '.agent', 'mission.md');
            if (fs.existsSync(missionPath)) {
                // Ao invés de forçar a execução (o que poderia atropelar a IA caso não esteja Idle),
                // enviaremos um <Enter> falso (carriage return) para forçar um refresh de buffer e ativar o Prompt Hook
                geminiPtyProcess.write('\r');
            }
        }
    }, 10000);
  });

  ipcMain.on('production.run-freeform', (event, cmd) => {
    console.log(`[PTY] Sandbox Livre executando comando: ${cmd}`);
    ptyJourneyMode = 'freeform';
    if (mvpLoopInterval) clearInterval(mvpLoopInterval);
    
    initializeGeminiPty();
    
    // Despacha o comando direto
    if (geminiPtyProcess) {
      geminiPtyProcess.write(cmd + '\r');
    }
  });

  ipcMain.on('production.stop', () => {
    if (productionProcess) {
      productionProcess.kill();
      productionProcess = null;
    }
    if (geminiPtyProcess) {
      geminiPtyProcess.kill();
      geminiPtyProcess = null;
    }
    if (mvpLoopInterval) clearInterval(mvpLoopInterval);
    
    isProductionRunning = false;
    ptyJourneyMode = null;
    safeSendIPC('production-status', { status: 'stopped' });
  });
}

module.exports = { setupProductionRunner };
