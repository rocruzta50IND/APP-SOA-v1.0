const fs = require('fs');
const fsPromises = fs.promises;
const path = require('path');
const { dialog } = require('electron');
const pty = require('node-pty');
const util = require('util');
const { exec } = require('child_process');
const execAsync = util.promisify(exec);

let activePtyProcess = null;

const existsAsync = async (p) => {
  try {
    await fsPromises.access(p);
    return true;
  } catch {
    return false;
  }
};

function registerTemplateHandlers(ipcMain, mainWindow) {
  function safeSendIPC(channel, payload) {
    if (mainWindow && !mainWindow.isDestroyed() && !mainWindow.webContents.isDestroyed()) {
      mainWindow.webContents.send(channel, payload);
    }
  }

  ipcMain.handle('template.deploy', async (event, templatePath) => {
    const projectRoot = path.resolve(__dirname, '../../../../');
    const sandboxPath = path.join(projectRoot, 'environment-sandbox');
    const sourcePath = path.isAbsolute(templatePath) 
      ? templatePath 
      : path.resolve(projectRoot, templatePath);

    if (!(await existsAsync(sourcePath))) {
      return { success: false, error: 'Source template not found: ' + sourcePath };
    }

    try {
      // PHASE 1: KILL - Terminate active processes and free port 3001
      console.log('[DEPLOY] Phase 1: Killing active processes...');
      if (activePtyProcess) {
        try {
          activePtyProcess.kill();
          activePtyProcess = null;
        } catch (killErr) {
          console.error('Error killing active PTY:', killErr);
        }
      }

      // Force kill anything on port 3000 to prevent EBUSY
      if (process.platform === 'win32') {
        try {
          await execAsync('for /f "tokens=5" %a in (\'netstat -aon ^| findstr :3000 ^| findstr LISTENING\') do taskkill /f /pid %a');
        } catch (e) {
          // No process on port 3000 or error killing
        }
      }

      // PHASE 2: DELETE - Rigorous cleanup of environment-sandbox
      console.log('[DEPLOY] Phase 2: Cleaning sandbox directory...');
      if (await existsAsync(sandboxPath)) {
        try {
          await fsPromises.rm(sandboxPath, { recursive: true, force: true });
        } catch (rmErr) {
          console.error('Cleanup failed, directory may be locked:', rmErr);
          return { success: false, error: 'Cannot delete environment-sandbox. Please close any files/terminals and try again.' };
        }
      }
      await fsPromises.mkdir(sandboxPath, { recursive: true });

      // PHASE 3: INITIALIZE - Clone and Install
      console.log('[DEPLOY] Phase 3: Cloning template and initializing...');
      
      const copyDir = async (src, dest) => {
        await fsPromises.mkdir(dest, { recursive: true });
        const entries = await fsPromises.readdir(src, { withFileTypes: true });
        for (const entry of entries) {
          const srcPath = path.join(src, entry.name);
          const destPath = path.join(dest, entry.name);
          if (entry.isDirectory()) {
            await copyDir(srcPath, destPath);
          } else {
            await fsPromises.copyFile(srcPath, destPath);
          }
        }
      };

      const agentSourcePath = path.join(projectRoot, '.agent');
      const vaultSourcePath = path.join(projectRoot, '.obsidian_vault');
      const agentDestPath = path.join(sandboxPath, '.agent');
      const vaultDestPath = path.join(sandboxPath, '.obsidian_vault');

      await Promise.all([
        copyDir(sourcePath, sandboxPath),
        (async () => {
          if (await existsAsync(agentSourcePath)) {
            await copyDir(agentSourcePath, agentDestPath);
          }
        })(),
        (async () => {
          if (await existsAsync(vaultSourcePath)) {
            await copyDir(vaultSourcePath, vaultDestPath);
          }
        })()
      ]);

      console.log('[DEPLOY] Removendo cache (.next) e node_modules do template copiado...');
      await fsPromises.rm(path.join(sandboxPath, '.next'), { recursive: true, force: true });
      await fsPromises.rm(path.join(sandboxPath, 'node_modules'), { recursive: true, force: true });

      const shell = process.platform === 'win32' ? 'powershell.exe' : 'bash';
      activePtyProcess = pty.spawn(shell, ['-NoProfile'], {
        name: 'xterm-color',
        cols: 80,
        rows: 30,
        cwd: sandboxPath,
        env: { ...process.env, FORCE_COLOR: '1', PORT: '3001', NPM_CONFIG_PROGRESS: 'false', NPM_CONFIG_FUND: 'false', NPM_CONFIG_AUDIT: 'false', CI: 'true' }
      });

      safeSendIPC('production-status', { status: 'started', phase: 'PHASE_DEPLOY' });

      let isCheckingPort = false;
      let isServerReady = false;

      const checkServerReady = (attempt = 1) => {
        if (isServerReady) return;
        if (attempt > 20) {
          console.error('[DEPLOY] Falha ao conectar ao servidor Next.js após várias tentativas.');
          isCheckingPort = false;
          return;
        }

        const net = require('net');
        const socket = net.createConnection({ port: 3001, host: '127.0.0.1' });

        socket.on('connect', () => {
          socket.destroy();
          isServerReady = true;
          isCheckingPort = false;
          global.isSandboxEnvironmentReady = true;
          safeSendIPC('preview-ready');
          safeSendIPC('production-event', { type: 'log', origin: 'assistant', message: '🚀 **Setup Express concluído!**\nO servidor de desenvolvimento está rodando em `localhost:3001`.\nVocê pode interagir livremente com a Sandbox ou iniciar a **Esteira MVP**.' });
        });

        socket.on('error', () => {
          setTimeout(() => {
            checkServerReady(attempt + 1);
          }, 500);
        });
      };

      let bootState = 0;
      let deploymentTimeout = null;

      const npmCmd = process.platform === 'win32' 
        ? '$env:PORT=3001; npm install --legacy-peer-deps --no-progress --no-audit --no-fund; if ($?) { npm run dev -- -p 3001 }\r' 
        : 'PORT=3001 npm install --legacy-peer-deps --no-progress --no-audit --no-fund && npm run dev -- -p 3001\n';

      activePtyProcess.onData((data) => {
        const strData = data.toString();
        const cleanStr = strData.replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, '').replace(/\x1B\[[0-9;]*[a-zA-Z]/g, '').trim();

        safeSendIPC('telemetry-raw', { 
          sessionId: 'PRODUCTION_ENGINE', 
          agentId: 'FACTORY_MANAGER', 
          data: strData 
        });
        
        if (cleanStr.length > 0) {
          safeSendIPC('production-event', { type: 'log', origin: 'system', message: cleanStr });
        }

        const isPromptReady = cleanStr.includes('>') || cleanStr.includes('PS ') || cleanStr.includes('$ ');

        if (bootState === 0 && isPromptReady) {
          bootState = 1;
          try {
            if (activePtyProcess) {
              activePtyProcess.write(npmCmd);
              deploymentTimeout = setTimeout(() => {
                if (!isServerReady) {
                  console.error('[DEPLOY] Timeout: Falha ao instalar dependências (npm install).');
                  if (activePtyProcess) {
                    activePtyProcess.kill();
                    activePtyProcess = null;
                  }
                  safeSendIPC('preview-error', { error: 'Timeout: Falha ao instalar dependências (npm install).' });
                  safeSendIPC('production-status', { status: 'error', error: 'Timeout: Falha ao instalar dependências (npm install).' });
                }
              }, 8 * 60 * 1000); // 8 minutes
            }
          } catch (writeErr) {
            console.error('PTY Write Error:', writeErr);
            safeSendIPC('production-status', { status: 'error', error: writeErr.message });
          }
        }

        if (/Ready in|started server on .*(3000|3001)|ready started server on/i.test(strData)) {
          if (!isCheckingPort && !isServerReady) {
            isCheckingPort = true;
            if (deploymentTimeout) clearTimeout(deploymentTimeout);
            checkServerReady();
          }
        }
      });

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
    if (!(await existsAsync(libraryPath))) return [];
    try {
      const items = await fsPromises.readdir(libraryPath, { withFileTypes: true });
      return items.filter(d => d.isDirectory()).map(d => d.name);
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
      if (!(await existsAsync(targetPath))) {
        await fsPromises.mkdir(targetPath, { recursive: true });
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

    if (!(await existsAsync(libraryPath))) return [];

    try {
      const catItems = await fsPromises.readdir(libraryPath, { withFileTypes: true });
      const categories = catItems.filter(d => d.isDirectory()).map(d => d.name);

      for (const cat of categories) {
        const catPath = path.join(libraryPath, cat);
        const themeItems = await fsPromises.readdir(catPath, { withFileTypes: true });
        const themes = themeItems.filter(d => d.isDirectory()).map(d => d.name);

        for (const theme of themes) {
          const themePath = path.join(catPath, theme);
          const projItems = await fsPromises.readdir(themePath, { withFileTypes: true });
          const projects = projItems.filter(d => d.isDirectory()).map(d => d.name);

          for (const proj of projects) {
            const projPath = path.join(themePath, proj);
            const templateJsonPath = path.join(projPath, 'template.json');
            const previewDir = path.join(projPath, 'preview');

            if (await existsAsync(templateJsonPath)) {
              const fileContent = await fsPromises.readFile(templateJsonPath, 'utf-8');
              const config = JSON.parse(fileContent);
              const stats = await fsPromises.stat(projPath);
              let imageFiles = [];

              if (await existsAsync(previewDir)) {
                const prevItems = await fsPromises.readdir(previewDir);
                imageFiles = prevItems.filter(f => /\.(webp|png|jpg|jpeg)$/i.test(f));
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
                relativePath: path.relative(path.join(__dirname, '../../../../'), projPath).replace(/\\/g, '/')
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
    
    const appendLog = async (msg) => {
      try { await fsPromises.appendFile(logFile, `[${new Date().toISOString()}] ${msg}\n`); } catch(e){}
    };

    const isExistent = await existsAsync(absolutePath);
    await appendLog(`templatePath: ${templatePath}`);
    await appendLog(`libraryPath: ${libraryPath}`);
    await appendLog(`absolutePath: ${absolutePath}`);
    await appendLog(`Exists: ${isExistent}`);

    if (!path.normalize(absolutePath).toLowerCase().startsWith(path.normalize(libraryPath).toLowerCase())) {
      await appendLog(`SECURITY FAIL`);
      throw new Error('Unauthorized deletion path: ' + absolutePath);
    }

    try {
      if (isExistent) {
        const cleanDirectory = async (dir) => {
          const items = await fsPromises.readdir(dir, { withFileTypes: true });
          for (const item of items) {
            const fullPath = path.join(dir, item.name);
            if (item.isSymbolicLink() || (process.platform === 'win32' && item.isDirectory())) {
              const stats = await fsPromises.lstat(fullPath);
              if (stats.isSymbolicLink()) {
                await fsPromises.unlink(fullPath);
              } else if (process.platform === 'win32') {
                try {
                  await fsPromises.unlink(fullPath); 
                } catch (e) {
                  if (item.isDirectory()) await cleanDirectory(fullPath);
                }
              }
            } else if (item.isDirectory()) {
              await cleanDirectory(fullPath);
            }
          }
        };

        const stats = await fsPromises.lstat(absolutePath);
        if (stats.isDirectory()) {
          try { await cleanDirectory(absolutePath); } catch (e) { console.error('Link cleanup error:', e); }
        }

        await fsPromises.rm(absolutePath, { recursive: true, force: true });
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

    if (!(await existsAsync(sourceDir))) return { success: false, error: 'Source directory not found' };
    
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
