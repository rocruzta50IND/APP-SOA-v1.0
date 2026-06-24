const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  // Terminal Input
  sendTerminalData: (sessionId, data) => ipcRenderer.send('terminal.into', { sessionId, data }),
  killSession: (sessionId) => ipcRenderer.send('terminal.kill', sessionId),

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
  sendToPty: (input) => ipcRenderer.send('production.send-input', input),
  getProductionStatus: () => ipcRenderer.invoke('get-production-status'),
  startProduction: (options) => ipcRenderer.send('production.start', options),
  stopProduction: () => ipcRenderer.send('production.stop'),
  resetSandbox: () => ipcRenderer.invoke('production.reset-sandbox'),
  startAutomatedEngine: () => ipcRenderer.send('production.start-engine'),
  sendFreeformCommand: (cmd) => ipcRenderer.send('production.run-freeform', cmd),
  requestProductionPause: () => ipcRenderer.send('production.pause-request'),
  sendManualProductionCommand: (cmd) => ipcRenderer.send('production.manual-command', cmd),
  resumeProductionAuto: () => ipcRenderer.send('production.resume-auto'),
  onProductionStatus: (callback) => {
    const handler = (_event, payload) => callback(payload);
    ipcRenderer.on('production-status', handler);
    return () => ipcRenderer.removeListener('production-status', handler);
  },
  onProductionEvent: (callback) => {
    const handler = (_event, payload) => callback(payload);
    ipcRenderer.on('production-event', handler);
    return () => ipcRenderer.removeListener('production-event', handler);
  },
  resumeProduction: () => ipcRenderer.send('production.resume'),

  // Gallery & System
  getLibraryCategories: () => ipcRenderer.invoke('get-library-categories'),
  createLibraryCategory: (name) => ipcRenderer.invoke('create-library-category', name),
  getGalleryData: () => ipcRenderer.invoke('get-gallery-templates'),
  deployTemplate: (templatePath) => ipcRenderer.invoke('template.deploy', templatePath),
  deleteTemplate: (path) => ipcRenderer.invoke('delete-template', path),
  exportProject: (path) => ipcRenderer.invoke('export-template', path),
  openExternal: (url) => ipcRenderer.send('open-external', url),
  openPreviewWindow: (url) => ipcRenderer.send('open-preview-window', url),
  
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
