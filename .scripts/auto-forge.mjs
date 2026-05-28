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

async function runQualityGate() {
    console.log(`${c.yellow}🛡️  Running Quality Gate...${c.reset}`);
    try {
        execSync('npx next build', { cwd: SANDBOX_DIR, stdio: 'pipe', timeout: 60000 });
        console.log(`${c.green}✓ Quality Gate Passed.${c.reset}`);
    } catch (error) {
        console.log(`${c.yellow}⚠ Quality Gate Failed. Attempting auto-repair...${c.reset}`);
        const errorMsg = error.stdout ? error.stdout.toString() : error.message;
        const repairPrompt = `⚠️ QUALITY GATE FALHOU. O 'next build' quebrou. Analise o log e CONSERTE O CÓDIGO. APENAS CONSERTE.\n\nERRO:\n${errorMsg.substring(0, 1000)}`;
        await executeGeminiPhase(repairPrompt, 'Auto-Cura', '🔧', 5000);
    }
}

(async () => {
    const startTime = Date.now();
    console.clear();
    console.log(`${c.cyan}${c.bold}=============================================================${c.reset}`);
    console.log(`${c.cyan}${c.bold}🚀 AUTO-FORGE v8.1 | ESM NATIVE & ROBUST I/O${c.reset}`);
    console.log(`${c.cyan}${c.bold}=============================================================${c.reset}\n`);

    try {
        await prepareSandbox();

        console.log(`\n${c.cyan}▶ Fase 1: Contextualização (Gerando State Dump)${c.reset}`);
        await generateForgeContext();
        await new Promise(r => setTimeout(r, 1000));

        const nextBaseCache = path.join(CACHE_DIR, 'next-base');
        if (!fs.existsSync(path.join(nextBaseCache, 'node_modules'))) {
            await executeGeminiPhase(`Leia e execute as ordens de @../2a-setup.md e considere @../tiers/tier-${designTier}.md`, 'Fase 2A (Setup Base)', '⚙️', 2000);
            
            if (fs.existsSync(path.join(SANDBOX_DIR, 'node_modules'))) {
                console.log(`${c.gray}Caching node_modules for future speedup...${c.reset}`);
                fs.mkdirSync(nextBaseCache, { recursive: true });
                fs.cpSync(SANDBOX_DIR, nextBaseCache, { recursive: true });
            }
        } else {
            console.log(`\n${c.green}▶ Fase 2A: Setup (Ignorado: Base Cache utilizada)${c.reset}`);
        }

        const previewProcess = spawn(process.platform === 'win32' ? 'npx.cmd' : 'npx', ['next', 'dev', '-p', '3001'], {
            cwd: SANDBOX_DIR,
            stdio: 'ignore',
            shell: true
        });
        await new Promise(r => setTimeout(r, 4000));
        console.log(`\n${c.green}▶ Live Preview Ativo na porta 3001${c.reset}\n`);

        await executeGeminiPhase(`Consulte as regras em @../regras.md e @../../.agent/skills/skill-design.md. Agora leia @../2b-public-ui.md e construa a Landing Page.`, 'Fase 2B (Public UI)', '🎨', 2000);
        await executeGeminiPhase(`Mantenha o padrão de @../regras.md. Agora leia @../2c-internal-ui.md e construa o Dashboard Interno.`, 'Fase 2C (Internal UI)', '🧠', 2000);

        await runQualityGate();
        
        console.log(`\n${c.cyan}▶ Fase 3: Captura (Script de Puppeteer PENDENTE)${c.reset}`);

        try {
            if (process.platform === 'win32') execSync(`taskkill /pid ${previewProcess.pid} /T /F`, { stdio: 'ignore' });
            else previewProcess.kill();
        } catch (e) {}

        await executeGeminiPhase(`Leia @../4-empacotar.md. A categoria é "${cat}" e o tema "${theme}".`, 'Fase 4 (Empacotar)', '📦', 0);

        const totalSeconds = Math.floor((Date.now() - startTime) / 1000);
        console.log(`\n${c.green}${c.bold}✨ SUCESSO! Tempo Total: ${totalSeconds}s${c.reset}`);
        
        // Sincronização IPC: Token de sucesso para o Electron
        console.log('\n[FORGE_SUCCESS]');
        await new Promise(r => setTimeout(r, 1000));
        
    } catch (error) {
        console.error(`\n${c.yellow}❌ Falha crítica:${c.reset}`, error);
        process.exit(1);
    }
})();
