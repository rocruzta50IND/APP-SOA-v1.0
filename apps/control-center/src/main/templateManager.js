const fs = require('fs');
const path = require('path');
const { dialog } = require('electron');
const pty = require('node-pty');

let activePtyProcess = null;

function registerTemplateHandlers(ipcMain, mainWindow) {
  function safeSendIPC(channel, payload) {
    if (mainWindow && !mainWindow.isDestroyed() && !mainWindow.webContents.isDestroyed()) {
      mainWindow.webContents.send(channel, payload);
    }
  }

  ipcMain.handle('template.deploy', async (event, templatePath) => {
    const projectRoot = path.resolve(__dirname, '../../../../');
    const sandboxPath = path.join(projectRoot, '.templates/forge/sandbox');
    const sourcePath = path.isAbsolute(templatePath) 
      ? templatePath 
      : path.resolve(projectRoot, templatePath);

    if (!fs.existsSync(sourcePath)) {
      return { success: false, error: 'Source template not found: ' + sourcePath };
    }

    try {
      // 0. Shield: Kill existing PTY process before cleaning sandbox
      if (activePtyProcess) {
        try {
          activePtyProcess.kill();
          activePtyProcess = null;
        } catch (killErr) {
          console.error('Error killing active PTY:', killErr);
        }
      }

      // 1. Clean Sandbox
      if (fs.existsSync(sandboxPath)) {
        fs.rmSync(sandboxPath, { recursive: true, force: true });
      }
      fs.mkdirSync(sandboxPath, { recursive: true });

      // 2. Clone Template
      fs.cpSync(sourcePath, sandboxPath, { recursive: true });

      // 3. Start Terminal Session
      const shell = process.platform === 'win32' ? 'powershell.exe' : 'bash';
      activePtyProcess = pty.spawn(shell, ['-NoProfile'], {
        name: 'xterm-color',
        cols: 80,
        rows: 30,
        cwd: sandboxPath,
        env: { ...process.env, FORCE_COLOR: '1' }
      });

      safeSendIPC('production-status', { status: 'started', phase: 'PHASE_DEPLOY' });

      activePtyProcess.onData((data) => {
        safeSendIPC('telemetry-raw', { 
          sessionId: 'PRODUCTION_ENGINE', 
          agentId: 'FACTORY_MANAGER', 
          data: data 
        });
      });

      // Command sequence
      const cmd = process.platform === 'win32' 
        ? 'npm install; npm run dev\r' 
        : 'npm install && npm run dev\n';
      
      setTimeout(() => {
        try {
          if (activePtyProcess) {
            activePtyProcess.write(cmd);
          }
        } catch (writeErr) {
          console.error('PTY Write Error:', writeErr);
          safeSendIPC('production-status', { status: 'error', error: writeErr.message });
        }
      }, 1000);

      activePtyProcess.onExit(({ exitCode }) => {
        if (activePtyProcess) {
          activePtyProcess = null;
          safeSendIPC('production-status', { status: 'ended', exitCode });
        }
      });

      return { success: true };
    } catch (err) {
      console.error('Error deploying template:', err);
      return { success: false, error: err.message };
    }
  });

  ipcMain.handle('get-library-categories', async () => {
    const libraryPath = path.resolve(__dirname, '../../../../.templates/templates-library');
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
    
    if (categoryName.includes('..') || categoryName.includes('/') || categoryName.includes('\\')) {
      return { success: false, error: 'Invalid characters in category name' };
    }

    const libraryPath = path.resolve(__dirname, '../../../../.templates/templates-library');
    const targetPath = path.join(libraryPath, categoryName);

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
    const libraryPath = path.resolve(__dirname, '../../../../.templates/templates-library');
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
                relativePath: path.relative(path.join(__dirname, '../../../../'), projPath)
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
    const libraryPath = path.resolve(__dirname, '../../../../.templates/templates-library');
    
    const absolutePath = path.isAbsolute(templatePath) 
      ? templatePath 
      : path.resolve(__dirname, '../../../../', templatePath);
    
    const logFile = path.resolve(__dirname, '../../delete_debug.log');
    fs.appendFileSync(logFile, `[${new Date().toISOString()}] templatePath: ${templatePath}\n`);
    fs.appendFileSync(logFile, `[${new Date().toISOString()}] libraryPath: ${libraryPath}\n`);
    fs.appendFileSync(logFile, `[${new Date().toISOString()}] absolutePath: ${absolutePath}\n`);
    fs.appendFileSync(logFile, `[${new Date().toISOString()}] Exists: ${fs.existsSync(absolutePath)}\n`);

    if (!path.normalize(absolutePath).toLowerCase().startsWith(path.normalize(libraryPath).toLowerCase())) {
      fs.appendFileSync(logFile, `[${new Date().toISOString()}] SECURITY FAIL\n`);
      throw new Error('Unauthorized deletion path: ' + absolutePath);
    }

    try {
      if (fs.existsSync(absolutePath)) {
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
    const projectRoot = path.resolve(__dirname, '../../../../');
    const sourceDir = path.resolve(projectRoot, relativePath);
    const libraryPath = path.resolve(projectRoot, '.templates/templates-library');

    if (!fs.existsSync(sourceDir)) return { success: false, error: 'Source directory not found' };
    
    if (!path.normalize(sourceDir).toLowerCase().startsWith(path.normalize(libraryPath).toLowerCase())) {
      return { success: false, error: 'Unauthorized export path' };
    }

    const { filePath } = await dialog.showSaveDialog(mainWindow, {
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
}

module.exports = { registerTemplateHandlers };
