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

// --- UTILITÁRIOS VISUAIS (CORES E SPINNERS) ---
const c = {
    reset: "\x1b[0m",
    cyan: "\x1b[36m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    gray: "\x1b[90m",
    bold: "\x1b[1m"
};
const spinnerFrames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
const clearLine = "\x1b[2K\x1b[0G"; // <-- NOVO: Limpa a linha para o xterm.js renderizar os spinners sem falhas

const THEMES = ['Duo Model', 'Dark Mode', 'Light Mode'];

// 🧹 VASSOURA AUTOMÁTICA: Remove lixo criado acidentalmente pela IA na raiz
const strayItems = ['node_modules', 'package.json', 'package-lock.json'];
strayItems.forEach(item => {
    const strayPath = path.join(TEMPLATES_DIR, item);
    if (fs.existsSync(strayPath)) fs.rmSync(strayPath, { recursive: true, force: true });
});

if (!fs.existsSync(LIB_PATH)) fs.mkdirSync(LIB_PATH, { recursive: true });
const categories = fs.readdirSync(LIB_PATH).filter(f => fs.statSync(path.join(LIB_PATH, f)).isDirectory());

if (categories.length === 0) {
    console.error(`${c.yellow}❌ ERRO: A pasta "templates-library" está vazia.${c.reset}`);
    process.exit(1);
}

// <-- CORREÇÃO 1: Lendo as variáveis da Interface (UI)
const cat = process.env.FORGE_CATEGORY || categories[Math.floor(Math.random() * categories.length)];
const theme = process.env.FORGE_THEME || THEMES[Math.floor(Math.random() * THEMES.length)];
const designTier = process.env.FORGE_TIER || Math.floor(Math.random() * 3) + 1;

// 🔒 PROMPTS BLINDADOS E INJEÇÃO DE CONTEXTO
const prompts = [
    `Leia e EXECUTE rigorosamente o que pede o forge/1-iniciar.md. Categoria: [${cat}], Modo de Tema: [${theme}], Design Tier: [Tier ${designTier}]. Gere e salve o arquivo forge-context.md.`,
    `Leia e EXECUTE as ordens de forge/2a-setup.md. LEIA TAMBÉM forge/tiers/tier-${designTier}.md. ATENÇÃO: Se for instalar pacotes (npm/npx), você é OBRIGADO a executar dentro do diretório forge/sandbox/. Nunca instale na raiz.`,
    `Leia e EXECUTE as ordens de forge/2b-public-ui.md. LEIA TAMBÉM forge/tiers/tier-${designTier}.md para manter a consistência da Persona.`,
    `Leia e EXECUTE as ordens de forge/2c-internal-ui.md. LEIA TAMBÉM forge/tiers/tier-${designTier}.md para manter a consistência da Persona.`,
    `Leia e EXECUTE as ordens de forge/3-capturar.md. O projeto está rodando em http://localhost:3002. Você DEVE usar uma ferramenta de browser headless (como puppeteer ou playwright) para navegar até essa URL e tirar os screenshots. É ESTRITAMENTE PROIBIDO tirar print da tela do sistema operacional.`,
    `Leia e EXECUTE as ordens de forge/4-empacotar.md. DESTINO EXATO: "templates-library/${cat}/${theme}/". Leia o forge-context.md para pegar o Nome do Projeto. Mova o conteúdo do sandbox para o destino e depois APAGUE a pasta sandbox. Falhar nisto é crítico.`
];

async function sleep(ms) {
    let secondsLeft = ms / 1000;
    let i = 0;
    
    return new Promise(resolve => {
        const timer = setInterval(() => {
            const frame = spinnerFrames[i % spinnerFrames.length];
            process.stdout.write(`${clearLine}${c.gray}${frame} Cooldown API... ${secondsLeft}s${c.reset}  `);
            i++;
        }, 100);

        const countdown = setInterval(() => {
            secondsLeft--;
            if (secondsLeft <= 0) {
                clearInterval(timer);
                clearInterval(countdown);
                process.stdout.write(`${clearLine}${c.gray}✓ Cooldown API concluído.      ${c.reset}\n`);
                resolve();
            }
        }, 1000);
    });
}

function executeGeminiPhase(promptText, stepName, icon = '🤖') {
    return new Promise((resolve, reject) => {
        const isWindows = process.platform === 'win32';
        const cmdStr = isWindows ? 'gemini.cmd' : 'gemini';

        // <-- CORREÇÃO 2: stdio inherit para repassar os logs da IA direto para o seu frontend
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
            // <-- CORREÇÃO 3: Limpeza de linha no spinner
            process.stdout.write(`${clearLine}${c.cyan}${frame}${c.reset} ${icon} ${stepName} ${c.gray}[${seconds}s]${c.reset}`);
            i++;
        }, 100);

        const timer = setInterval(() => { seconds++; }, 1000);

        child.on('close', (code) => {
            clearInterval(spinner);
            clearInterval(timer);
            process.stdout.write(`${clearLine}${c.green}✓${c.reset} ${icon} ${stepName} ${c.gray}[${seconds}s]${c.reset}\n\n`);
            
            if (code !== 0) {
                reject(new Error(`Falha com código ${code}`));
                return;
            }
            resolve();
        });

        child.on('error', (err) => {
            clearInterval(spinner);
            clearInterval(timer);
            console.error(`\n${c.yellow}❌ Erro na ${stepName}:${c.reset}`, err);
            reject(err);
        });
    });
}

