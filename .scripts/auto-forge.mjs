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

// --- UTILITÁRIOS VISUAIS ---
const c = {
    reset: "\x1b[0m",
    cyan: "\x1b[36m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    gray: "\x1b[90m",
    bold: "\x1b[1m",
    red: "\x1b[31m"
};
const spinnerFrames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];

// --- ETAPA 1: PARÂMETROS DINÂMICOS ---
const cat = process.env.FORGE_CATEGORY || 'Recursos Humanos HR';
const theme = process.env.FORGE_THEME || 'Dark Mode';
const designTier = parseInt(process.env.FORGE_TIER) || 1;

// Configuração CI para evitar prompts invisíveis e erros de console no Windows
const ENV_CI = {
    ...process.env,
    CI: 'true',
    NEXT_TELEMETRY_DISABLED: '1',
    npm_config_yes: 'true',
    IGNORE_CONPTY: '1', // Corrige Erro: AttachConsole failed no Windows
    TERM: 'dumb' // Força modo não-interativo em ferramentas que detectam TTY
};

const prompts = [
    `Leia e EXECUTE rigorosamente o que pede o forge/1-iniciar.md. Categoria: [${cat}], Modo de Tema: [${theme}], Design Tier: [Tier ${designTier}]. Gere e salve o arquivo forge-context.md.`,
    `Leia e EXECUTE as ordens de forge/2a-setup.md. LEIA TAMBÉM forge/tiers/tier-${designTier}.md. ATENÇÃO: Se for instalar pacotes (npm/npx), você é OBRIGADO a usar as flags '--yes --silent --no-audit --no-fund' e executar dentro do diretório forge/sandbox/. Nunca instale na raiz.`,
    `Leia e EXECUTE as ordens de forge/2b-public-ui.md. LEIA TAMBÉM forge/tiers/tier-${designTier}.md para manter a consistência da Persona.`,
    `Leia e EXECUTE as ordens de forge/2c-internal-ui.md. LEIA TAMBÉM forge/tiers/tier-${designTier}.md para manter a consistência da Persona.`,
    `Leia e EXECUTE as ordens de forge/3-capturar.md.`,
    `Leia e EXECUTE as ordens de forge/4-empacotar.md. DESTINO EXATO: "templates-library/${cat}/${theme}/". Leia o forge-context.md para pegar o Nome do Projeto. Mova o conteúdo do sandbox para o destino e depois APAGUE a pasta sandbox.`
];

async function sleep(ms) {
    let secondsLeft = Math.ceil(ms / 1000);
    return new Promise(resolve => {
        const countdown = setInterval(() => {
            secondsLeft--;
            if (secondsLeft <= 0) {
                clearInterval(countdown);
                resolve();
            }
        }, 1000);
    });
}

// --- ETAPA 3: BLINDAGEM DO AGENTE (LOGS E TIMEOUT) ---
function executeGeminiPhase(promptText, stepName, icon = '🤖', timeoutMs = null) { // Default null (infinito) para criação
    return new Promise((resolve, reject) => {
        const isWindows = process.platform === 'win32';
        const cmdStr = isWindows ? 'gemini.cmd' : 'gemini';

        const child = spawn(`${cmdStr} --yolo`, {
            cwd: TEMPLATES_DIR,
            stdio: ['pipe', 'pipe', 'pipe'], 
            shell: true,
            env: ENV_CI
        });

        let killSwitch = null;
        if (timeoutMs) {
            killSwitch = setTimeout(() => {
                child.kill('SIGKILL');
                clearInterval(spinnerInterval);
                process.stdout.write(`\n${c.red}⚠️ [TIMEOUT] Agente travou em ${stepName} e foi abatido.${c.reset}\n`);
                reject(new Error(`TIMEOUT CRÍTICO: ${stepName}`));
            }, timeoutMs);
        }

        child.stdin.write(promptText + '\n');
        child.stdin.end(); 

        // Pipe de logs reais para o Cockpit
        child.stdout.on('data', (chunk) => {
            process.stdout.write(c.gray + chunk.toString() + c.reset);
        });

        child.stderr.on('data', (chunk) => {
            process.stdout.write(c.red + chunk.toString() + c.reset);
        });

        let seconds = 0;
        let i = 0;
        const spinnerInterval = setInterval(() => {
            const frame = spinnerFrames[i % spinnerFrames.length];
            process.stdout.write(`\r${c.cyan}${frame}${c.reset} ${icon} ${stepName} ${c.gray}[${seconds}s]${c.reset}`);
            i++;
        }, 100);

        const timerInterval = setInterval(() => { seconds++; }, 1000);

        child.on('close', (code) => {
            if (killSwitch) clearTimeout(killSwitch);
            clearInterval(spinnerInterval);
            clearInterval(timerInterval);
            if (code === 0) {
                process.stdout.write(`\r${c.green}✓${c.reset} ${icon} ${stepName} concluída. ${c.gray}[${seconds}s]${c.reset}\n`);
                resolve();
            } else {
                reject(new Error(`Fase ${stepName} falhou com código ${code}`));
            }
        });
    });
}

