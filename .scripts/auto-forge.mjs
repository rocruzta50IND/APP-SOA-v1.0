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
    bold: "\x1b[1m"
};
const spinnerFrames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
const clearLine = "\x1b[2K\x1b[0G";

const THEMES = ['Duo Model', 'Dark Mode', 'Light Mode'];

// 🧼 LIMPEZA E PREPARAÇÃO
if (!fs.existsSync(LIB_PATH)) fs.mkdirSync(LIB_PATH, { recursive: true });
if (!fs.existsSync(CACHE_DIR)) fs.mkdirSync(CACHE_DIR, { recursive: true });

const categories = fs.readdirSync(LIB_PATH).filter(f => fs.statSync(path.join(LIB_PATH, f)).isDirectory());

const cat = process.env.FORGE_CATEGORY || (categories.length > 0 ? categories[0] : "General");
const theme = process.env.FORGE_THEME || THEMES[Math.floor(Math.random() * THEMES.length)];
const designTier = process.env.FORGE_TIER || 2;

// 🚀 CORE DE OTIMIZAÇÃO: BASE TEMPLATE CACHE
async function prepareSandbox() {
    console.log(`${c.gray}Checking Base Template Cache...${c.reset}`);
    const nextBaseCache = path.join(CACHE_DIR, 'next-base');
    
    if (fs.existsSync(nextBaseCache) && fs.existsSync(path.join(nextBaseCache, 'node_modules'))) {
        console.log(`${c.green}✓ Using cached node_modules.${c.reset}`);
        if (fs.existsSync(SANDBOX_DIR)) fs.rmSync(SANDBOX_DIR, { recursive: true, force: true });
        fs.mkdirSync(SANDBOX_DIR, { recursive: true });
        
        // Fast copy using native fs.cpSync (robust against spaces and cross-platform)
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
            if (process.platform === 'win32') {
                fs.symlinkSync(sourceNM, targetNM, 'junction');
            } else {
                fs.symlinkSync(sourceNM, targetNM, 'dir');
            }
        } catch (linkError) {
            console.log(`${c.yellow}⚠ Link failed, falling back to native copy...${c.reset}`);
            fs.cpSync(sourceNM, targetNM, { recursive: true });
        }
    } else {
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
    fs.writeFileSync(path.join(TEMPLATES_DIR, 'forge', 'state_dump.json'), JSON.stringify(state, null, 2));
    await executeGeminiPhase(`Leia @../1-iniciar.md e use os parâmetros: Categoria="${cat}", Modo="${theme}", Tier="${designTier}".`, 'Fase 1 (Contexto)', '🧠', 1000);
}