async function runQualityGate() {
    let passed = false;
    let attempts = 0;
    const MAX_ATTEMPTS = 3;
    let prodProcess = null;

    while (!passed && attempts < MAX_ATTEMPTS) {
        let seconds = 0;
        let i = 0;
        
        const spinner = setInterval(() => {
            const frame = spinnerFrames[i % spinnerFrames.length];
            process.stdout.write(`${clearLine}${c.yellow}${frame}${c.reset} 🛡️  Quality Gate (Tentativa ${attempts + 1}/${MAX_ATTEMPTS}) ${c.gray}[${seconds}s]${c.reset}`);
            i++;
        }, 100);

        const timer = setInterval(() => { seconds++; }, 1000);

        try {
            // 1. Build project
            execSync('npx next build', { cwd: SANDBOX_DIR, stdio: 'pipe' });
            
            // 2. Start production server
            const isWindows = process.platform === 'win32';
            prodProcess = spawn(isWindows ? 'npx.cmd' : 'npx', ['next', 'start', '-p', '3002'], {
                cwd: SANDBOX_DIR,
                stdio: 'ignore',
                windowsHide: true,
                shell: true
            });

            // 3. Wait a few seconds for the server to start
            await new Promise(resolve => setTimeout(resolve, 5000));

            // 4. Check if it's alive and returning 200 OK
            const response = await fetch('http://localhost:3002/');
            if (!response.ok) {
                throw new Error(`Servidor iniciou mas retornou HTTP ${response.status}`);
            }

            clearInterval(spinner);
            clearInterval(timer);
            process.stdout.write(`${clearLine}${c.green}✓${c.reset} 🛡️  Quality Gate aprovado! Código blindado e rodando na porta 3002. ${c.gray}[${seconds}s]${c.reset}\n`);
            passed = true;
            return prodProcess;

        } catch (error) {
            clearInterval(spinner);
            clearInterval(timer);
            
            if (prodProcess) {
                try {
                    if (process.platform === 'win32') execSync(`taskkill /pid ${prodProcess.pid} /T /F`, { stdio: 'ignore' });
                    else prodProcess.kill();
                } catch(e) {}
                prodProcess = null;
            }

            process.stdout.write(`${clearLine}${c.yellow}⚠${c.reset} 🛡️  Quality Gate reprovado! Iniciando reparo... ${c.gray}[${seconds}s]${c.reset}\n`);
            attempts++;
            
            if (attempts < MAX_ATTEMPTS) {
                const errorMsg = error.stdout ? error.stdout.toString() : error.message;
                const repairPrompt = `⚠️ QUALITY GATE FALHOU. O 'next build' ou o 'next start' quebrou. Analise o log abaixo e CONSERTE O CÓDIGO (ex: se for erro de Context/Hook, adicione 'use client' no topo do arquivo; corrija imports; etc). NÃO adicione features, apenas faça o código compilar e rodar.\n\nERRO:\n${errorMsg.substring(0, 1500)}`;
                await executeGeminiPhase(repairPrompt, 'Auto-Cura (Reparo de Build)', '🔧');
            } else {
                console.log(`${c.yellow}⚠️ Auto-Healing esgotado. Forçando avanço.${c.reset}\n`);
                throw new Error("Quality Gate falhou definitivamente.");
            }
        }
    }
    return prodProcess;
}

