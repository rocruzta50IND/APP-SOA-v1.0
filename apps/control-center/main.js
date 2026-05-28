const { app, BrowserWindow, ipcMain, protocol, net } = require('electron');
const path = require('path');
const fs = require('fs');
const pty = require('node-pty');
const os = require('os');
const { execSync } = require('child_process');

let mainWindow;
let ptyProcess = null;
let globalIsForging = false;
let globalForgePhase = 0;

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
  // Protocol handler
  protocol.handle('forge', (request) => {
    const filePath = decodeURIComponent(request.url.replace('forge://', ''));
    return net.fetch('file:///' + filePath);
  });

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

ipcMain.handle('get-forge-status', () => {
  return { isForging: globalIsForging, phase: globalForgePhase };
});

ipcMain.handle('get-gallery-templates', async () => {
  const libraryPath = path.resolve(__dirname, '../../.templates/templates-library');
  const results = [];

  if (!fs.existsSync(libraryPath)) return [];

  try {
    const categories = fs.readdirSync(libraryPath, { withFileTypes: true })
      .filter(d => d.isDirectory())
      .map(d => d.name);

    for (const cat of categories) {
      const catPath = path.join(libraryPath, cat);
      const themes = fs.readdirSync(catPath, { withFileTypes: true })
        .filter(d => d.isDirectory())
        .map(d => d.name);

      for (const theme of themes) {
        const themePath = path.join(catPath, theme);
        const projects = fs.readdirSync(themePath, { withFileTypes: true })
          .filter(d => d.isDirectory())
          .map(d => d.name);

        for (const proj of projects) {
          const projPath = path.join(themePath, proj);
          const templateJsonPath = path.join(projPath, 'template.json');
          const previewDir = path.join(projPath, 'preview');

          if (fs.existsSync(templateJsonPath)) {
            const config = JSON.parse(fs.readFileSync(templateJsonPath, 'utf-8'));
            let previews = [];

            if (fs.existsSync(previewDir)) {
              previews = fs.readdirSync(previewDir)
                .filter(f => /\.(webp|png|jpg|jpeg)$/i.test(f))
                .map(f => `forge://${path.join(previewDir, f)}`);
            }

            results.push({
              id: `${cat}-${theme}-${proj}`,
              category: cat,
              theme: theme,
              name: proj,
              description: config.description,
              previews: previews,
              path: projPath,
              relativePath: path.relative(path.join(__dirname, '../../'), projPath)
            });
          }
        }
      }
    }
  } catch (err) {
    console.error('Error fetching gallery:', err);
  }

  return results;
});

ipcMain.handle('delete-template', async (event, templatePath) => {
  const libraryPath = path.resolve(__dirname, '../../.templates/templates-library');
  
  const absolutePath = path.isAbsolute(templatePath) 
    ? templatePath 
    : path.resolve(libraryPath, templatePath);
  
  // Security check: ensure the path is within templates-library
  if (!absolutePath.startsWith(libraryPath)) {
    throw new Error('Unauthorized deletion path: ' + absolutePath);
  }

  try {
    if (fs.existsSync(absolutePath)) {
      // Blindagem: Recursively find and unlink junctions/symlinks before rmSync
      const cleanDirectory = (dir) => {
        const items = fs.readdirSync(dir, { withFileTypes: true });
        for (const item of items) {
          const fullPath = path.join(dir, item.name);
          if (item.isSymbolicLink() || (process.platform === 'win32' && item.isDirectory())) {
            // No Windows, junctions aparecem como diretórios, mas precisamos checar se são links
            const stats = fs.lstatSync(fullPath);
            if (stats.isSymbolicLink()) {
              fs.unlinkSync(fullPath);
            } else if (process.platform === 'win32') {
              // Checagem extra para Junctions reais que o withFileTypes pode não pegar como isSymbolicLink
              try {
                // Se for um link, isso remove apenas o link. Se for pasta real, não faz nada.
                fs.unlinkSync(fullPath); 
              } catch (e) {
                if (item.isDirectory()) cleanDirectory(fullPath);
              }
            }
          } else if (item.isDirectory()) {
            cleanDirectory(fullPath);
          }
        }
      };

      // Se for diretório, limpa links internos primeiro
      if (fs.lstatSync(absolutePath).isDirectory()) {
        try { cleanDirectory(absolutePath); } catch (e) { console.error('Link cleanup error:', e); }
      }

      fs.rmSync(absolutePath, { recursive: true, force: true });
      return { success: true };
    }
    return { success: false, error: 'Path not found' };
  } catch (err) {
    console.error('Error deleting template:', err);
    return { success: false, error: err.message };
  }
});

ipcMain.on('forge.start', (event, { category, theme, tier }) => {
  killPty();
  globalIsForging = true;
  globalForgePhase = 0;

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

      const dataStr = data.toString();
      if (dataStr.includes('SUCESSO ABSOLUTO!')) {
        globalIsForging = false;
        if (mainWindow && mainWindow.webContents) {
          mainWindow.webContents.send('forge-completed', 0);
        }
      }

      if (dataStr.includes("Fase 1")) {
        globalForgePhase = 1;
        mainWindow.webContents.send('forge-phase', 1);
      } else if (dataStr.includes("Fase 2")) {
        globalForgePhase = 2;
        mainWindow.webContents.send('forge-phase', 2);
      } else if (dataStr.includes("Fase 3")) {
        globalForgePhase = 3;
        mainWindow.webContents.send('forge-phase', 3);
      } else if (dataStr.includes("Fase 4 (Empacotar)")) {
        globalForgePhase = 4;
        mainWindow.webContents.send('forge-phase', 4);
      }
    }
  });

  ptyProcess.onExit(({ exitCode, signal }) => {
    globalIsForging = false;
    if (mainWindow && mainWindow.webContents) {
      mainWindow.webContents.send('forge.ended', exitCode);
      mainWindow.webContents.send('forge-completed', exitCode);
    }
    ptyProcess = null;
  });

  ptyProcess.write(`${command}\r`);
});

ipcMain.on('forge.kill', () => {
  globalIsForging = false;
  killPty();
});
