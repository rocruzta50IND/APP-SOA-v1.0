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

const c = {
    reset: "\x1b[0m",
    cyan: "\x1b[36m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    gray: "\x1b[90m",
    bold: "\x1b[1m"
};

const THEMES = ['Duo Model', 'Dark Mode', 'Light Mode'];

// 🧹 VASSOURA AUTOMÁTICA
const strayItems = ['node_modules', 'package.json', 'package-lock.json'];
strayItems.forEach(item => {
    const strayPath = path.join(TEMPLATES_DIR, item);
    if (fs.existsSync(strayPath)) fs.rmSync(strayPath, { recursive: true, force: true });
});

if (!fs.existsSync(LIB_PATH)) fs.mkdirSync(LIB_PATH, { recursive: true });
if (!fs.existsSync(path.dirname(SANDBOX_DIR))) fs.mkdirSync(path.dirname(SANDBOX_DIR), { recursive: true });

const categories = fs.existsSync(LIB_PATH) ? fs.readdirSync(LIB_PATH).filter(f => fs.statSync(path.join(LIB_PATH, f)).isDirectory()) : [];
if (categories.length === 0) {
    categories.push('Geral');
    if (!fs.existsSync(path.join(LIB_PATH, 'Geral'))) fs.mkdirSync(path.join(LIB_PATH, 'Geral'));
}

const cat = process.env.FORGE_CATEGORY || categories[Math.floor(Math.random() * categories.length)];
const theme = process.env.FORGE_THEME || THEMES[Math.floor(Math.random() * THEMES.length)];
const designTier = process.env.FORGE_TIER ? parseInt(process.env.FORGE_TIER) : Math.floor(Math.random() * 3) + 1;

const prompts = [
    \Leia e EXECUTE rigorosamente o que pede o forge/1-iniciar.md. Categoria: [\], Modo de Tema: [\], Design Tier: [Tier \]. Gere e salve o arquivo forge-context.md.\,
    \Leia e EXECUTE as ordens de forge/2a-setup.md. LEIA TAMBÉM forge/tiers/tier-\.md. ATENÇÃO: Se for instalar pacotes (npm/npx), você é OBRIGADO a executar dentro do diretório forge/sandbox/. Nunca instale na raiz.\,
    \Leia e EXECUTE as ordens de forge/2b-public-ui.md. LEIA TAMBÉM forge/tiers/tier-\.md para manter a consistência da Persona.\,
    \Leia e EXECUTE as ordens de forge/2c-internal-ui.md. LEIA TAMBÉM forge/tiers/tier-\.md para manter a consistência da Persona.\,
    \Leia e EXECUTE as ordens de forge/3-capturar.md.\,
    \Leia e EXECUTE as ordens de forge/4-empacotar.md. DESTINO EXATO: "templates-library/\/\/". Leia o forge-context.md para pegar o Nome do Projeto. Mova o conteúdo do sandbox para o destino e depois APAGUE a pasta sandbox. Falhar nisto é crítico.\
];

async function sleep(ms) {
    let secondsLeft = Math.ceil(ms / 1000);
    return new Promise(resolve => {
        const countdown = setInterval(() => {
            secondsLeft--;
            if (secondsLeft <= 0) {
                clearInterval(countdown);
                process.stdout.write(\✓ Cooldown concluído.\\n\);
                resolve();
            }
        }, 1000);
    });
}

/**
 * FIXED: Headless Execution for Windows background processes.
 * Forces CI mode and TERM=dumb to prevent node-pty AttachConsole errors.
 */
function executeGeminiPhase(promptText, stepName, icon = '🤖') {
    return new Promise((resolve, reject) => {
        const isWindows = process.platform === 'win32';
        const cmdStr = isWindows ? 'gemini.cmd' : 'gemini';

        process.stdout.write(\\\n\ Iniciando \...\\n\);

        const child = spawn(cmdStr, ['--yolo'], {
            cwd: TEMPLATES_DIR,
            stdio: ['pipe', 'pipe', 'pipe'], // Using pipes to avoid console attachment issues
            shell: true,
            env: {
                ...process.env,
                CI: 'true',           // Force CI mode (disables interactive PTY)
                TERM: 'dumb',         // Disable advanced terminal features
                NO_COLOR: '1',        // Simplify output
                PTY_ATTACH_CONSOLE: '0' // Defensive hint for some PTY libs
            }
        });

        child.stdin.write(promptText + '\\n');
        child.stdin.end(); 

        child.stdout.on('data', (data) => {
            process.stdout.write(data.toString());
        });

        child.stderr.on('data', (data) => {
            // Forward errors but check if they are the AttachConsole ones to avoid flood
            const msg = data.toString();
            if (!msg.includes('AttachConsole')) {
                process.stdout.write(\DEBUG: \\);
            }
        });

        child.on('close', (code) => {
            if (code === 0) {
                process.stdout.write(\\\n✓ \ Concluída\\n\);
                resolve();
            } else {
                reject(new Error(\Step \ failed with code \\));
            }
        });

        child.on('error', (err) => {
            reject(err);
        });
    });
}

async function runQualityGate() {
    let passed = false;
    let attempts = 0;
    const MAX_ATTEMPTS = 3;

    if (!fs.existsSync(SANDBOX_DIR)) return;

    while (!passed && attempts < MAX_ATTEMPTS) {
        process.stdout.write(\\\n🛡️  Quality Gate (Tentativa \/\)...\\n\);
        try {
            if (!fs.existsSync(path.join(SANDBOX_DIR, 'node_modules'))) {
                execSync('npm install', { cwd: SANDBOX_DIR, stdio: 'ignore' });
            }
            execSync('npx next build', { cwd: SANDBOX_DIR, stdio: 'ignore' });
            process.stdout.write(\✓ Quality Gate aprovado!\\n\);
            passed = true;
        } catch (error) {
            attempts++;
            if (attempts < MAX_ATTEMPTS) {
                const repairPrompt = \⚠️ QUALITY GATE FALHOU. O 'next build' quebrou. Analise e CONSERTE O CÓDIGO (adicione 'use client', corrija imports, etc). NÃO adicione features, apenas faça compilar.\;
                await executeGeminiPhase(repairPrompt, 'Auto-Cura', '🔧');
                await sleep(5000);
            }
        }
    }
}

(async () => {
    const startTime = Date.now();
    process.stdout.write(\\\n🚀 AUTO-FORGE v7.6 | HEADLESS STABILIZED\\n\);
    
    try {
        await executeGeminiPhase(prompts[0], 'Fase 1 (Contexto)', '📝');
        await sleep(5000);
        await executeGeminiPhase(prompts[1], 'Fase 2A (Infraestrutura)', '⚙️');
        await sleep(5000);
        await executeGeminiPhase(prompts[2], 'Fase 2B (Public UI)', '🎨');
        await sleep(5000);
        await executeGeminiPhase(prompts[3], 'Fase 2C (Internal UI)', '🧠');
        await runQualityGate();
        await executeGeminiPhase(prompts[4], 'Fase 3 (Fotografias)', '📸');
        await sleep(5000);
        await executeGeminiPhase(prompts[5], 'Fase 4 (Empacotar)', '📦');

        const totalSeconds = Math.floor((Date.now() - startTime) / 1000);
        process.stdout.write(\\\n✨ SUCESSO ABSOLUTO em \s!\\n\);
    } catch (error) {
        process.stdout.write(\\\n❌ ERRO CRÍTICO: \\\n\);
    }
})();
