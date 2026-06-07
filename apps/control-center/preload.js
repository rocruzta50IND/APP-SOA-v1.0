const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  // Terminal Input
  sendTerminalData: (sessionId, data) => ipcRenderer.send('terminal.into', { sessionId, data }),
  killSession: (sessionId) => ipcRenderer.send('terminal.kill', sessionId),

  // Forge Lifecycle
  startForge: (options) => ipcRenderer.send('forge.start', options),
  onForgeEnded: (callback) => {
    const handler = (event, payload) => {
        // Compatibility: Handle both session object and legacy primitive
        const exitCode = typeof payload === 'object' && payload !== null && 'exitCode' in payload ? payload.exitCode : payload;
        callback(exitCode);
    };
    ipcRenderer.on('forge-ended', handler);
    return () => ipcRenderer.removeListener('forge-ended', handler);
  },
  onForgeCompleted: (callback) => {
    const handler = (_event, payload) => {
        const code = typeof payload === 'object' && payload !== null && 'code' in payload ? payload.code : payload;
        callback(code);
    };
    ipcRenderer.on('forge-completed', handler);
    return () => ipcRenderer.removeListener('forge-completed', handler);
  },
  onForgePhase: (callback) => {
    const handler = (_event, payload) => {
        const phase = typeof payload === 'object' && payload !== null && 'phase' in payload ? payload.phase : payload;
        callback(phase);
    };
    ipcRenderer.on('forge-phase', handler);
    return () => ipcRenderer.removeListener('forge-phase', handler);
  },
  onForgeStatus: (callback) => {
    const handler = (_event, payload) => {
        // Strict extraction of the string message
        const message = typeof payload === 'object' && payload !== null && 'payload' in payload 
            ? payload.payload 
            : (typeof payload === 'string' ? payload : JSON.stringify(payload));
        callback(message);
    };
    ipcRenderer.on('forge-status', handler);
    return () => ipcRenderer.removeListener('forge-status', handler);
  },
  onForgeUILog: (callback) => {
    const handler = (_event, payload) => {
        const message = typeof payload === 'object' && payload !== null && 'message' in payload 
            ? payload.message 
            : payload;
        callback(message);
    };
    ipcRenderer.on('forge-ui-log', handler);
    return () => ipcRenderer.removeListener('forge-ui-log', handler);
  },

  // Gemini Lifecycle
  startGemini: (sessionId) => ipcRenderer.send('gemini.start', sessionId),

  // Telemetry
  onRawTelemetry: (callback) => {
    const handler = (_event, payload) => callback(payload);
    ipcRenderer.on('telemetry-raw', handler);
    return () => ipcRenderer.removeListener('telemetry-raw', handler);
  },

  onSessionStarted: (callback) => {
    const handler = (_event, session) => callback(session);
    ipcRenderer.on('telemetry.session-started', handler);
    return () => ipcRenderer.removeListener('telemetry.session-started', handler);
  },

  getActiveSessions: () => ipcRenderer.invoke('get-active-sessions'),
  getActiveSession: (sessionId) => ipcRenderer.invoke('get-active-session', sessionId),
  getSessionLogs: (sessionId) => ipcRenderer.invoke('get-session-logs', sessionId),

  // Production Engine
  startProduction: () => ipcRenderer.send('production.start'),
  stopProduction: () => ipcRenderer.send('production.stop'),
  onProductionStatus: (callback) => {
    const handler = (_event, payload) => callback(payload);
    ipcRenderer.on('production-status', handler);
    return () => ipcRenderer.removeListener('production-status', handler);
  },

  // Gallery & System
  getLibraryCategories: () => ipcRenderer.invoke('get-library-categories'),
  createLibraryCategory: (name) => ipcRenderer.invoke('create-library-category', name),
  getGalleryData: () => ipcRenderer.invoke('get-gallery-templates'),
  deployTemplate: (templatePath) => ipcRenderer.invoke('template.deploy', templatePath),
  getForgeStatus: () => ipcRenderer.invoke('get-forge-status'),
  deleteTemplate: (path) => ipcRenderer.invoke('delete-template', path),
  exportProject: (path) => ipcRenderer.invoke('export-template', path),
  
  // History & Dashboard
  getHistory: () => ipcRenderer.invoke('history:get-all'),
  getPaginatedHistory: (options) => ipcRenderer.invoke('history:get-paginated', options),
  clearHistory: () => ipcRenderer.invoke('history:clear'),
  getDashboardKPIs: () => ipcRenderer.invoke('dashboard:get-kpis'),
  getDashboardChartsData: () => ipcRenderer.invoke('dashboard:get-charts-data'),

  onPreviewReady: (callback) => {
    const handler = () => callback();
    ipcRenderer.on('preview-ready', handler);
    return () => ipcRenderer.removeListener('preview-ready', handler);
  },

  // Governor & System Integration
  getAgentsList: () => ipcRenderer.invoke('get-agents-list'),
  readMissionState: () => ipcRenderer.invoke('read-mission-state'),
  readRoadmap: () => ipcRenderer.invoke('read-roadmap'),
  getVaultTree: () => ipcRenderer.invoke('get-vault-tree'),
  readVaultFile: (filePath) => ipcRenderer.invoke('read-vault-file', filePath),
  startVaultWatch: () => ipcRenderer.invoke('start-vault-watch'),
});
