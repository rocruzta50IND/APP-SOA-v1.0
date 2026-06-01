import { spawn, execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SCRIPTS_DIR = __dirname;
const ROOT_DIR = path.join(SCRIPTS_DIR, '..');
const TEMPLATES_DIR = path.join(ROOT_DIR, '.templates');
const LIB_PATH = path.join(TEMPLATES_DIR, 'templates-library');
const SANDBOX_DIR = path.join(TEMPLATES_DIR, 'forge', 'sandbox');
const CACHE_DIR = path.join(TEMPLATES_DIR, 'forge', 'cache');

// --- UTILITÁRIOS VISUAIS ---
const c = {
    reset: "\x1b[0m",
    cyan: "\x1b[36m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    gray: "\x1b[90m",
    bold: "\x1b[1m",
    magenta: "\x1b[35m"
};

// --- RASTREAMENTO DE PROCESSOS (BLINDAGEM) ---
const trackedPids = new Set();

const registerPid = (pid) => {
    if (pid) trackedPids.add(pid);
};

const unregisterPid = (pid) => {
    trackedPids.delete(pid);
};

const THEMES = ['Duo Model', 'Dark Mode', 'Light Mode'];

// --- IPC TELEMETRY HELPER ---
const sendTelemetry = (channel, payload) => {
    if (process.send) {
        process.send({ channel, payload });
    }
};

const logAction = (msg) => {
    const timestamp = new Date().toLocaleTimeString();
    const formatted = `\n${c.gray}[${timestamp}]${c.reset} ${c.magenta}[Orquestrador]${c.reset} > ${msg}\n`;
    process.stdout.write(formatted);
    sendTelemetry('telemetry-raw', formatted);
};

const logCommand = (cmd, args = []) => {
    const formatted = `\n${c.cyan}[Sistema]${c.reset} ${c.bold}Executing:${c.reset} \x1b[4m${cmd} ${args.join(' ')}\x1b[0m\n`;
    process.stdout.write(formatted);
    sendTelemetry('telemetry-raw', formatted);
};

// 🧼 LIMPEZA E PREPARAÇÃO
if (!fs.existsSync(LIB_PATH)) {
    logAction(`Criando diretório de biblioteca: ${LIB_PATH}`);
    fs.mkdirSync(LIB_PATH, { recursive: true });
}
if (!fs.existsSync(CACHE_DIR)) {
    logAction(`Criando diretório de cache: ${CACHE_DIR}`);
    fs.mkdirSync(CACHE_DIR, { recursive: true });
}

const categories = fs.readdirSync(LIB_PATH).filter(f => fs.statSync(path.join(LIB_PATH, f)).isDirectory());

const cat = process.env.FORGE_CATEGORY || (categories.length > 0 ? categories[0] : "General");
const theme = process.env.FORGE_THEME || THEMES[Math.floor(Math.random() * THEMES.length)];
const designTier = process.env.FORGE_TIER || 2;

// 🚀 CORE DE OTIMIZAÇÃO: BASE TEMPLATE CACHE
async function prepareSandbox() {
    sendTelemetry('forge-status', '🛠️ Preparando Sandbox e Cache...');
    const nextBaseCache = path.join(CACHE_DIR, 'next-base');
    const sandboxPackage = path.join(SANDBOX_DIR, 'package.json');
    const sandboxSrc = path.join(SANDBOX_DIR, 'src');

    // 🛠️ RESUME LOGIC: Check if sandbox is already populated
    if (fs.existsSync(sandboxPackage) && fs.existsSync(sandboxSrc)) {
        logAction('Código existente detectado na Sandbox. Pulando geração técnica...');
        console.log(`${c.green}🛠️  Código existente detectado na Sandbox. Pulando geração...${c.reset}`);
        return true; // Skip setup
    }

    logAction('Iniciando preparação da Sandbox via Cache/Instalação...');
    console.log(`${c.gray}Checking Base Template Cache...${c.reset}`);
    
    if (fs.existsSync(nextBaseCache) && fs.existsSync(path.join(nextBaseCache, 'node_modules'))) {
        logAction('Cache do Next.js base encontrado. Clonando estrutura...');
        console.log(`${c.green}✓ Using cached node_modules.${c.reset}`);
        if (fs.existsSync(SANDBOX_DIR)) {
            logAction(`Limpando sandbox anterior em ${SANDBOX_DIR}`);
            fs.rmSync(SANDBOX_DIR, { recursive: true, force: true });
        }
        fs.mkdirSync(SANDBOX_DIR, { recursive: true });
        
        // Fast copy using native fs.cpSync
        logAction('Copiando arquivos base (ignorando node_modules/next)...');
        fs.cpSync(nextBaseCache, SANDBOX_DIR, { 
            recursive: true, 
            filter: (src) => {
                const relative = path.relative(nextBaseCache, src);
                return !relative.includes('node_modules') && !relative.includes('.next');
            }
        });
        
        // Link node_modules instead of copying (Ultra fast)
        const targetNM = path.join(SANDBOX_DIR, 'node_modules');
        const sourceNM = path.join(nextBaseCache, 'node_modules');
        
        try {
            logAction(`Criando link simbólico para node_modules: ${sourceNM} -> ${targetNM}`);
            if (process.platform === 'win32') {
                fs.symlinkSync(sourceNM, targetNM, 'junction');
            } else {
                fs.symlinkSync(sourceNM, targetNM, 'dir');
            }
        } catch (linkError) {
            logAction('Falha ao criar link, recorrendo à cópia física (lento)...');
            console.log(`${c.yellow}⚠ Link failed, falling back to native copy...${c.reset}`);
            fs.cpSync(sourceNM, targetNM, { recursive: true });
        }
    } else {
        logAction('Aviso: Cache não encontrado. A primeira execução será lenta.');
        console.log(`${c.yellow}⚠ No cache found. Initializing slow setup...${c.reset}`);
    }
}

async function generateForgeContext() {
    const state = { 
        category: cat, 
        theme: theme, 
        tier: designTier,
        timestamp: new Date().toISOString() 
    };
    logAction(`Gerando arquivo de estado neural: forge/state_dump.json`);
    fs.writeFileSync(path.join(TEMPLATES_DIR, 'forge', 'state_dump.json'), JSON.stringify(state, null, 2));
    await executeGeminiPhase(`Leia @../1-iniciar.md e use os parâmetros: Categoria="${cat}", Modo="${theme}", Tier="${designTier}".`, 'Fase 1 (Contexto)', '🧠', 1000);
}

async function executeGeminiPhase(promptText, stepName, icon = '🤖', cooldown = 2000, attempt = 1) {
    const maxRetries = 5;
    return new Promise((resolve, reject) => {
        const isWindows = process.platform === 'win32';
        const cmdStr = isWindows ? 'gemini.cmd' : 'gemini';
        const args = ['--yolo'];

        logCommand(cmdStr, args);
        const child = spawn(cmdStr, args, {
            cwd: TEMPLATES_DIR,
            stdio: ['pipe', 'pipe', 'pipe'], 
            shell: true,
            windowsHide: true
        });

        registerPid(child.pid);

        let output = '';
        let errorOutput = '';

        child.stdout.on('data', (data) => { 
            const chunk = data.toString();
            output += chunk; 
            sendTelemetry('telemetry-raw', chunk);
        });
        child.stderr.on('data', (data) => { 
            const chunk = data.toString();
            errorOutput += chunk; 
            sendTelemetry('telemetry-raw', chunk);
        });

        child.stdin.write(promptText + '\n');
        child.stdin.end(); 

        let seconds = 0;
        let i = 0;
        const spinner = setInterval(() => {
            const frame = spinnerFrames[i % spinnerFrames.length];
            process.stdout.write(`${clearLine}${c.cyan}${frame}${c.reset} ${icon} ${stepName} (A${attempt}) ${c.gray}[${seconds}s]${c.reset}`);
            i++;
        }, 100);

        const timer = setInterval(() => { seconds++; }, 1000);

        child.on('error', (err) => {
            unregisterPid(child.pid);
            clearInterval(spinner);
            clearInterval(timer);
            process.stdout.write(`${clearLine}${c.yellow}❌ Falha ao iniciar ${stepName}: ${err.message}${c.reset}\n`);
            reject(err);
        });

        child.on('close', async (code) => {
            unregisterPid(child.pid);
            clearInterval(spinner);
            clearInterval(timer);
            
            const isRateLimit = errorOutput.includes('429') || 
                               errorOutput.toLowerCase().includes('too many requests') || 
                               errorOutput.toLowerCase().includes('capacity');

            if (code !== 0 && isRateLimit && attempt <= maxRetries) {
                logAction(`Taxa de requisição excedida (429). Retentando em 60s...`);
                process.stdout.write(`${clearLine}${c.yellow}⚠ Cota excedida (429). Aguardando 60s para retry...${c.reset}\n`);
                setTimeout(() => {
                    resolve(executeGeminiPhase(promptText, stepName, icon, cooldown, attempt + 1));
                }, 60000);
                return;
            }

            if (code !== 0) {
                logAction(`Erro na execução da ${stepName}. Código de saída: ${code}`);
                process.stdout.write(`${clearLine}${c.yellow}❌ Falha na ${stepName}${c.reset}\n`);
                console.error(errorOutput);
                reject(new Error(`Falha com código ${code}`));
                return;
            }

            process.stdout.write(`${clearLine}${c.green}✓${c.reset} ${icon} ${stepName} ${c.gray}[${seconds}s]${c.reset}\n`);
            if (cooldown > 0) {
                await new Promise(r => setTimeout(r, cooldown));
            }
            resolve();
        });
    });
}

/**
 * 🐝 MOTOR SWARM (Scatter-Gather)
 * Executa múltiplos agentes Gemini em paralelo com multiplexação de logs e isolamento.
 */
async function executeGeminiSwarm(tasks) {
    const runTask = (task, attempt = 1) => {
        const maxRetries = 5;
        return new Promise((resolve, reject) => {
            const isWindows = process.platform === 'win32';
            const cmdStr = isWindows ? 'gemini.cmd' : 'gemini';
            const args = ['--yolo'];
            
            logCommand(cmdStr, [...args, `(Prompt: ${task.promptFile})`]);
            const child = spawn(cmdStr, args, {
                cwd: TEMPLATES_DIR,
                stdio: ['pipe', 'pipe', 'pipe'],
                shell: true,
                windowsHide: true,
                env: { 
                    ...process.env, 
                    FORGE_SWARM_MODE: 'true', 
                    FORCE_COLOR: '1' 
                }
            });

            registerPid(child.pid);

            const prefix = `${c.cyan}[SWARM: ${task.id}]${c.reset} `;
            let errorOutput = '';

            // Multiplexação de Logs (stdout)
            child.stdout.on('data', (data) => {
                const chunk = data.toString();
                sendTelemetry('telemetry-raw', `[Agente ${task.id}] ${chunk}`);
                const lines = chunk.split(/\r?\n/);
                lines.forEach(line => {
                    if (line.trim()) process.stdout.write(`${prefix}${line}\n`);
                });
            });

            // Multiplexação de Erros (stderr)
            child.stderr.on('data', (data) => {
                const chunk = data.toString();
                sendTelemetry('telemetry-raw', `[Agente ${task.id}] ${c.yellow}${chunk}${c.reset}`);
                errorOutput += chunk;
                const lines = chunk.split(/\r?\n/);
                lines.forEach(line => {
                    if (line.trim()) process.stderr.write(`${prefix}${c.yellow}${line}${c.reset}\n`);
                });
            });

            // Injeção de Prompt
            const promptText = `Leia @${task.promptFile}`;
            child.stdin.write(promptText + '\n');
            child.stdin.end();

            child.on('error', (err) => {
                unregisterPid(child.pid);
                console.error(`${prefix}${c.yellow}❌ Falha ao iniciar agente: ${err.message}${c.reset}`);
                reject(err);
            });

            child.on('close', (code) => {
                unregisterPid(child.pid);
                const isRateLimit = errorOutput.includes('429') || 
                                   errorOutput.toLowerCase().includes('too many requests') || 
                                   errorOutput.toLowerCase().includes('capacity');

                if (code !== 0 && isRateLimit && attempt <= maxRetries) {
                    logAction(`[Swarm:${task.id}] 429 detectado. Retentando em 60s...`);
                    console.log(`${prefix}${c.yellow}⚠ Cota excedida (429). Retry em 60s (A${attempt + 1})...${c.reset}`);
                    setTimeout(() => {
                        resolve(runTask(task, attempt + 1));
                    }, 60000);
                    return;
                }

                if (code !== 0) {
                    reject(new Error(`Agente ${task.id} falhou com código ${code}`));
                } else {
                    resolve();
                }
            });
        });
    };

    try {
        logAction(`Invocando enxame paralelo com agentes: ${tasks.map(t => t.id).join(', ')}`);
        console.log(`\n${c.bold}${c.cyan}🐝 Invocando Enxame (Swarm) com ${tasks.length} agentes...${c.reset}\n`);
        await Promise.all(tasks.map(runTask));
        console.log(`\n${c.green}✓ Enxame concluiu todas as tarefas com sucesso.${c.reset}\n`);
    } catch (error) {
        console.error(`\n${c.yellow}🚨 Falha crítica no Enxame: ${error.message}${c.reset}`);
        console.log(`${c.gray}Encerrando todos os agentes remanescentes...${c.reset}`);
        throw error;
    }
}

async function runStep(step, cwd) {
    return new Promise((resolve, reject) => {
        const isWindows = process.platform === 'win32';
        logCommand(step.cmd);
        const child = spawn(step.cmd, {
            cwd: cwd,
            stdio: ['ignore', 'pipe', 'pipe'],
            env: { ...process.env, NEXT_TELEMETRY_DISABLED: '1' },
            shell: true,
            windowsHide: true
        });

        registerPid(child.pid);
        const chunks = [];

        child.stdout.on('data', (data) => {
            const chunk = data.toString();
            sendTelemetry('telemetry-raw', chunk);
            chunks.push(data);
        });

        child.stderr.on('data', (data) => {
            const chunk = data.toString();
            sendTelemetry('telemetry-raw', chunk);
            chunks.push(data);
        });

        const timeout = setTimeout(() => {
            try {
                logAction(`Timeout atingido para ${step.name}. Encerrando PID: ${child.pid}`);
                if (isWindows) execSync(`taskkill /pid ${child.pid} /F`, { stdio: 'ignore', windowsHide: true });
                else child.kill('SIGKILL');
            } catch (e) {}
            reject(new Error(`Timeout: ${step.name} excedeu 120s`));
        }, 120000);

        child.on('error', (err) => {
            unregisterPid(child.pid);
            clearTimeout(timeout);
            reject(new Error(`Falha ao iniciar ${step.name}: ${err.message}`));
        });

        child.on('close', (code) => {
            unregisterPid(child.pid);
            clearTimeout(timeout);
            const output = Buffer.concat(chunks).toString().trim();
            if (code !== 0) {
                reject({ code, output });
            } else {
                resolve(output);
            }
        });
    });
}

async function runQualityGate() {
    logAction('Iniciando Quality Gate (TypeScript + ESLint + Build)...');
    console.log(`${c.yellow}🛡️  Iniciando Quality Gate (Validação Tripla)...${c.reset}`);
    const maxAttempts = 3;
    let attempts = 0;

    const steps = [
        { name: 'TypeScript (TSC)', cmd: 'npx tsc --noEmit' },
        { name: 'Linting (ESLint)', cmd: 'npx eslint .' },
        { name: 'Production Build', cmd: 'npx next build' }
    ];

    while (attempts < maxAttempts) {
        attempts++;
        console.log(`${c.gray}\nVerificação #${attempts}${c.reset}`);
        
        let lastError = null;
        let failedStep = null;

        for (const step of steps) {
            try {
                process.stdout.write(`${c.gray}  → ${step.name}...${c.reset}`);
                await runStep(step, SANDBOX_DIR);
                console.log(`${c.green} PASSOU${c.reset}`);
            } catch (error) {
                console.log(`${c.yellow} FALHOU${c.reset}`);
                failedStep = step.name;
                lastError = error.output || error.message;
                break;
            }
        }

        if (!failedStep) {
            logAction('Quality Gate passou em todos os testes.');
            console.log(`\n${c.green}✅ Quality Gate concluído com sucesso.${c.reset}`);
            return true;
        }

        if (attempts < maxAttempts) {
            logAction(`Auto-Cura ativada para erro no passo: ${failedStep}`);
            console.log(`${c.yellow}⚠ Erro no ${failedStep}. Tentando Auto-Cura v2...${c.reset}`);
            
            // Extração inteligente do erro (últimas 30 linhas)
            const lines = lastError.split('\n');
            const relevantError = lines.length > 30 ? lines.slice(-30).join('\n') : lastError;
            
            const repairPrompt = `⚠️ QUALITY GATE FALHOU no passo: ${failedStep}.
Este erro está impedindo o build de produção. 

ERRO DETECTADO:
---
${relevantError}
---

MISSÃO: 
1. Analise o erro acima.
2. Use a ferramenta 'read_file' para ler o arquivo mencionado no erro.
3. Corrija o código de forma cirúrgica para que o build passe.
4. Você é a ÚLTIMA BARREIRA de qualidade antes da Galeria. Não falhe.`;

            await executeGeminiPhase(repairPrompt, `Auto-Cura (${failedStep})`, '🔧', 4000);
        } else {
            throw new Error(`O Quality Gate falhou após ${maxAttempts} tentativas. Último erro em: ${failedStep}`);
        }
    }
}

(async () => {
    const startTime = Date.now();
    let previewProcess;
    console.clear();
    console.log(`${c.cyan}${c.bold}=============================================================${c.reset}`);
    console.log(`${c.cyan}${c.bold}🚀 AUTO-FORGE v8.2 | ESM NATIVE & ROBUST I/O${c.reset}`);
    console.log(`${c.cyan}${c.bold}=============================================================${c.reset}\n`);

    sendTelemetry('forge-status', '🔥 Iniciando Motor de Forja...');
    logAction('Motor iniciado. Aguardando diretrizes do Control Center...');

    const killAll = async () => {
        logAction('Iniciando limpeza seletiva de processos filhos...');
        
        // Mata processos registrados individualmente (Isolamento total)
        for (const pid of trackedPids) {
            try {
                logAction(`Encerrando processo filho rastreado PID: ${pid}`);
                if (process.platform === 'win32') {
                    execSync(`taskkill /pid ${pid} /F`, { stdio: 'ignore', windowsHide: true });
                } else {
                    process.kill(pid, 'SIGKILL');
                }
            } catch (e) {
                // Processo já pode ter morrido
            }
            trackedPids.delete(pid);
        }

        // Limpeza específica do previewProcess se ainda estiver vivo
        if (previewProcess && !previewProcess.killed) {
            try {
                logAction(`Encerrando servidor de Preview PID: ${previewProcess.pid}`);
                if (process.platform === 'win32') {
                    execSync(`taskkill /pid ${previewProcess.pid} /F`, { stdio: 'ignore', windowsHide: true });
                } else {
                    previewProcess.kill('SIGKILL');
                }
            } catch (e) {}
        }
        
        // Limpeza assíncrona da porta 3001
        try {
            const { exec } = await import('child_process');
            const cmd = process.platform === 'win32' 
                ? 'npx.cmd kill-port 3001' 
                : 'npx kill-port 3001';
            logAction('Liberando porta 3001...');
            exec(cmd, { windowsHide: true });
        } catch(e) {}
    };

    process.on('SIGINT', async () => {
        console.log(`\n${c.yellow}⚠ Interrupção detectada. Limpando processos...${c.reset}`);
        await killAll();
        process.exit(0);
    });

    try {
        const isResuming = await prepareSandbox();

        // Recover state if resuming
        let currentCat = cat;
        let currentTheme = theme;
        let currentTier = designTier;

        if (isResuming) {
            const statePath = path.join(TEMPLATES_DIR, 'forge', 'state_dump.json');
            if (fs.existsSync(statePath)) {
                const state = JSON.parse(fs.readFileSync(statePath, 'utf8'));
                currentCat = state.category;
                currentTheme = state.theme;
                currentTier = state.tier;
            }
        }

        if (!isResuming) {
            console.log(`\n${c.cyan}▶ Fase 1: Contextualização (Gerando State Dump)${c.reset}`);
            sendTelemetry('forge-status', '🧠 Fase 1: Contextualização (Injetando Contexto Neural)...');
            await generateForgeContext();
            await new Promise(r => setTimeout(r, 1000));

            console.log(`\n${c.cyan}▶ Fase 2a: O Arquiteto (Fundação & Design System)${c.reset}`);
            sendTelemetry('forge-status', '🏗️ Fase 2a: O Arquiteto (Design System & Fundação)');
            await executeGeminiPhase(`Leia @forge/2a-arquiteto.md`, 'Fase 2a (Arquiteto)', '🏗️', 2000);

            logAction('Iniciando Servidor Next.js (Live Preview)...');
            sendTelemetry('forge-status', '🌐 Iniciando Servidor Next.js (Live Preview)...');
            const nextCmd = process.platform === 'win32' ? 'npx.cmd' : 'npx';
            const nextArgs = ['next', 'dev', '-p', '3001'];
            logCommand(nextCmd, nextArgs);
            previewProcess = spawn(nextCmd, nextArgs, {
                cwd: SANDBOX_DIR,
                stdio: ['pipe', 'pipe', 'pipe'],
                shell: true,
                windowsHide: true
            });

            registerPid(previewProcess.pid);

            previewProcess.stdout.on('data', (data) => {
                sendTelemetry('telemetry-raw-internal', `[Next.js] ${data.toString()}`);
            });
            previewProcess.stderr.on('data', (data) => {
                sendTelemetry('telemetry-raw-internal', `[Next.js ERROR] ${data.toString()}`);
            });

            previewProcess.on('error', (err) => {
                logAction(`ERRO CRÍTICO no Next.js: ${err.message}`);
                console.error(`${c.yellow}❌ Falha ao iniciar Live Preview: ${err.message}${c.reset}`);
                sendTelemetry('telemetry-raw-internal', `[Next.js FATAL] ${err.message}`);
            });
            await new Promise(r => setTimeout(r, 4000));
            console.log(`\n${c.green}▶ Live Preview Ativo na porta 3001${c.reset}\n`);
            sendTelemetry('forge-status', '✅ Live Preview Ativo na Porta 3001');

            // 🐝 ENXAME PARALELO (Scatter-Gather)
            sendTelemetry('forge-status', '🐝 Invocando Enxame (Landing, Auth, Dashboard)...');
            await executeGeminiSwarm([
                { id: 'LANDING', promptFile: 'forge/2b-swarm-landing.md' },
                { id: 'AUTH', promptFile: 'forge/2b-swarm-auth.md' },
                { id: 'DASHBOARD', promptFile: 'forge/2b-swarm-dashboard.md' }
            ]);

            console.log(`\n${c.cyan}▶ Fase 2c: O Costureiro (Integração & Rotas)${c.reset}`);
            sendTelemetry('forge-status', '🧵 Fase 2c: O Costureiro (Integração & Rotas)');
            await executeGeminiPhase(`Leia @forge/2c-costureiro.md`, 'Fase 2c (Costureiro)', '🧵', 2000);
        }

        // Quality Gate com Barreira Estrita
        sendTelemetry('forge-status', '🛡️ Iniciando Quality Gate (Validação Tripla)...');
        await runQualityGate();
        
        // Fase 3: Captura Visual (Puppeteer)
        console.log(`\n${c.cyan}▶ Fase 3: Captura Visual (Screenshots)${c.reset}`);
        sendTelemetry('forge-status', '📸 Fase 3: Captura Visual (Screenshots)');
        await executeGeminiPhase(`Leia @forge/3-capturar.md`, 'Fase 3 (Captura)', '📸', 2000);

        // Encerrar preview antes de empacotar
        await killAll();

        sendTelemetry('forge-status', '📦 Fase 4: Empacotando Template Final...');
        await executeGeminiPhase(`Leia @forge/4-empacotar.md. A categoria é "${currentCat}" e o tema "${currentTheme}".`, 'Fase 4 (Empacotar)', '📦', 0);

        const totalSeconds = Math.floor((Date.now() - startTime) / 1000);
        console.log(`\n${c.green}${c.bold}✨ SUCESSO! Tempo Total: ${totalSeconds}s${c.reset}`);
        sendTelemetry('forge-status', `✨ SUCESSO! Finalizado em ${totalSeconds}s`);
        
        // Sincronização IPC: Token de sucesso para o Electron
        console.log('\n[FORGE_SUCCESS]');
        await new Promise(r => setTimeout(r, 1000));
        
    } catch (error) {
        console.error(`\n${c.yellow}❌ Falha crítica no pipeline:${c.reset}`, error.message);
        sendTelemetry('forge-status', `❌ Falha: ${error.message}`);
        await killAll();
        console.log(`\n${c.yellow}[FORGE_FAILED] O template gerado possui erros que não puderam ser curados.${c.reset}`);
        process.exit(1);
    }
})();