// --- ETAPA 4: QUALITY GATE TURBO ---
async function runQualityGate() {
    let passed = false;
    let attempts = 0;
    const MAX_ATTEMPTS = 2;

    while (!passed && attempts < MAX_ATTEMPTS) {
        attempts++;
        process.stdout.write(`\r${c.yellow}⠋${c.reset} 🛡️  Quality Gate: Validando com TSC... (Tentativa ${attempts}/${MAX_ATTEMPTS})\n`);

        try {
            execSync('npx --yes tsc --noEmit', { 
                cwd: SANDBOX_DIR, 
                stdio: 'pipe',
                env: ENV_CI
            });
            process.stdout.write(`${c.green}✓ Quality Gate aprovado! Código estável.${c.reset}\n`);
            passed = true;
        } catch (error) {
            process.stdout.write(`${c.yellow}⚠ Quality Gate falhou! Destilando erros...${c.reset}\n`);
            
            const rawError = error.stdout ? error.stdout.toString() : error.message;
            const filteredError = rawError.split('\n')
                .filter(line => line.includes('error') || line.includes('TS') || line.includes('.tsx') || line.includes('.ts'))
                .slice(0, 15)
                .join('\n');

            if (attempts < MAX_ATTEMPTS) {
                const repairPrompt = `⚠️ VALIDAÇÃO TSC FALHOU. Analise os erros abaixo e CONSERTE O CÓDIGO imediatamente. FOCO: 'use client' em hooks e caminhos de importação.\n\nLOG DESTILADO:\n${filteredError}`;
                // Auto-Cura mantém o timeout de 90s por segurança
                await executeGeminiPhase(repairPrompt, 'Auto-Cura (Reparo TSC)', '🔧', 90000);
            } else {
                throw new Error("Limite de Auto-Healing atingido. O código permanece instável.");
            }
        }
    }
}

// --- EXECUÇÃO PRINCIPAL ---
(async () => {
    const startTime = Date.now();
    console.clear();
    console.log(`${c.cyan}${c.bold}🚀 FORGE ENGINE v8.1 | STABILITY & UNLIMITED CREATION TIME${c.reset}\n`);
    
    console.log(`📦 Categoria : ${c.bold}${cat}${c.reset}`);
    console.log(`🎨 Tema      : ${c.bold}${theme}${c.reset}`);
    console.log(`💎 Tier      : ${c.bold}Tier ${designTier}${c.reset}\n`);

    try {
        await executeGeminiPhase(prompts[0], 'Fase 1 (Contexto)', '📝');
        await sleep(2000);
        
        await executeGeminiPhase(prompts[1], 'Fase 2A (Infraestrutura)', '⚙️');
        
        // --- ETAPA 2: HOOK DE LIVE PREVIEW ---
        console.log(`\n${c.cyan}📡 Inicializando Servidor de Preview...${c.reset}`);
        const previewProcess = spawn('npx', ['--yes', 'next', 'dev', '-p', '3001'], {
            cwd: SANDBOX_DIR,
            env: ENV_CI,
            shell: true,
            stdio: 'ignore' // Background
        });

        await sleep(8000); // Tempo para o Next.js subir
        console.log('\n[SYSTEM] PREVIEW_ACTIVE_3001');
        
        await executeGeminiPhase(prompts[2], 'Fase 2B (Public UI)', '🎨');
        await executeGeminiPhase(prompts[3], 'Fase 2C (Internal UI)', '🧠');
        
        await runQualityGate();

        await executeGeminiPhase(prompts[4], 'Fase 3 (Fotografias)', '📸');
        await executeGeminiPhase(prompts[5], 'Fase 4 (Empacotar)', '📦');

        // Cleanup: Mata o servidor de preview
        try { execSync('npx kill-port 3001', { stdio: 'ignore' }); } catch(e) {}

        const totalSeconds = Math.floor((Date.now() - startTime) / 1000);
        console.log(`\n${c.green}${c.bold}✨ SUCESSO ABSOLUTO! [${totalSeconds}s]${c.reset}`);
        console.log(`📁 Template disponível na sua Galeria SOA!\n`);

    } catch (error) {
        // Garantir cleanup em caso de erro
        try { execSync('npx kill-port 3001', { stdio: 'ignore' }); } catch(e) {}
        console.error(`\n${c.red}❌ CICLO INTERROMPIDO: ${error.message}${c.reset}\n`);
        process.exit(1);
    }
})();
