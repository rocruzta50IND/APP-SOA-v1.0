const { app, BrowserWindow, ipcMain, protocol, net, dialog } = require('electron');
const path = require('path');
const fs = require('fs');
const os = require('os');
const { execSync, fork, spawn } = require('child_process');
const pty = require('node-pty');

let mainWindow;
let nextDevProcess = null;
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
          // Usar try-catch interno para evitar que erros de permissão ou processo já encerrado quebrem o app
          try {
            execSync(`taskkill /pid ${session.process.pid} /T /F`, { stdio: 'ignore' });
          } catch (e) {
            console.warn(`[BACKEND] Falha ao encerrar PID ${session.process.pid}:`, e.message);
            session.process.kill('SIGKILL');
          }
        } else {
          session.process.kill('SIGKILL');
        }
      }
    } catch (e) {
      console.error(`Error killing session ${sessionId}:`, e);
    } finally {
      terminalSessions.delete(sessionId);
    }
  }
}

function killAllSessions() {
  for (const sessionId of terminalSessions.keys()) {
    killSession(sessionId);
  }
  
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

// Register forge protocol
protocol.registerSchemesAsPrivileged([
  { scheme: 'forge', privileges: { standard: true, secure: true, supportFetchAPI: true, bypassCSP: true } }
]);

function startManagedNextServer() {
  const isDev = process.env.NODE_ENV !== 'production';
  if (!isDev && app.isPackaged) return;

  console.log('[ARCHITECT] Spawning Next.js orchestration on port 3333...');
  
  nextDevProcess = spawn('npm', ['run', 'dev'], {
    cwd: __dirname,
    shell: true,
    stdio: 'pipe',
    env: { ...process.env, PORT: '3333', FORCE_COLOR: '1' }
  });

  nextDevProcess.stdout.on('data', (data) => {
    const output = data.toString();
    // Silencioso por padrão, mas monitorando estado
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
    killAllSessions();
  });
}

app.whenReady().then(() => {
  // Start dev server before window if in dev
  startManagedNextServer();

  // Protocol handler with security validation
  protocol.handle('forge', (request) => {
    try {
      const projectRoot = path.resolve(__dirname, '../../');
      const rawPath = decodeURIComponent(request.url.replace('forge://', ''));
      const absolutePath = path.resolve(projectRoot, rawPath);

      // Security Check: Block access outside the project root
      if (!absolutePath.startsWith(projectRoot)) {
        console.error('Security: forge:// blocked out-of-bounds access:', absolutePath);
        return new Response('Access Denied', { status: 403 });
      }

      // Formatar URL corretamente para Windows
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
  killAllSessions();
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('quit', () => {
  killAllSessions();
});

// --- TELEMETRY & PERSISTENCE HELPERS ---

let currentForgeSessionId = null;

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

ipcMain.handle('get-active-session', (event, sessionId) => {
  // Se não passar ID, tenta retornar a forja atual
  const targetId = sessionId || currentForgeSessionId;
  console.log(`[BACKEND] Buscando sessão ativa: ${targetId}`);
  
  if (targetId) {
    const session = terminalSessions.get(targetId);
    if (session) {
      const formattedBuffers = {};
      if (session.logBuffers) {
        for (const [key, val] of Object.entries(session.logBuffers)) {
          formattedBuffers[key] = Array.isArray(val) ? val.join('') : val;
        }
      } else if (session.logBuffer) {
        formattedBuffers['orchestrator'] = Array.isArray(session.logBuffer) ? session.logBuffer.join('') : session.logBuffer;
      }

      return {
        id: targetId,
        name: session.name,
        type: session.type,
        logBuffers: formattedBuffers
      };
    }
  }
  return null;
});

ipcMain.handle('get-session-logs', (event, sessionId) => {
  const session = terminalSessions.get(sessionId);
  if (!session) return '';
  
  if (session.logBuffers) {
    return Object.values(session.logBuffers).map(b => Array.isArray(b) ? b.join('') : b).join('\n');
  }
  return (Array.isArray(session.logBuffer) ? session.logBuffer.join('') : session.logBuffer) || '';
});

function addToLogBuffer(sessionId, data, agentId = 'MAESTRO') {
  const session = terminalSessions.get(sessionId);
  if (session) {
    // Blindagem agressiva: Garantir que 'data' seja sempre String e tratar lixo
    const text = typeof data === 'string' ? data : (Array.isArray(data) ? data.join('') : String(data || ''));
    const safeData = text || '';
    
    if (!session.logBuffers) {
      session.logBuffers = { 'MAESTRO': session.logBuffer ? [session.logBuffer] : [] };
      delete session.logBuffer;
    }
    
    if (!session.logBuffers[agentId]) session.logBuffers[agentId] = [];
    
    if (!Array.isArray(session.logBuffers[agentId])) {
      session.logBuffers[agentId] = [session.logBuffers[agentId]];
    }
    
    session.logBuffers[agentId].push(safeData);
    
    // Sincronizar logs globais se for a forja atual para a página inicial
    if (session.type === 'forge' && agentId === 'MAESTRO') {
        // Extrair texto limpo (sem ANSI) para o mini-log da Home - Blindagem .replace
        const cleanData = (typeof safeData === 'string' ? safeData : String(safeData))
            .replace(/\x1b\[[0-9;]*m/g, '')
            .trim();
            
        if (cleanData && !globalForgeLogs.includes(cleanData)) {
            globalForgeLogs.push(cleanData);
            if (globalForgeLogs.length > 100) {
                globalForgeLogs = globalForgeLogs.slice(-100);
            }
        }
    }

    // Estrutura de fila (array delimitado) - máximo de 1000 chunks
    if (session.logBuffers[agentId].length > 1000) {
      session.logBuffers[agentId] = session.logBuffers[agentId].slice(-800);
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
  return { 
    isForging: globalIsForging, 
    phase: globalForgePhase, 
    logs: globalForgeLogs,
    sessionId: currentForgeSessionId 
  };
});

ipcMain.handle('get-library-categories', async () => {
  const libraryPath = path.resolve(__dirname, '../../.templates/templates-library');
  if (!fs.existsSync(libraryPath)) return [];
  try {
    return fs.readdirSync(libraryPath, { withFileTypes: true })
      .filter(d => d.isDirectory())
      .map(d => d.name);
  } catch (err) {
    console.error('Error fetching categories:', err);
    return [];
  }
});

ipcMain.handle('create-library-category', async (event, categoryName) => {
  if (!categoryName || typeof categoryName !== 'string') return { success: false, error: 'Invalid name' };
  
  // Basic path traversal validation
  if (categoryName.includes('..') || categoryName.includes('/') || categoryName.includes('\\')) {
    return { success: false, error: 'Invalid characters in category name' };
  }

  const libraryPath = path.resolve(__dirname, '../../.templates/templates-library');
  const targetPath = path.join(libraryPath, categoryName);

  // Additional security check
  if (!path.normalize(targetPath).toLowerCase().startsWith(path.normalize(libraryPath).toLowerCase())) {
    return { success: false, error: 'Path validation failed' };
  }

  try {
    if (!fs.existsSync(targetPath)) {
      fs.mkdirSync(targetPath, { recursive: true });
    }
    return { success: true };
  } catch (err) {
    console.error('Error creating category:', err);
    return { success: false, error: err.message };
  }
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
    : path.resolve(__dirname, '../../', templatePath);
  
  // LOGGING PARA DEBUG - YOLO MODE
  const logFile = path.resolve(__dirname, 'delete_debug.log');
  fs.appendFileSync(logFile, `[${new Date().toISOString()}] templatePath: ${templatePath}\n`);
  fs.appendFileSync(logFile, `[${new Date().toISOString()}] libraryPath: ${libraryPath}\n`);
  fs.appendFileSync(logFile, `[${new Date().toISOString()}] absolutePath: ${absolutePath}\n`);
  fs.appendFileSync(logFile, `[${new Date().toISOString()}] Exists: ${fs.existsSync(absolutePath)}\n`);

  console.log('[DEBUG-DELETE] templatePath received:', templatePath);
  console.log('[DEBUG-DELETE] libraryPath:', libraryPath);
  console.log('[DEBUG-DELETE] absolutePath resolved to:', absolutePath);
  console.log('[DEBUG-DELETE] Exists?', fs.existsSync(absolutePath));

  // Security check: ensure the path is within templates-library
  if (!path.normalize(absolutePath).toLowerCase().startsWith(path.normalize(libraryPath).toLowerCase())) {
    fs.appendFileSync(logFile, `[${new Date().toISOString()}] SECURITY FAIL\n`);
    console.error('[DEBUG-DELETE] Security check failed!');
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

ipcMain.handle('export-template', async (event, relativePath) => {
  const projectRoot = path.resolve(__dirname, '../../');
  const sourceDir = path.resolve(projectRoot, relativePath);
  const libraryPath = path.resolve(projectRoot, '.templates/templates-library');

  // 1. Validation & Security
  if (!fs.existsSync(sourceDir)) return { success: false, error: 'Source directory not found' };
  
  // Security check: ensure the path is within templates-library
  if (!path.normalize(sourceDir).toLowerCase().startsWith(path.normalize(libraryPath).toLowerCase())) {
    return { success: false, error: 'Unauthorized export path' };
  }

  const { filePath } = await dialog.showSaveDialog({
    title: 'Exportar Projeto',
    defaultPath: `${path.basename(sourceDir)}.zip`,
    filters: [{ name: 'Arquivos ZIP', extensions: ['zip'] }]
  });

  if (!filePath) return { success: false, error: 'Cancelado pelo usuário' };

  return new Promise((resolve) => {
    let isResolved = false;
    try {
      const archiver = require('archiver');
      const output = fs.createWriteStream(filePath);
      const archive = archiver('zip', { zlib: { level: 9 } });

      output.on('close', () => {
        if (!isResolved) {
          isResolved = true;
          resolve({ success: true, path: filePath });
        }
      });

      // Robust error handling
      output.on('error', (err) => {
        if (!isResolved) {
          isResolved = true;
          resolve({ success: false, error: 'Write stream error: ' + err.message });
        }
      });

      archive.on('error', (err) => {
        if (!isResolved) {
          isResolved = true;
          resolve({ success: false, error: 'Archiver error: ' + err.message });
        }
      });

      // Tratar warnings sem quebrar o processo
      archive.on('warning', (err) => {
        console.warn('Archiver Warning:', err.message);
      });

      archive.pipe(output);
      archive.directory(sourceDir, false);
      archive.finalize();
    } catch (err) {
      if (!isResolved) {
        isResolved = true;
        resolve({ success: false, error: 'Erro ao carregar biblioteca: ' + err.message });
      }
    }
  });
});

const telemetryBatch = new Map();
let telemetryInterval = null;

// --- GLOBAL ERROR HANDLING ---
process.on('uncaughtException', (error) => {
  console.error('[CRITICAL ERROR] Uncaught Exception:', error);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('[CRITICAL ERROR] Unhandled Rejection at:', promise, 'reason:', reason);
});

function safeSendIPC(channel, payload) {
  if (mainWindow && !mainWindow.isDestroyed() && !mainWindow.webContents.isDestroyed()) {
    try {
      if (channel === 'telemetry-raw') {
        const sId = payload.sessionId || 'unknown';
        const aId = payload.agentId || 'MAESTRO';
        const key = `${sId}_${aId}`;
        
        // Blindagem de payload.data
        const rawData = payload.data;
        const safeData = typeof rawData === 'string' ? rawData : (Array.isArray(rawData) ? rawData.join('') : String(rawData || ''));

        if (!telemetryBatch.has(key)) {
          telemetryBatch.set(key, '');
        }
        telemetryBatch.set(key, telemetryBatch.get(key) + safeData);
        
        if (!telemetryInterval) {
          telemetryInterval = setInterval(() => {
            if (telemetryBatch.size === 0) {
              clearInterval(telemetryInterval);
              telemetryInterval = null;
              return;
            }
            if (mainWindow && !mainWindow.isDestroyed() && !mainWindow.webContents.isDestroyed()) {
              telemetryBatch.forEach((batchedData, batchKey) => {
                const [batchedSId, batchedAId] = batchKey.split('_');
                mainWindow.webContents.send('telemetry-raw', { sessionId: batchedSId, agentId: batchedAId, data: batchedData });
              });
            }
            telemetryBatch.clear();
          }, 16);
        }
        return;
      }
      
      mainWindow.webContents.send(channel, payload);
    } catch (e) {
      console.warn(`[IPC] Failed to send on channel ${channel}:`, e.message);
    }
  }
}

ipcMain.on('forge.start', (event, { category, theme, tier, sessionId }) => {
  // FORÇAR ID ÚNICO PARA A FORJA PARA EVITAR AMNÉSIA
  const id = 'MAESTRO';
  currentForgeSessionId = id;
  
  console.log(`[BACKEND] Iniciando Forja: ID=${id}`);
  killSession(id);
  
  globalIsForging = true;
  globalForgePhase = 0;
  globalForgeLogs = ["🔥 Motor de combustão iniciado..."];

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
    logBuffers: { 'MAESTRO': [] }
  });

  safeSendIPC('telemetry.session-started', {
    sessionId: id,
    name: `Forge: ${category || 'Template'}`,
    type: 'forge'
  });

  const swarmRouter = (dataStr) => {
    if (!dataStr || typeof dataStr !== 'string') return 'MAESTRO';
    const match = dataStr.match(/\[([A-Z]+)\]/);
    return match ? match[1] : 'MAESTRO';
  };

  forgeProcess.on('message', (message) => {
    if (message && message.channel && message.payload) {
      if (message.channel === 'forge-completed') {
        globalIsForging = false;
        safeSendIPC('forge-completed', { sessionId: id, code: message.payload.code || 0 });
      } else if (message.channel === 'forge-status') {
        const status = typeof message.payload === 'string' 
          ? message.payload 
          : (message.payload.message || '');
        
        if (status && typeof status === 'string') {
          let newPhase = -1;
          if (status.includes('Fase 1')) newPhase = 0;
          else if (status.includes('Fase 2a')) newPhase = 1;
          else if (status.includes('Enxame')) newPhase = 2;
          else if (status.includes('Fase 2c')) newPhase = 3;
          else if (status.includes('Fase 3')) newPhase = 4;
          else if (status.includes('Fase 4')) newPhase = 5;

          if (newPhase !== -1) {
            globalForgePhase = newPhase;
            safeSendIPC('forge-phase', { sessionId: id, phase: globalForgePhase });
          }

          const statusMsg = `\r\n\x1b[32m[STATUS]\x1b[0m ${status}\r\n`;
          const agentId = swarmRouter(statusMsg);
          
          addToLogBuffer(id, statusMsg, agentId);
          safeSendIPC('forge-ui-log', { sessionId: id, message: status });
          safeSendIPC('telemetry-raw', { sessionId: id, agentId, data: statusMsg });
        }
      } else if (message.channel === 'telemetry-raw') {
        const payload = message.payload;
        const data = payload.data || (typeof payload === 'string' ? payload : JSON.stringify(payload));
        const agentId = payload.agentId || swarmRouter(data);
        
        addToLogBuffer(id, data, agentId);
        safeSendIPC('telemetry-raw', { sessionId: id, agentId, data });
      }
    }
  });

  forgeProcess.stdout.on('data', (data) => {
    if (!data) return;
    const output = data.toString();
    const agentId = swarmRouter(output);
    
    addToLogBuffer(id, output, agentId);
    safeSendIPC('telemetry-raw', { sessionId: id, agentId, data: output });
  });

  forgeProcess.stderr.on('data', (data) => {
    if (!data) return;
    const output = data.toString();
    const agentId = swarmRouter(output);
    
    addToLogBuffer(id, output, agentId);
    safeSendIPC('telemetry-raw', { sessionId: id, agentId, data: output });
  });

  forgeProcess.on('error', (err) => {
    console.error(`[BACKEND] Erro crítico no processo de Forja:`, err);
    safeSendIPC('forge-completed', { sessionId: id, code: 1, error: err.message });
    globalIsForging = false;
  });

  forgeProcess.on('exit', (code) => {
    console.log(`[BACKEND] Forja finalizada: ID=${id}, Code=${code}`);
    safeSendIPC('forge-ended', { sessionId: id, exitCode: code });
    setTimeout(() => {
        terminalSessions.delete(id);
        if (terminalSessions.size === 0) globalIsForging = false;
    }, 5000);
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

  safeSendIPC('telemetry.session-started', { 
    sessionId: id, 
    name: `Gemini YOLO: ${id.split('-')[1] || id}`, 
    type: 'gemini' 
  });

  ptyProcess.onData((data) => {
    addToLogBuffer(id, data);
    safeSendIPC('telemetry-raw', { sessionId: id, data });
  });

  ptyProcess.onExit(({ exitCode }) => {
    safeSendIPC('telemetry-raw', { 
      sessionId: id, 
      data: `\r\n\x1b[33m[SISTEMA] Processo Gemini finalizado com código: ${exitCode}\x1b[0m\r\n` 
    });
    terminalSessions.delete(id);
  });
});
