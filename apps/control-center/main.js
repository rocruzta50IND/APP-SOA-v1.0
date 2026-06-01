const { app, BrowserWindow, ipcMain, protocol, net } = require('electron');
const path = require('path');
const fs = require('fs');
const os = require('os');
const { execSync, fork } = require('child_process');
const pty = require('node-pty');

let mainWindow;
const terminalSessions = new Map();
let globalIsForging = false;
let globalForgePhase = 0;
let globalForgeLogs = [];

function killSession(sessionId) {
  const session = terminalSessions.get(sessionId);
  if (session) {
    try {
      if (session.pty) {
        session.pty.kill();
      } else if (session.process) {
        if (os.platform() === 'win32') {
          execSync(`taskkill /pid ${session.process.pid} /F`, { stdio: 'ignore' });
        } else {
          session.process.kill('SIGKILL');
        }
      }
    } catch (e) {
      console.error(`Error killing session ${sessionId}:`, e);
    }
    terminalSessions.delete(sessionId);
  }
}

function killAllSessions() {
  for (const sessionId of terminalSessions.keys()) {
    killSession(sessionId);
  }
}

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
    killAllSessions();
  });
}

app.whenReady().then(() => {
  // Protocol handler with security validation
  protocol.handle('forge', (request) => {
    try {
      const projectRoot = path.resolve(__dirname, '../../');
      const rawPath = decodeURIComponent(request.url.replace('forge://', ''));
      const normalizedPath = path.normalize(rawPath);

      // Security Check: Block access outside the project root
      if (!normalizedPath.startsWith(projectRoot)) {
        console.error('Security: forge:// blocked out-of-bounds access:', normalizedPath);
        return new Response('Access Denied', { status: 403 });
      }

      return net.fetch('file:///' + normalizedPath);
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
  killAllSessions();
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('quit', () => {
  killAllSessions();
});

// --- TELEMETRY & PERSISTENCE HELPERS ---

ipcMain.handle('get-active-sessions', () => {
  const active = [];
  terminalSessions.forEach((session, id) => {
    active.push({
      id,
      name: session.name || (session.type === 'forge' ? 'Forge Process' : 'Gemini Session'),
      type: session.type,
      status: 'running'
    });
  });
  return active;
});

ipcMain.handle('get-session-logs', (event, sessionId) => {
  const session = terminalSessions.get(sessionId);
  return session ? session.logBuffer : '';
});

function addToLogBuffer(sessionId, data) {
  const session = terminalSessions.get(sessionId);
  if (session) {
    if (!session.logBuffer) session.logBuffer = '';
    session.logBuffer += data;
    
    // Limit buffer to ~500KB to prevent memory issues
    if (session.logBuffer.length > 500000) {
      session.logBuffer = session.logBuffer.slice(-400000);
    }
  }
}

ipcMain.on('terminal.into', (event, { sessionId, data }) => {
  const session = terminalSessions.get(sessionId);
  if (session) {
    if (session.pty) session.pty.write(data);
    else if (session.process && session.process.stdin) session.process.stdin.write(data);
  }
});

ipcMain.on('terminal.kill', (event, sessionId) => {
  killSession(sessionId);
});

ipcMain.handle('get-forge-status', () => {
  return { isForging: globalIsForging, phase: globalForgePhase, logs: globalForgeLogs };
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
            const stats = fs.statSync(projPath);
            let imageFiles = [];

            if (fs.existsSync(previewDir)) {
              imageFiles = fs.readdirSync(previewDir)
                .filter(f => /\.(webp|png|jpg|jpeg)$/i.test(f));
            }

            results.push({
              id: `${cat}-${theme}-${proj}`,
              category: cat,
              theme: theme,
              name: proj,
              description: config.description || "No description available.",
              tier: config.tier || 1,
              images: imageFiles,
              createdAt: stats.birthtime || stats.ctime || new Date(),
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
            const stats = fs.lstatSync(fullPath);
            if (stats.isSymbolicLink()) {
              fs.unlinkSync(fullPath);
            } else if (process.platform === 'win32') {
              try {
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

ipcMain.on('forge.start', (event, { category, theme, tier, sessionId }) => {
  const id = sessionId || `forge-${Date.now()}`;
  killSession(id);
  
  globalIsForging = true;
  globalForgePhase = 0;
  globalForgeLogs = [];

  const projectRoot = path.resolve(__dirname, '../../');
  const scriptPath = path.join(projectRoot, '.scripts', 'auto-forge.mjs');

  const forgeProcess = fork(scriptPath, [], {
    cwd: projectRoot,
    stdio: ['pipe', 'pipe', 'pipe', 'ipc'],
    env: {
        ...process.env,
        FORGE_CATEGORY: category || '',
        FORGE_THEME: theme || '',
        FORGE_TIER: String(tier || ''),
        FORCE_COLOR: '1',
    }
  });

  terminalSessions.set(id, { 
    process: forgeProcess, 
    type: 'forge', 
    name: `Forge: ${category || 'Template'}`,
    logBuffer: '' 
  });

  if (mainWindow) {
    mainWindow.webContents.send('telemetry.session-started', { 
      sessionId: id, 
      name: `Forge: ${category || 'Template'}`, 
      type: 'forge' 
    });
  }

  forgeProcess.on('message', (message) => {
    if (mainWindow && message.channel && message.payload) {
      mainWindow.webContents.send(message.channel, message.payload);
      
      if (message.channel === 'forge-status') {
        const status = message.payload;
        
        let newPhase = -1;
        if (status.includes('Fase 1') || status.includes('Contexto')) newPhase = 0;
        else if (status.includes('Fase 2a') || status.includes('Arquiteto')) newPhase = 1;
        else if (status.includes('Enxame') || status.includes('Swarm')) newPhase = 2;
        else if (status.includes('Fase 2c') || status.includes('Costureiro')) newPhase = 3;
        else if (status.includes('Fase 3') || status.includes('Captura')) newPhase = 4;
        else if (status.includes('Fase 4') || status.includes('Empacotar')) newPhase = 5;

        if (newPhase !== -1) {
          globalForgePhase = newPhase;
          mainWindow.webContents.send('forge-phase', { sessionId: id, phase: globalForgePhase });
        }

        globalForgeLogs.push(status);
        mainWindow.webContents.send('forge-ui-log', { sessionId: id, message: status });
        addToLogBuffer(id, `\r\n\x1b[32m[STATUS]\x1b[0m ${status}\r\n`);
      }
    }
  });

  forgeProcess.stdout.on('data', (data) => {
    const output = data.toString();
    addToLogBuffer(id, output);
    if (mainWindow) {
      mainWindow.webContents.send('telemetry-raw', { sessionId: id, data: output });
      if (output.includes('[FORGE_SUCCESS]')) {
        globalIsForging = false;
        mainWindow.webContents.send('forge-completed', { sessionId: id, code: 0 });
      }
    }
  });

  forgeProcess.stderr.on('data', (data) => {
    const output = data.toString();
    addToLogBuffer(id, output);
    if (mainWindow) {
      mainWindow.webContents.send('telemetry-raw', { sessionId: id, data: output });
    }
  });

  forgeProcess.on('exit', (code) => {
    if (mainWindow) {
      mainWindow.webContents.send('forge.ended', { sessionId: id, exitCode: code });
    }
    terminalSessions.delete(id);
    if (terminalSessions.size === 0) globalIsForging = false;
  });
});

ipcMain.on('gemini.start', (event, sessionId) => {
  const id = sessionId || `gemini-${Date.now()}`;
  killSession(id);
  
  const projectRoot = path.resolve(__dirname, '../../');
  const shell = process.platform === 'win32' ? 'powershell.exe' : 'bash';
  
  const ptyProcess = pty.spawn(shell, ['-NoProfile', '-Command', 'gemini --yolo'], {
    name: 'xterm-color',
    cols: 80, rows: 30,
    cwd: projectRoot,
    env: { ...process.env, FORCE_COLOR: '1' }
  });

  terminalSessions.set(id, { 
    pty: ptyProcess, 
    type: 'gemini', 
    name: `Gemini YOLO: ${id.split('-')[1] || id}`,
    logBuffer: ''
  });

  if (mainWindow) {
    mainWindow.webContents.send('telemetry.session-started', { 
      sessionId: id, 
      name: `Gemini YOLO: ${id.split('-')[1] || id}`, 
      type: 'gemini' 
    });
  }

  ptyProcess.onData((data) => {
    addToLogBuffer(id, data);
    if (mainWindow) {
      mainWindow.webContents.send('telemetry-raw', { sessionId: id, data });
    }
  });

  ptyProcess.onExit(({ exitCode }) => {
    if (mainWindow) {
      mainWindow.webContents.send('telemetry-raw', { 
        sessionId: id, 
        data: `\r\n\x1b[33m[SISTEMA] Processo Gemini finalizado com código: ${exitCode}\x1b[0m\r\n` 
      });
    }
    terminalSessions.delete(id);
  });
});
