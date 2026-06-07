const { app, BrowserWindow, ipcMain, protocol, net, shell } = require('electron');
const path = require('path');

const { registerHistoryHandlers } = require('./src/main/historyManager');
const { registerTemplateHandlers } = require('./src/main/templateManager');
const { registerForgeHandlers, killAllTerminalSessions } = require('./src/main/forgeRunner');
const { startManagedNextServer, killManagedNextServer, registerServerHandlers } = require('./src/main/devServerOrchestrator');
const { setupProductionRunner } = require('./src/main/productionRunner');

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
    registerForgeHandlers(ipcMain, mainWindow);
    registerServerHandlers(ipcMain);
    setupProductionRunner(ipcMain, mainWindow);

    // --- GOVERNOR MOCK ENDPOINTS ---
    ipcMain.handle('get-agents-list', () => {
      return [
        { name: 'Architect', status: 'idle' },
        { name: 'Guardian', status: 'active' },
        { name: 'Janitor', status: 'offline' },
        { name: 'Refiner', status: 'idle' }
      ];
    });

    ipcMain.handle('read-mission-state', () => {
      return {
        phase: 'Phase 3: Integration.',
        objective: 'Establish Governance UI.',
        progress: '45%'
      };
    });

    ipcMain.handle('read-roadmap', () => {
      return [
        { task: 'Define blueprint', status: 'completed' },
        { task: 'Implement mock UI', status: 'in-progress' },
        { task: 'Connect real data', status: 'pending' }
      ];
    });

    ipcMain.handle('get-vault-tree', () => {
      return [
        { name: '00-MASTER.md', type: 'file' },
        { name: '01-TRACKS.md', type: 'file' },
        { name: 'context.md', type: 'file' },
        { name: 'summary.md', type: 'file' }
      ];
    });

    ipcMain.handle('read-vault-file', (event, filePath) => {
      return `# Mock content for ${filePath}\n\nThis is static mock data.`;
    });

    ipcMain.handle('start-vault-watch', () => {
      console.log('[BACKEND] Mock: Started watching vault for changes');
      return { success: true };
    });

    ipcMain.on('open-external', (event, url) => {
      shell.openExternal(url);
    });

    let previewWindow = null;
    ipcMain.on('open-preview-window', (event, url) => {
      if (previewWindow && !previewWindow.isDestroyed()) {
        previewWindow.loadURL(url);
        previewWindow.focus();
        return;
      }

      previewWindow = new BrowserWindow({
        width: 1280,
        height: 800,
        backgroundColor: '#ffffff',
        autoHideMenuBar: true,
        webPreferences: {
          nodeIntegration: false,
          contextIsolation: true,
        }
      });

      previewWindow.loadURL(url);
      previewWindow.on('closed', () => {
        previewWindow = null;
      });
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
    killAllTerminalSessions();
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

      const fileUrl = 'file:///' + absolutePath.replace(/\\/g, '/');
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
  killAllTerminalSessions();
  killManagedNextServer();
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('quit', () => {
  killAllTerminalSessions();
  killManagedNextServer();
});
