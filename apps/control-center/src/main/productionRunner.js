const { fork } = require('child_process');
const path = require('path');
const os = require('os');
const pty = require('node-pty');
const fs = require('fs');

let productionProcess = null; // o script auto-production.mjs (que gerencia o sandbox)
let isProductionRunning = false;
let currentTemplate = null;
let productionLogs = [];
let automationState = 'running'; // 'running', 'pause-requested', 'awaiting-input'
let isPaused = false;
let pauseMessage = "";

// PTY Variables
let geminiPtyProcess = null;
let ptyJourneyMode = null; // 'mvp' or 'freeform'
let ptyBuffer = '';
let ptyLineBuffer = '';
let pendingFreeformCommand = null;
let isClearPending = false;
let mvpLoopInterval = null;
let isArchitectureComplete = false;
let hasStartedArchitecture = false;

function setupProductionRunner(ipcMain, mainWindow) {
  function safeSendIPC(channel, payload) {
    if (mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.webContents.send(channel, payload);
    }
  }

  ipcMain.handle('get-production-status', () => {
    return {
      isProductionRunning,
      currentTemplate,
      productionLogs,
      automationState,
      isPaused,
      pauseMessage
    };
  });

  ipcMain.on('production.resume', () => {
    if (productionProcess && typeof productionProcess.send === 'function') {
      productionProcess.send('resume');
      isPaused = false;
      pauseMessage = "";
    }
  });

  ipcMain.on('production.pause-request', () => {
    if (productionProcess && typeof productionProcess.send === 'function') {
      productionProcess.send('pause-request');
      automationState = 'pause-requested';
    }
  });

  ipcMain.on('production.resume-auto', () => {
    if (productionProcess && typeof productionProcess.send === 'function') {
      productionProcess.send('resume-auto-request');
      automationState = 'running';
    }
  });

  ipcMain.on('production.manual-command', (event, command) => {
    if (productionProcess && typeof productionProcess.send === 'function') {
      productionProcess.send({ type: 'manual-mission-command', payload: command });
    }
  });

  ipcMain.on('production.start', (event, options) => {
    if (!global.isSandboxEnvironmentReady) {
      console.log('[PRODUCTION] ERRO: A Fase 1 de Setup do Sandbox ainda não foi concluída.');
      safeSendIPC('production-status', { status: 'error', error: 'A Fase 1 de Setup do Sandbox ainda não foi concluída.' });
      return;
    }

    if (productionProcess) {
      console.log('[PRODUCTION] Já existe um processo em execução.');
      return;
    }

    isProductionRunning = true;
    productionLogs = [];
    automationState = 'running';
    isPaused = false;
    pauseMessage = "";

    const command = options?.command || '';
    console.log(`[PRODUCTION] Iniciando Motor da Fábrica MVP com comando: ${command}`);
    
    const projectRoot = path.resolve(__dirname, '../../../../');
    const scriptPath = path.join(projectRoot, '.scripts', 'auto-production.mjs');
    
    const childProcess = fork(scriptPath, [command], { 
      cwd: projectRoot, 
      env: { ...process.env, FORCE_COLOR: '1' }, 
      stdio: ['pipe', 'pipe', 'pipe', 'ipc'] 
    });

    productionProcess = childProcess;

    safeSendIPC('production-status', { status: 'started', phase: 'PHASE_DISCOVERY' });

    childProcess.stdout.on('data', (data) => {
      safeSendIPC('telemetry-raw', { 
        sessionId: 'PRODUCTION_ENGINE', 
        agentId: 'FACTORY_MANAGER', 
        data: data.toString() 
      });
    });

    childProcess.stderr.on('data', (data) => {
      safeSendIPC('telemetry-raw', { 
        sessionId: 'PRODUCTION_ENGINE', 
        agentId: 'FACTORY_MANAGER', 
        data: data.toString() 
      });
    });

    childProcess.on('message', (data) => {
      if (data.type === 'log') {
        productionLogs.push(data.message);
      } else if (data.type === 'status' && data.message === 'awaiting-manual-input') {
        automationState = 'awaiting-input';
      } else if (data.type === 'pause') {
        isPaused = true;
        pauseMessage = data.message || 'Aguardando confirmação para continuar.';
      } else if (data.type === 'setup') {
        currentTemplate = data.payload.template;
      }
      safeSendIPC('production-event', data);
    });

    childProcess.on('exit', (exitCode) => {
      console.log(`[PRODUCTION] Motor finalizado com código: ${exitCode}`);
      isProductionRunning = false;
      safeSendIPC('production-status', { status: 'ended', exitCode });
      productionProcess = null;
    });
  });

  // --- AUTOMATED MVP ENGINE & PTY HOOKS ---

  function spawnGeminiTask(customCommand, isSilent = false) {
    if (geminiPtyProcess) {
      // Extermina qualquer tarefa anterior que ainda não terminou
      try { require('child_process').execSync(`taskkill /PID ${geminiPtyProcess.pid} /T /F`, { stdio: 'ignore' }); } catch (e) {}
      try { geminiPtyProcess.kill(); } catch (e) {}
      geminiPtyProcess = null;
    }

    const projectRoot = path.resolve(__dirname, '../../../../');
    const sandboxPath = path.join(projectRoot, 'environment-sandbox');
    const shell = os.platform() === 'win32' ? 'powershell.exe' : 'bash';
    
    // Arquitetura One-Shot: Passa o comando direto pro agy via argumento do OS
    const safeCmd = customCommand.replace(/"/g, '\\"');
    const baseCmd = `agy "${safeCmd}" --dangerously-skip-permissions`;
    const shellArgs = os.platform() === 'win32' ? ['-NoProfile', '-Command', baseCmd] : ['-c', baseCmd];

    console.log(`[PTY] Iniciando tarefa agy One-Shot: ${baseCmd}`);
    if (!isSilent) {
        safeSendIPC('production-event', { type: 'log', origin: 'system', message: "🚀 Iniciando Agente para executar a instrução..." });
    }
    
    geminiPtyProcess = pty.spawn(shell, shellArgs, {
      cwd: sandboxPath,
      env: { ...process.env, FORCE_COLOR: '1' }
    });

    geminiPtyProcess.onData((data) => {
      const strData = data.toString();
      const cleanStr = strData.replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, '').replace(/\x1B\[[0-9;]*[a-zA-Z]/g, '');

      safeSendIPC('telemetry-raw', {
        sessionId: 'PRODUCTION_ENGINE',
        agentId: 'FACTORY_MANAGER',
        data: strData
      });

      if (ptyJourneyMode === 'mvp' && cleanStr.includes('ARQUITETURA_CONCLUIDA')) {
        isArchitectureComplete = true;
      }

      // Filtragem e Embelezamento de Logs Avançado (Mantido)
      ptyLineBuffer += cleanStr;
      let lines = ptyLineBuffer.split(/[\r\n]+/);
      ptyLineBuffer = lines.pop() || '';
      
      for (const line of lines) {
        if (line.trim().length === 0) continue;
        
        let friendlyMsg = null;
        if (line.match(/call:.*write_to_file/) || line.match(/call:.*multi_replace_file_content/) || line.match(/call:.*replace_file_content/)) {
          friendlyMsg = "📝 Modificando arquivos de código...";
        } else if (line.match(/call:.*run_command/)) {
          friendlyMsg = "⚙️ Executando operação no terminal...";
        } else if (line.match(/call:.*view_file/) || line.match(/call:.*grep_search/) || line.match(/call:.*list_dir/)) {
          friendlyMsg = "🔄 Analisando estrutura e arquivos...";
        } else if (line.includes('ARQUITETURA_CONCLUIDA')) {
          friendlyMsg = "✨ Arquitetura MVP Concluída com Sucesso!";
        } else if (line.match(/\[PRONTO:/)) {
          friendlyMsg = "✅ Operação concluída.";
        }
        
        if (friendlyMsg) {
          if (friendlyMsg !== global.lastFriendlyMsg) {
            safeSendIPC('production-event', { type: 'log', origin: 'system', message: friendlyMsg });
            global.lastFriendlyMsg = friendlyMsg;
          }
        } else {
          const isRawNoise = line.match(/(?:>thought|call:|response:|"output":|"toolAction":|"toolSummary":|"CodeContent":|⠋|⠙|⠹|⠸|⠼|⠴|⠦|⠧|⠇|⠏)/i);
          if (!isRawNoise && line.trim().length > 3 && !line.trim().endsWith('>')) {
            safeSendIPC('production-event', { type: 'log', origin: 'assistant', message: line.trim() });
          }
        }
      }
    });

    geminiPtyProcess.onExit(() => {
      geminiPtyProcess = null;
      console.log('[PTY] Tarefa agy One-Shot encerrada.');
      if (ptyJourneyMode === 'freeform') {
         safeSendIPC('production-event', { type: 'log', origin: 'system', message: "✅ Operação livre concluída com sucesso. Aguardando novos comandos." });
      }
    });
  }

  function handleIdleMvp() {
    if (!isArchitectureComplete) return;
    if (geminiPtyProcess) return; // Aguarda a tarefa atual One-Shot terminar antes de pegar a próxima

    const projectRoot = path.resolve(__dirname, '../../../../');
    const missionPath = path.join(projectRoot, '.agent', 'mission.md');
    const instructionsPath = path.join(projectRoot, '.agent', 'instructions.md');

    if (fs.existsSync(missionPath) && fs.existsSync(instructionsPath)) {
       const mission = fs.readFileSync(missionPath, 'utf-8');
       const instructions = fs.readFileSync(instructionsPath, 'utf-8');
       const cmd = `Siga rigorosamente as instruções e cumpra a missão atual. MISSION: ${mission} INSTRUCTIONS: ${instructions}`;
       
       fs.unlinkSync(missionPath);
       fs.unlinkSync(instructionsPath);
       
       spawnGeminiTask(cmd);
    }
  }

  ipcMain.on('production.start-engine', () => {
    if (!global.isSandboxEnvironmentReady) {
      console.log('[PTY] ERRO: A Fase 1 de Setup do Sandbox ainda não foi concluída.');
      return;
    }
    console.log('[PTY] Modo Esteira MVP ativado.');
    ptyJourneyMode = 'mvp';
    isClearPending = false;
    isArchitectureComplete = false;
    
    // Inicia imediatamente a primeira etapa (One-Shot)
    const architectCmd = 'Leia o arquivo PRD.md recém-clonado neste diretório. Siga rigidamente as instruções de .agent/agents/architect-mvps/agent-architect-mvps.md para parametrizar e atualizar todos os outros arquivos nas pastas .agent e .obsidian_vault. Avise APENAS a palavra ARQUITETURA_CONCLUIDA quando terminar.';
    spawnGeminiTask(architectCmd);

    // Loop que verifica novas missões sempre que a IA estiver ociosa
    if (mvpLoopInterval) clearInterval(mvpLoopInterval);
    mvpLoopInterval = setInterval(() => {
        if (!isArchitectureComplete) return;
        if (ptyJourneyMode === 'mvp') {
            handleIdleMvp();
        }
    }, 5000);
  });

  ipcMain.on('production.run-freeform', (event, cmd) => {
    if (!global.isSandboxEnvironmentReady) {
      console.log('[PTY] ERRO: A Fase 1 de Setup do Sandbox ainda não foi concluída.');
      return;
    }
    console.log(`[PTY] Sandbox Livre executando comando: ${cmd}`);
    ptyJourneyMode = 'freeform';
    if (mvpLoopInterval) clearInterval(mvpLoopInterval);
    
    // Na arquitetura One-Shot, injetamos a análise de bootstrap apenas na primeira chamada
    if (!global.hasBootstrappedFreeform) {
       const bootstrapCmd = `Analise a estrutura de pastas e arquivos deste projeto para entender o contexto e onde os componentes ficam. Depois de mapear a estrutura na sua memória, atenda à seguinte solicitação e modifique os arquivos pertinentes: ${cmd}`;
       spawnGeminiTask(bootstrapCmd);
       global.hasBootstrappedFreeform = true;
    } else {
       spawnGeminiTask(cmd);
    }
  });

  ipcMain.on('production.send-input', (event, inputString) => {
    if (geminiPtyProcess) {
      geminiPtyProcess.write(inputString + '\n');
    }
  });

  ipcMain.on('production.stop', () => {
    if (productionProcess) {
      productionProcess.kill();
      productionProcess = null;
    }
    if (geminiPtyProcess) {
      geminiPtyProcess.kill();
      geminiPtyProcess = null;
    }
    if (mvpLoopInterval) clearInterval(mvpLoopInterval);
    
    isProductionRunning = false;
    ptyJourneyMode = null;
    safeSendIPC('production-status', { status: 'stopped' });
  });

  ipcMain.handle('production.reset-sandbox', async () => {
    // Passo 1: Recebe o comando de Reset. (Aqui iniciamos a rotina)
    console.log('[PRODUCTION] Iniciando rotina de Reset do Sandbox...');

    // Passo 2: Executa taskkill na árvore de processos do CLI salvo em memória.
    if (productionProcess) {
      try { require('child_process').execSync(`taskkill /PID ${productionProcess.pid} /T /F`, { stdio: 'ignore' }); } catch (e) {}
      try { productionProcess.kill(); } catch (e) {}
      productionProcess = null;
    }
    if (geminiPtyProcess) {
      try { require('child_process').execSync(`taskkill /PID ${geminiPtyProcess.pid} /T /F`, { stdio: 'ignore' }); } catch (e) {}
      try { geminiPtyProcess.kill(); } catch (e) {}
      geminiPtyProcess = null;
    }
    if (mvpLoopInterval) clearInterval(mvpLoopInterval);
    
    // Fallback 1: Mata explícito agy.exe e winpty-agent.exe que travam terminais orfãos
    try { require('child_process').execSync(`taskkill /IM agy.exe /T /F`, { stdio: 'ignore' }); } catch (e) {}
    try { require('child_process').execSync(`taskkill /IM winpty-agent.exe /T /F`, { stdio: 'ignore' }); } catch (e) {}

    // Fallback 2: WMI PowerShell Kill - bypass string interpolation syntax errors using direct shell
    try {
      const psCommand = "Get-WmiObject Win32_Process | Where-Object { $_.CommandLine -match 'environment-sandbox' -or $_.ExecutablePath -match 'environment-sandbox' } | ForEach-Object { Stop-Process -Id $_.ProcessId -Force }";
      require('child_process').execSync(psCommand, { shell: 'powershell.exe', stdio: 'ignore' });
    } catch (e) {}

    isProductionRunning = false;
    ptyJourneyMode = null;
    safeSendIPC('production-status', { status: 'stopped' });

    const projectRoot = path.resolve(__dirname, '../../../../');
    const sandboxPath = path.join(projectRoot, 'environment-sandbox');

    // Passo 3: Aguarda (delay) cerca de 1000ms para o SO Windows processar a liberação dos file locks.
    console.log('[PRODUCTION] Aguardando 1000ms para o SO liberar os locks dos processos mortos...');
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Passo 4: Aciona o "Wipe" do diretório (código recursivo com force e retries)
    if (fs.existsSync(sandboxPath)) {
      console.log(`[PRODUCTION] Iniciando Wipe do Sandbox...`);
      let retries = 10;
      while (retries > 0) {
        try {
          console.log(`[PRODUCTION] Tentando apagar sandbox em: ${sandboxPath} (Retries left: ${retries - 1})`);
          await fs.promises.rm(sandboxPath, { recursive: true, force: true });
          console.log(`[PRODUCTION] Sandbox wiped successfully.`);
          break;
        } catch (err) {
          if (err.code === 'ENOENT') break;
          console.error(`[PRODUCTION] Error wiping sandbox (EPERM/EBUSY):`, err.message);
          retries--;
          if (retries === 0) {
            console.error(`[PRODUCTION] Falha definitiva ao apagar sandbox. Wipe falhou.`);
            return { success: false, error: 'Falha ao apagar sandbox. Processos ainda bloqueando a pasta.' };
          }
          await new Promise(resolve => setTimeout(resolve, 500));
        }
      }
    }

    // Passo 5: Informa o Frontend que o Reset foi concluído
    return { success: true };
  });
}

module.exports = { setupProductionRunner };
