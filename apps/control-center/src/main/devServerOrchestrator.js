const { app, dialog } = require('electron');
const { spawn, execSync } = require('child_process');
const os = require('os');

let nextDevProcess = null;

function startManagedNextServer() {
  const isDev = process.env.NODE_ENV !== 'production';
  if (!isDev && app.isPackaged) return;

  console.log('[ARCHITECT] Spawning Next.js orchestration on port 3333...');
  
  nextDevProcess = spawn('npm', ['run', 'dev'], {
    // Note: __dirname is src/main now, so we need to point to the root of the next app.
    cwd: require('path').resolve(__dirname, '../../'),
    shell: true,
    stdio: 'pipe',
    env: { ...process.env, PORT: '3333', FORCE_COLOR: '1' }
  });

  nextDevProcess.stdout.on('data', (data) => {
    const output = data.toString();
    if (output.includes('ready on') || output.includes('started server on')) {
      console.log('[ARCHITECT] Next.js is READY on port 3333');
    }
  });

  nextDevProcess.stderr.on('data', (data) => {
    const output = data.toString();
    if (output.includes('address already in use')) {
      console.error('[ARCHITECT] FATAL: Port 3333 is already in use!');
      dialog.showErrorBox('Erro de Inicialização', 'A porta 3333 já está em uso. Encerre outros processos antes de iniciar o Control Center.');
    }
  });

  nextDevProcess.on('exit', (code) => {
    console.log(`[ARCHITECT] Next.js process exited with code ${code}`);
  });
}

function killManagedNextServer() {
  if (nextDevProcess) {
    console.log('[ARCHITECT] Cleaning up managed Next.js server...');
    try {
      if (os.platform() === 'win32') {
        execSync(`taskkill /pid ${nextDevProcess.pid} /T /F`, { stdio: 'ignore' });
      } else {
        nextDevProcess.kill('SIGKILL');
      }
    } catch (e) {
      console.warn('[ARCHITECT] Failed to kill Next.js process:', e.message);
    }
    nextDevProcess = null;
  }
}

function registerServerHandlers(ipcMain) {
  // Can add future handlers here
}

module.exports = {
  startManagedNextServer,
  killManagedNextServer,
  registerServerHandlers
};
