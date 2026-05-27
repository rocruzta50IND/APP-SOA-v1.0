const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const pty = require('node-pty');
const os = require('os');
const { execSync } = require('child_process');

let mainWindow;
let ptyProcess = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    }
  });

  const isDev = process.env.NODE_ENV !== 'production';
  if (isDev || !app.isPackaged) {
    mainWindow.loadURL('http://localhost:3000');
  } else {
    mainWindow.loadFile(path.join(__dirname, 'out/index.html'));
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
    killPty();
  });
}

function killPty() {
  if (ptyProcess) {
    try {
      if (os.platform() === 'win32') {
        execSync(`taskkill /pid ${ptyProcess.pid} /T /F`, { stdio: 'ignore' });
      } else {
        ptyProcess.kill();
      }
    } catch (e) {
      console.error('Error killing pty process:', e);
    }
    ptyProcess = null;
  }
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  killPty();
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('quit', () => {
  killPty();
});

ipcMain.on('terminal.into', (event, data) => {
  if (ptyProcess) {
    ptyProcess.write(data);
  }
});

ipcMain.on('forge.start', (event, { category, theme, tier }) => {
  killPty();

  const isWindows = os.platform() === 'win32';
  const shell = isWindows ? 'cmd.exe' : 'bash';

  const scriptPath = path.resolve(__dirname, '../../.scripts/auto-forge.mjs');
  const command = `node "${scriptPath}"`;

  ptyProcess = pty.spawn(shell, [], {
    name: 'xterm-color',
    cols: 80,
    rows: 30,
    cwd: path.resolve(__dirname, '../../'),
    env: {
        ...process.env,
        FORGE_CATEGORY: category || '',
        FORGE_THEME: theme || '',
        FORGE_TIER: String(tier || ''),
        FORCE_COLOR: '1',
    }
  });

  ptyProcess.onData((data) => {
    if (mainWindow) {
      mainWindow.webContents.send('terminal.incData', data);
    }
  });

  ptyProcess.onExit(({ exitCode, signal }) => {
    if (mainWindow) {
      mainWindow.webContents.send('forge.ended', exitCode);
    }
    ptyProcess = null;
  });

  ptyProcess.write(`${command}\r`);
});

ipcMain.on('forge.kill', () => {
  killPty();
});
