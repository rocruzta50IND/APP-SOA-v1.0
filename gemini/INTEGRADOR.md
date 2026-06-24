# 🔧 INSTRUÇÕES DE INTEGRAÇÃO
* **Causa Raiz:** A CLI usava fallbacks de workspace (scratch) porque a sandbox não possuía um marcador de raiz nativo (ex: `.agents`). Além disso, dependia de um prompt artificial indesejado via `setTimeout`.
* **Arquivo Afetado:** `@apps/control-center/main.js`

* **TargetContent:**
```text
const path = require('path');
const os = require('os');
const pty = require('node-pty');

const { registerHistoryHandlers } = require('./src/main/historyManager');
```
* **ReplacementContent:**
```text
const path = require('path');
const os = require('os');
const pty = require('node-pty');
const fs = require('fs');

const { registerHistoryHandlers } = require('./src/main/historyManager');
```

* **TargetContent:**
```text
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

      // INJEÇÃO AUTOMATIZADA: Envia o prompt invisível assim que o PTY for aberto para garantir obediência
      setTimeout(() => {
        if (forgePtyProcess) {
          forgePtyProcess.write('Aja a partir de agora tendo esta pasta exata como seu Workspace. Nunca crie projetos na pasta scratch, apenas crie/modifique arquivos diretamente neste diretório raiz atual.\r');
        }
      }, 2000);
```
* **ReplacementContent:**
```text
      // RESOLUÇÃO DINÂMICA DE CAMINHO (CWD ISOLATION INEGOCIÁVEL)
      const sandboxPath = path.join(__dirname, '..', '..', '.templates', 'forge', 'sandbox');

      // DEFINIÇÃO NATIVA DE WORKSPACE: Criação da pasta .agents para a CLI assumir a sandbox como workspace ativo
      const agentsPath = path.join(sandboxPath, '.agents');
      if (!fs.existsSync(agentsPath)) {
        fs.mkdirSync(agentsPath, { recursive: true });
      }

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
```