(async () => {
    const startTime = Date.now();
    console.clear();
    console.log(`${c.cyan}${c.bold}=============================================================${c.reset}`);
    console.log(`${c.cyan}${c.bold}🚀 AUTO-FORGE v7.2 | UI MINIMALISTA, TIERS & CLEANUP ATIVADOS${c.reset}`);
    console.log(`${c.cyan}${c.bold}=============================================================${c.reset}\n`);
    
    console.log(`📦 Categoria : ${c.bold}${cat}${c.reset}`);
    console.log(`🎨 Tema      : ${c.bold}${theme}${c.reset}`);
    console.log(`💎 Tier      : ${c.bold}Design Nível ${designTier}${c.reset}\n`);

    let previewProcess = null;

    try {
        await executeGeminiPhase(prompts[0], 'Fase 1 (Contexto)', '📝');
        await sleep(10000);
        
        await executeGeminiPhase(prompts[1], 'Fase 2A (Infraestrutura)', '⚙️');
        await sleep(10000);
        
        // --- INÍCIO DO LIVE PREVIEW ---
        console.log(`\n${c.cyan}▶ Iniciando Live Preview na porta 3001...${c.reset}`);
        const isWindows = process.platform === 'win32';
        previewProcess = spawn(isWindows ? 'npx.cmd' : 'npx', ['next', 'dev', '-p', '3001'], {
            cwd: SANDBOX_DIR,
            stdio: 'ignore',
            windowsHide: true,
            shell: true
        });

        await new Promise(resolve => setTimeout(resolve, 5000));
        console.log("\n[SYSTEM] PREVIEW_ACTIVE_3001");
        // ------------------------------

        await executeGeminiPhase(prompts[2], 'Fase 2B (Public UI)', '🎨');
        await sleep(10000);
        
        await executeGeminiPhase(prompts[3], 'Fase 2C (Internal UI)', '🧠');
        
        // --- FIM DO LIVE PREVIEW ---
        if (previewProcess) {
            console.log(`\n${c.yellow}⏹ Encerrando Live Preview (Porta 3001) para Quality Gate...${c.reset}`);
            try {
                if (isWindows) {
                    execSync(`taskkill /pid ${previewProcess.pid} /T /F`, { stdio: 'ignore' });
                } else {
                    previewProcess.kill();
                }
            } catch (e) {}
            previewProcess = null;
        }
        // ---------------------------

        const prodProcess = await runQualityGate();
        await sleep(10000);

        await executeGeminiPhase(prompts[4], 'Fase 3 (Fotografias)', '📸');
        await sleep(10000);
        
        // --- ENCERRAR PROCESSO DE PRODUÇÃO APÓS AS FOTOS ---
        if (prodProcess) {
            console.log(`\n${c.yellow}⏹ Encerrando servidor de produção (Porta 3002)...${c.reset}`);
            try {
                if (isWindows) {
                    execSync(`taskkill /pid ${prodProcess.pid} /T /F`, { stdio: 'ignore' });
                } else {
                    prodProcess.kill();
                }
            } catch (e) {}
        }
        // ----------------------------------------------------

        await executeGeminiPhase(prompts[5], 'Fase 4 (Empacotar)', '📦');

        const totalSeconds = Math.floor((Date.now() - startTime) / 1000);
        const mins = Math.floor(totalSeconds / 60);
        const secs = totalSeconds % 60;

        process.stdout.write('\x07\x07\x07'); 
        console.log(`\n${c.green}${c.bold}✨ SUCESSO ABSOLUTO!${c.reset}`);
        console.log(`⏱️  Tempo Total da Fábrica: ${c.bold}${mins > 0 ? `${mins}m ` : ''}${secs}s${c.reset}`);
        console.log(`📁 Template polido e testado na sua Galeria SOA!\n`);

    } catch (error) {
        if (previewProcess) {
            try {
                if (process.platform === 'win32') execSync(`taskkill /pid ${previewProcess.pid} /T /F`, { stdio: 'ignore' });
                else previewProcess.kill();
            } catch(e) {}
        }
        console.error(`\n${c.yellow}❌ Ciclo interrompido.${c.reset}`, error);
    }
})();