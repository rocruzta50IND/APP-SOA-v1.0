const { pty } = require('node-pty');
const path = require('path');
const os = require('os');

let productionProcess = null;

function setupProductionRunner(ipcMain, mainWindow) {
  function safeSendIPC(channel, payload) {
    if (mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.webContents.send(channel, payload);
    }
  }

  ipcMain.on('production.start', () => {
    if (productionProcess) {
      console.log('[PRODUCTION] Já existe um processo em execução.');
      return;
    }

    console.log('[PRODUCTION] Iniciando Motor da Fábrica MVP...');
    
    const projectRoot = path.resolve(__dirname, '../../../../');
    const scriptPath = path.join(projectRoot, '.scripts', 'auto-production.mjs');
    
    // Usamos spawn do node:child_process ou node-pty. 
    // Para o Motor de Produção, o prompt pede node-pty ou spawn. 
    // Vamos usar pty para permitir interação se necessário e telemetria rica.
    
    const shell = process.platform === 'win32' ? 'powershell.exe' : 'bash';
    const ptyProcess = require('node-pty').spawn(shell, [
      '-NoProfile', 
      '-Command', 
      `node ${scriptPath}`
    ], {
      name: 'xterm-color',
      cols: 80,
      rows: 30,
      cwd: projectRoot,
      env: { ...process.env, FORCE_COLOR: '1' }
    });

    productionProcess = ptyProcess;

    safeSendIPC('production-status', { status: 'started', phase: 'PHASE_DISCOVERY' });

    ptyProcess.onData((data) => {
      safeSendIPC('telemetry-raw', { 
        sessionId: 'PRODUCTION_ENGINE', 
        agentId: 'FACTORY_MANAGER', 
        data: data 
      });
    });

    ptyProcess.onExit(({ exitCode }) => {
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
