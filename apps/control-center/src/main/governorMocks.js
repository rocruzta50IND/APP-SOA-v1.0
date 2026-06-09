const { ipcMain, shell, BrowserWindow } = require('electron');

function registerGovernorMocks(ipcMain) {
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
}

module.exports = { registerGovernorMocks };
