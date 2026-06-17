const { execSync, fork } = require('child_process');
const pty = require('node-pty');
const path = require('path');
const os = require('os');
const { getHistory, saveHistory } = require('./historyManager');

const terminalSessions = new Map();
let globalIsForging = false;
let globalForgePhase = 0;
let globalForgeLogs = [];
let currentForgeSessionId = null;
let currentForgeHistoryId = null;
let currentForgeMetrics = null;

const telemetryBatch = new Map();
let telemetryInterval = null;

function killSession(sessionId) {
  const session = terminalSessions.get(sessionId);
  if (session) {
    try {
      if (session.pty) {
        session.pty.kill();
      } else if (session.process) {
        if (os.platform() === 'win32') {
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

function killAllTerminalSessions() {
  for (const sessionId of terminalSessions.keys()) {
    killSession(sessionId);
  }
}

function registerForgeHandlers(ipcMain, mainWindow) {
  function safeSendIPC(channel, payload) {
    if (mainWindow && !mainWindow.isDestroyed() && !mainWindow.webContents.isDestroyed()) {
      try {
        if (channel === 'telemetry-raw') {
          const sId = payload.sessionId || 'unknown';
          const aId = payload.agentId || 'MAESTRO';
          const key = `${sId}_${aId}`;
          
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

  function addToLogBuffer(sessionId, data, agentId = 'MAESTRO') {
    const session = terminalSessions.get(sessionId);
    if (session) {
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
      
      if (session.type === 'forge' && agentId === 'MAESTRO') {
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

      if (session.logBuffers[agentId].length > 1000) {
        session.logBuffers[agentId] = session.logBuffers[agentId].slice(-800);
      }
    }
  }

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

  ipcMain.on('forge.start', (event, { category, theme, tier, sessionId }) => {
    const id = 'MAESTRO';
    currentForgeSessionId = id;
    currentForgeHistoryId = Date.now().toString();
    currentForgeMetrics = null;
    
    console.log(`[BACKEND] Iniciando Forja: ID=${id}, HistoryID=${currentForgeHistoryId}, Tier=${tier}, Theme=${theme}`);
    killSession(id);
    
    const history = getHistory();
    history.unshift({
      id: currentForgeHistoryId,
      startTime: new Date().toISOString(),
      category: category || 'Uncategorized',
      theme: theme || 'Default',
      tier: tier || 1,
      status: 'running',
      endTime: null,
      durationMs: null
    });
    saveHistory(history);

    globalIsForging = true;
    globalForgePhase = 0;
    globalForgeLogs = ["🔥 Motor de combustão iniciado..."];

    const projectRoot = path.resolve(__dirname, '../../../../');
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
          if (message.payload.metrics) currentForgeMetrics = message.payload.metrics;
          safeSendIPC('forge-completed', { sessionId: id, code: message.payload.code || 0 });
        } else if (message.channel === 'forge-status') {
          try {
            const phase = message.payload?.phase;
            if (typeof phase === 'number') {
              globalForgePhase = phase;
              safeSendIPC('forge-phase', { sessionId: id, phase: globalForgePhase });

              const status = `Avançando para a fase ${globalForgePhase}`;
              const statusMsg = `\r\n\x1b[32m[STATUS]\x1b[0m ${status}\r\n`;
              const agentId = swarmRouter(statusMsg);
              
              addToLogBuffer(id, statusMsg, agentId);
              safeSendIPC('forge-ui-log', { sessionId: id, message: status });
              safeSendIPC('telemetry-raw', { sessionId: id, agentId, data: statusMsg });
            }
          } catch (err) {
            console.error('[ForgeRunner] IPC Error:', err);
            safeSendIPC('forge-ui-log', { sessionId: id, message: '[System] Erro interno IPC: ' + err.message });
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
      setTimeout(() => {
        safeSendIPC('forge-completed', { sessionId: id, code: 1, error: err.message });
      }, 100);
      globalIsForging = false;
      
      if (currentForgeHistoryId) {
        const history = getHistory();
        const entry = history.find(h => h.id === currentForgeHistoryId);
        if (entry) {
          entry.endTime = new Date().toISOString();
          entry.status = 'error';
          entry.durationMs = new Date(entry.endTime).getTime() - new Date(entry.startTime).getTime();
          if (currentForgeMetrics) {
            entry.metrics = currentForgeMetrics;
          }
          saveHistory(history);
        }
      }
    });

    forgeProcess.on('exit', (code) => {
      console.log(`[BACKEND] Forja finalizada: ID=${id}, Code=${code}`);
      setTimeout(() => {
        safeSendIPC('forge-ended', { sessionId: id, exitCode: code });
      }, 100);
      
      if (currentForgeHistoryId) {
        const history = getHistory();
        const entry = history.find(h => h.id === currentForgeHistoryId);
        if (entry) {
          entry.endTime = new Date().toISOString();
          entry.status = code === 0 ? 'success' : 'failed';
          entry.durationMs = new Date(entry.endTime).getTime() - new Date(entry.startTime).getTime();
          if (currentForgeMetrics) {
            entry.metrics = currentForgeMetrics;
          }
          saveHistory(history);
        }
      }

      setTimeout(() => {
          terminalSessions.delete(id);
          if (terminalSessions.size === 0) globalIsForging = false;
      }, 5000);
    });
  });

  ipcMain.on('gemini.start', (event, sessionId) => {
    const id = sessionId || `gemini-${Date.now()}`;
    killSession(id);
    
    const projectRoot = path.resolve(__dirname, '../../../../');
    const shell = process.platform === 'win32' ? 'powershell.exe' : 'bash';
    
    const ptyProcess = pty.spawn(shell, ['-NoProfile', '-Command', 'agy --dangerously-skip-permissions'], {
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
      if (data.includes('Do you trust the contents of this project?')) {
        ptyProcess.write('Y\r');
      }
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
}

module.exports = { registerForgeHandlers, killAllTerminalSessions };
