# 🔧 INSTRUÇÕES DE INTEGRAÇÃO (ISOLAMENTO CWD DO NODE-PTY)

* **Causa Raiz / Motivação:** Como medida de arquitetura de segurança (Coleira de IA), o CLI da Forja deve ser invocado em um ambiente confinado. O processo `agy --dangerously-skip-permissions` invocado via `node-pty` deve iniciar com o `cwd` estritamente mapeado para `.templates/forge/sandbox`, resolvido dinamicamente via `path.join` a partir da localização do `main.js`.
* **Arquivo Afetado:** `@apps/control-center/main.js`

* **TargetContent:**
```javascript
const { app, BrowserWindow, ipcMain, protocol, net, shell } = require('electron');
const path = require('path');

const { registerHistoryHandlers } = require('./src/main/historyManager');
```

* **ReplacementContent:**
```javascript
const { app, BrowserWindow, ipcMain, protocol, net, shell } = require('electron');
const path = require('path');
const os = require('os');
const pty = require('node-pty');

const { registerHistoryHandlers } = require('./src/main/historyManager');
```

* **TargetContent:**
```javascript
  // Register Handlers
  if (!handlersRegistered) {
    registerHistoryHandlers(ipcMain);
    registerTemplateHandlers(ipcMain, mainWindow);
    registerServerHandlers(ipcMain);
    setupProductionRunner(ipcMain, mainWindow);
    
    // --- MOCKS & UTILS REFACTORED ---
    registerGovernorMocks(ipcMain);
    setupPreviewWindow(ipcMain);

    handlersRegistered = true;
  }
```

* **ReplacementContent:**
```javascript
  // Register Handlers
  if (!handlersRegistered) {
    registerHistoryHandlers(ipcMain);
    registerTemplateHandlers(ipcMain, mainWindow);
    registerServerHandlers(ipcMain);
    setupProductionRunner(ipcMain, mainWindow);
    
    // --- MOCKS & UTILS REFACTORED ---
    registerGovernorMocks(ipcMain);
    setupPreviewWindow(ipcMain);

    // --- TERMINAL E SANDBOX FORJA ---
    let forgePtyProcess = null;

    ipcMain.on('gemini.start', (event, sessionId) => {
      if (forgePtyProcess) {
        try { forgePtyProcess.kill(); } catch (e) {}
      }

      // RESOLUÇÃO DINÂMICA DE CAMINHO (CWD ISOLATION INEGOCIÁVEL)
      const sandboxPath = path.join(__dirname, '..', '..', '.templates', 'forge', 'sandbox');
      const shellCmd = os.platform() === 'win32' ? 'powershell.exe' : 'bash';
      const shellArgs = os.platform() === 'win32' 
        ? ['-NoProfile', '-Command', 'agy --dangerously-skip-permissions'] 
        : ['-c', 'agy --dangerously-skip-permissions'];

      forgePtyProcess = pty.spawn(shellCmd, shellArgs, {
        name: 'xterm-color',
        cols: 80,
        rows: 30,
        cwd: sandboxPath, // <-- Caminho resolvido OBRIGATORIAMENTE aqui para contenção
        env: { ...process.env, FORCE_COLOR: '1' }
      });

      forgePtyProcess.onData((data) => {
        if (mainWindow && !mainWindow.isDestroyed()) {
          mainWindow.webContents.send('telemetry-raw', {
            sessionId: sessionId || 'forge-session',
            agentId: 'MAESTRO',
            data: data.toString()
          });
        }
      });
    });

    ipcMain.on('terminal.into', (event, { sessionId, data }) => {
      if (forgePtyProcess) {
        forgePtyProcess.write(data);
      }
    });

    ipcMain.on('terminal.kill', () => {
      if (forgePtyProcess) {
        try { forgePtyProcess.kill(); } catch (e) {}
        forgePtyProcess = null;
      }
    });

    handlersRegistered = true;
  }
```