async function executeGeminiPhase(promptText, stepName, icon = '🤖', cooldown = 2000) {
    return new Promise((resolve, reject) => {
        const isWindows = process.platform === 'win32';
        const cmdStr = isWindows ? 'gemini.cmd' : 'gemini';

        const child = spawn(`${cmdStr} --yolo`, {
            cwd: TEMPLATES_DIR,
            stdio: ['pipe', 'inherit', 'inherit'], 
            shell: true
        });

        child.stdin.write(promptText + '\n');
        child.stdin.end(); 

        let seconds = 0;
        let i = 0;
        const spinner = setInterval(() => {
            const frame = spinnerFrames[i % spinnerFrames.length];
            process.stdout.write(`${clearLine}${c.cyan}${frame}${c.reset} ${icon} ${stepName} ${c.gray}[${seconds}s]${c.reset}`);
            i++;
        }, 100);

        const timer = setInterval(() => { seconds++; }, 1000);

        child.on('close', async (code) => {
            clearInterval(spinner);
            clearInterval(timer);
            process.stdout.write(`${clearLine}${c.green}✓${c.reset} ${icon} ${stepName} ${c.gray}[${seconds}s]${c.reset}\n`);
            
            if (code !== 0) {
                reject(new Error(`Falha com código ${code}`));
                return;
            }

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
    const activeProcesses = [];
    
    const killAll = () => {
        activeProcesses.forEach(cp => {
            if (!cp.killed) {
                try {
                    if (process.platform === 'win32') {
                        execSync(`taskkill /pid ${cp.pid} /T /F`, { stdio: 'ignore' });
                    } else {
                        cp.kill();
                    }
                } catch (e) {}
            }
        });
    };

    const runTask = (task) => {
        return new Promise((resolve, reject) => {
            const isWindows = process.platform === 'win32';
            const cmdStr = isWindows ? 'gemini.cmd' : 'gemini';
            
            const child = spawn(`${cmdStr} --yolo`, {
                cwd: TEMPLATES_DIR,
                stdio: ['pipe', 'pipe', 'pipe'],
                shell: true,
                env: { 
                    ...process.env, 
                    FORGE_SWARM_MODE: 'true', 
                    FORCE_COLOR: '1' 
                }
            });

            activeProcesses.push(child);

            const prefix = `${c.cyan}[SWARM: ${task.id}]${c.reset} `;

            // Multiplexação de Logs (stdout)
            child.stdout.on('data', (data) => {
                const lines = data.toString().split(/\r?\n/);
                lines.forEach(line => {
                    if (line.trim()) process.stdout.write(`${prefix}${line}\n`);
                });
            });

            // Multiplexação de Erros (stderr)
            child.stderr.on('data', (data) => {
                const lines = data.toString().split(/\r?\n/);
                lines.forEach(line => {
                    if (line.trim()) process.stderr.write(`${prefix}${c.yellow}${line}${c.reset}\n`);
                });
            });

            // Injeção de Prompt
            const promptText = `Leia @${task.promptFile}`;
            child.stdin.write(promptText + '\n');
            child.stdin.end();

            child.on('close', (code) => {
                if (code !== 0) {
                    reject(new Error(`Agente ${task.id} falhou com código ${code}`));
                } else {
                    resolve();
                }
            });
        });
    };

    try {
        console.log(`\n${c.bold}${c.cyan}🐝 Invocando Enxame (Swarm) com ${tasks.length} agentes...${c.reset}\n`);
        await Promise.all(tasks.map(runTask));
        console.log(`\n${c.green}✓ Enxame concluiu todas as tarefas com sucesso.${c.reset}\n`);
    } catch (error) {
        console.error(`\n${c.yellow}🚨 Falha crítica no Enxame: ${error.message}${c.reset}`);
        console.log(`${c.gray}Encerrando todos os agentes remanescentes...${c.reset}`);
        killAll();
        throw error;
    }
}

async function runStep(step, cwd) {
    return new Promise((resolve, reject) => {
        const isWindows = process.platform === 'win32';
        // No Windows, comandos npx precisam do shell: true ou invocar .cmd
        const child = spawn(step.cmd, {
            cwd: cwd,
            stdio: ['ignore', 'pipe', 'pipe'],
            env: { ...process.env, NEXT_TELEMETRY_DISABLED: '1' },
            shell: true
        });

        let outputBuffer = Buffer.from([]);

        child.stdout.on('data', (data) => {
            outputBuffer = Buffer.concat([outputBuffer, data]);
        });

        child.stderr.on('data', (data) => {
            outputBuffer = Buffer.concat([outputBuffer, data]);
        });

        const timeout = setTimeout(() => {
            try {
                if (isWindows) execSync(`taskkill /pid ${child.pid} /T /F`, { stdio: 'ignore' });
                else child.kill('SIGKILL');
            } catch (e) {}
            reject(new Error(`Timeout: ${step.name} excedeu 120s`));
        }, 120000);

        child.on('close', (code) => {
            clearTimeout(timeout);
            const output = outputBuffer.toString().trim();
            if (code !== 0) {
                reject({ code, output });
            } else {
                resolve(output);
            }
        });
    });
}

async function runQualityGate() {
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
            console.log(`\n${c.green}✅ Quality Gate concluído com sucesso.${c.reset}`);
            return true;
        }

        if (attempts < maxAttempts) {
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
    console.log(`${c.cyan}${c.bold}🚀 AUTO-FORGE v8.1 | ESM NATIVE & ROBUST I/O${c.reset}`);
    console.log(`${c.cyan}${c.bold}=============================================================${c.reset}\n`);

    try {
        await prepareSandbox();

        console.log(`\n${c.cyan}▶ Fase 1: Contextualização (Gerando State Dump)${c.reset}`);
        await generateForgeContext();
        await new Promise(r => setTimeout(r, 1000));

        console.log(`\n${c.cyan}▶ Fase 2a: O Arquiteto (Fundação & Design System)${c.reset}`);
        await executeGeminiPhase(`Leia @forge/2a-arquiteto.md`, 'Fase 2a (Arquiteto)', '🏗️', 2000);

        previewProcess = spawn(process.platform === 'win32' ? 'npx.cmd' : 'npx', ['next', 'dev', '-p', '3001'], {
            cwd: SANDBOX_DIR,
            stdio: 'ignore',
            shell: true
        });
        await new Promise(r => setTimeout(r, 4000));
        console.log(`\n${c.green}▶ Live Preview Ativo na porta 3001${c.reset}\n`);

        // 🐝 ENXAME PARALELO (Scatter-Gather)
        await executeGeminiSwarm([
            { id: 'LANDING', promptFile: 'forge/2b-swarm-landing.md' },
            { id: 'AUTH', promptFile: 'forge/2b-swarm-auth.md' },
            { id: 'DASHBOARD', promptFile: 'forge/2b-swarm-dashboard.md' }
        ]);

        console.log(`\n${c.cyan}▶ Fase 2c: O Costureiro (Integração & Rotas)${c.reset}`);
        await executeGeminiPhase(`Leia @forge/2c-costureiro.md`, 'Fase 2c (Costureiro)', '🧵', 2000);

        // Quality Gate com Barreira Estrita
        await runQualityGate();
        
        console.log(`\n${c.cyan}▶ Fase 3: Captura (Script de Puppeteer PENDENTE)${c.reset}`);

        // Encerrar preview antes de empacotar
        if (previewProcess) {
            try {
                if (process.platform === 'win32') execSync(`taskkill /pid ${previewProcess.pid} /T /F`, { stdio: 'ignore' });
                else previewProcess.kill();
            } catch (e) {}
        }

        await executeGeminiPhase(`Leia @forge/4-empacotar.md. A categoria é "${cat}" e o tema "${theme}".`, 'Fase 4 (Empacotar)', '📦', 0);

        const totalSeconds = Math.floor((Date.now() - startTime) / 1000);
        console.log(`\n${c.green}${c.bold}✨ SUCESSO! Tempo Total: ${totalSeconds}s${c.reset}`);
        
        // Sincronização IPC: Token de sucesso para o Electron
        console.log('\n[FORGE_SUCCESS]');
        await new Promise(r => setTimeout(r, 1000));
        
    } catch (error) {
        console.error(`\n${c.yellow}❌ Falha crítica no pipeline:${c.reset}`, error.message);
        
        if (previewProcess) {
            try {
                if (process.platform === 'win32') execSync(`taskkill /pid ${previewProcess.pid} /T /F`, { stdio: 'ignore' });
                else previewProcess.kill();
            } catch (e) {}
        }

        console.log(`\n${c.yellow}[FORGE_FAILED] O template gerado possui erros que não puderam ser curados.${c.reset}`);
        process.exit(1);
    }
})();
