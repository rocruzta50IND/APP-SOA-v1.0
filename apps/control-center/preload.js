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
  killForge: () => ipcRenderer.send('forge.kill')
});
