const { app, BrowserWindow, ipcMain, protocol, net, shell } = require('electron');
const path = require('path');
const os = require('os');
const pty = require('node-pty');
const fs = require('fs');

const { registerHistoryHandlers } = require('./src/main/historyManager');
const { registerTemplateHandlers } = require('./src/main/templateManager');
const { startManagedNextServer, killManagedNextServer, registerServerHandlers } = require('./src/main/devServerOrchestrator');
const { setupProductionRunner } = require('./src/main/productionRunner');
const { registerGovernorMocks } = require('./src/main/governorMocks');
const { setupPreviewWindow } = require('./src/main/previewWindow');

let mainWindow;
let handlersRegistered = false;

// --- GLOBAL ERROR HANDLING ---
process.on('uncaughtException', (error) => {
  console.error('[CRITICAL ERROR] Uncaught Exception:', error);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('[CRITICAL ERROR] Unhandled Rejection at:', promise, 'reason:', reason);
});

// Register forge protocol
protocol.registerSchemesAsPrivileged([
  { scheme: 'forge', privileges: { standard: true, secure: true, supportFetchAPI: true, bypassCSP: true } }
]);

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    backgroundColor: '#09090b',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    }
  });

  // CORS Override as requested
  mainWindow.webContents.session.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Access-Control-Allow-Origin': ['*'],
        'x-frame-options': [] // Remove x-frame-options
      }
    });
  });

  // Register Handlers
  if (!handlersRegistered) {
    registerHistoryHandlers(ipcMain);
    registerTemplateHandlers(ipcMain, mainWindow);
    registerServerHandlers(ipcMain);
    setupProductionRunner(ipcMain, mainWindow);
    
    // --- MOCKS & UTILS REFACTORED ---
    registerGovernorMocks(ipcMain);
    setupPreviewWindow(ipcMain);

    // --- TERMINAL E SANDBOX FORJA ---
    let forgePtyProcess = null;

    ipcMain.on('gemini.start', (event, sessionId) => {
      if (forgePtyProcess) {
        try { forgePtyProcess.kill(); } catch (e) {}
      }

      // RESOLUÇÃO DINÂMICA DE CAMINHO (Procura a pasta .templates subindo a árvore)
      let currentDir = __dirname;
      let rootDir = currentDir;
      while (currentDir !== path.parse(currentDir).root) {
        if (fs.existsSync(path.join(currentDir, '.templates'))) {
          rootDir = currentDir;
          break;
        }
        currentDir = path.dirname(currentDir);
      }
      const sandboxPath = path.join(rootDir, '.templates', 'forge', 'sandbox');

      // FORÇA O WORKSPACE: Criação da pasta oculta .agents para ancorar a CLI na sandbox
      const geminiMarkerPath = path.join(sandboxPath, '.agents');
      if (!fs.existsSync(geminiMarkerPath)) {
        fs.mkdirSync(geminiMarkerPath, { recursive: true });
      }

      const shellCmd = os.platform() === 'win32' ? 'powershell.exe' : 'bash';
      const initMessage = `LOCAL DE TRABALHO EXCLUSIVAMENTE em [${sandboxPath}]`;
      const shellArgs = os.platform() === 'win32' 
        ? ['-NoProfile', '-Command', `agy --dangerously-skip-permissions -i \\"${initMessage}\\"`] 
        : ['-c', `agy --dangerously-skip-permissions -i "${initMessage}"`];

      forgePtyProcess = pty.spawn(shellCmd, shellArgs, {
        name: 'xterm-color',
        cols: 80,
        rows: 30,
        cwd: sandboxPath, // <-- Caminho resolvido OBRIGATORIAMENTE aqui para contenção
        env: { ...process.env, FORCE_COLOR: '1' }
      });

      forgePtyProcess.onData((data) => {
        if (mainWindow && !mainWindow.isDestroyed()) {
          mainWindow.webContents.send('telemetry-raw', {
            sessionId: sessionId || 'forge-session',
            agentId: 'MAESTRO',
            data: data.toString()
          });
        }
      });
    });

    ipcMain.on('terminal.into', (event, { sessionId, data }) => {
      if (forgePtyProcess) {
        forgePtyProcess.write(data);
      }
    });

    ipcMain.on('terminal.kill', () => {
      if (forgePtyProcess) {
        try { forgePtyProcess.kill(); } catch (e) {}
        forgePtyProcess = null;
      }
    });

    handlersRegistered = true;
  }

  const isDev = process.env.NODE_ENV !== 'production';
  if (isDev || !app.isPackaged) {
    const loadDevServer = () => {
      mainWindow.loadURL('http://localhost:3333').catch(() => {
        console.log('Waiting for Next.js dev server on port 3333...');
        setTimeout(loadDevServer, 1000);
      });
    };
    loadDevServer();
  } else {
    mainWindow.loadFile(path.join(__dirname, 'out/index.html'));
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
    killManagedNextServer();
  });
}

app.whenReady().then(() => {
  startManagedNextServer();

  protocol.handle('forge', (request) => {
    try {
      const projectRoot = path.resolve(__dirname, '../../');
      const rawPath = decodeURIComponent(request.url.replace('forge://', ''));
      const absolutePath = path.resolve(projectRoot, rawPath);

      if (!absolutePath.startsWith(projectRoot)) {
        console.error('Security: forge:// blocked out-of-bounds access:', absolutePath);
        return new Response('Access Denied', { status: 403 });
      }

      const { pathToFileURL } = require('url');
      const fileUrl = pathToFileURL(absolutePath).toString();
      return net.fetch(fileUrl);
    } catch (err) {
      console.error('Error in forge protocol handler:', err);
      return new Response('Internal Error', { status: 500 });
    }
  });

  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  killManagedNextServer();
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('quit', () => {
  killManagedNextServer();
});

// Listener IPC para o Leitor Biométrico (Main Process)
ipcMain.handle('start-biometric-scan', async (event) => {
  return new Promise((resolve) => {
    console.log('Iniciando scan biométrico (USB/Serial)...');
    
    // TODO: Implementar lógica do SDK nativo (node-hid, ffi-napi, etc)
    // Simulação do leitor biométrico:
    setTimeout(() => {
      resolve({ success: true, message: 'Digital validada', hash: 'A1B2C3D4' });
    }, 2000);
  });
});

