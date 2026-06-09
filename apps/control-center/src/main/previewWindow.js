const { BrowserWindow } = require('electron');

let previewWindow = null;

function setupPreviewWindow(ipcMain) {
  ipcMain.on('open-preview-window', (event, url) => {
    const loadWithRetry = (win, targetUrl, maxRetries = 10) => {
      win.loadURL(targetUrl).catch((err) => {
        if (err.code === 'ERR_CONNECTION_REFUSED' && maxRetries > 0) {
          console.log(`[IPC] Connection refused for ${targetUrl}. Retrying in 1s... (${maxRetries} left)`);
          setTimeout(() => {
            if (win && !win.isDestroyed()) {
              loadWithRetry(win, targetUrl, maxRetries - 1);
            }
          }, 1000);
        } else {
          console.error(`[IPC] Failed to load URL ${targetUrl}:`, err);
        }
      });
    };

    if (previewWindow && !previewWindow.isDestroyed()) {
      loadWithRetry(previewWindow, url);
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

    loadWithRetry(previewWindow, url);
    previewWindow.on('closed', () => {
      previewWindow = null;
    });
  });
}

module.exports = { setupPreviewWindow };
