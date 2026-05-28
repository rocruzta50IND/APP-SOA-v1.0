const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  sendTerminalData: (data) => ipcRenderer.send('terminal.into', data),
  onTerminalData: (callback) => {
    const handler = (event, data) => callback(data);
    ipcRenderer.on('terminal.incData', handler);
    return () => ipcRenderer.removeListener('terminal.incData', handler);
  },
  startForge: (options) => ipcRenderer.send('forge.start', options),
  onForgeEnded: (callback) => {
    const handler = (event, exitCode) => callback(exitCode);
    ipcRenderer.on('forge.ended', handler);

    return () => ipcRenderer.removeListener('forge.ended', handler);
  },
  killForge: () => ipcRenderer.send('forge.kill'),
  getGalleryData: () => ipcRenderer.invoke('get-gallery-templates'),
  onForgeCompleted: (callback) => {
    const handler = (_event, code) => callback(code);
    ipcRenderer.on('forge-completed', handler);
    return () => ipcRenderer.removeListener('forge-completed', handler);
  },
  onForgePhase: (callback) => {
    const handler = (_event, phase) => callback(phase);
    ipcRenderer.on('forge-phase', handler);
    return () => ipcRenderer.removeListener('forge-phase', handler);
  },
  onPreviewReady: (callback) => {
    const handler = () => callback();
    ipcRenderer.on('preview-ready', handler);
    return () => ipcRenderer.removeListener('preview-ready', handler);
  },
  getForgeStatus: () => ipcRenderer.invoke('get-forge-status'),
  deleteTemplate: (path) => ipcRenderer.invoke('delete-template', path)
});
