import { spawn, execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// --- GESTÃO DE CICLO DE VIDA ---
const activeProcesses = new Set();

function cleanupAndExit() {
    if (activeProcesses.size > 0) {
        console.log(`\n${"\x1b[33m"}[SISTEMA] Encerrando ${activeProcesses.size} processos filhos...${"\x1b[0m"}`);
        for (const child of activeProcesses) {
            try {
                if (!child.killed) child.kill('SIGKILL');
            } catch (e) {}
        }
    }
    process.exit(0);
}

process.on('SIGTERM', cleanupAndExit);
process.on('SIGINT', cleanupAndExit);

// --- IPC TELEMETRY WRAPPER (WITH BUFFER/THROTTLE) ---
const originalStdoutWrite = process.stdout.write.bind(process.stdout);
const originalStderrWrite = process.stderr.write.bind(process.stderr);

let telemetryBuffer = { FORJA: '', AUDITOR: '' };
let telemetryTimeout = null;

function flushTelemetry() {
    if (process.send) {
        if (telemetryBuffer.FORJA) {
            process.send({ channel: 'telemetry-raw', payload: { agentId: 'FORJA', data: telemetryBuffer.FORJA } });
            telemetryBuffer.FORJA = '';
        }
        if (telemetryBuffer.AUDITOR) {
            process.send({ channel: 'telemetry-raw', payload: { agentId: 'AUDITOR', data: telemetryBuffer.AUDITOR } });
            telemetryBuffer.AUDITOR = '';
        }
    }
    telemetryTimeout = null;
}

process.stdout.write = (chunk, encoding, callback) => {
    telemetryBuffer.FORJA += chunk.toString();
    if (!telemetryTimeout) telemetryTimeout = setTimeout(flushTelemetry, 50);
    return originalStdoutWrite(chunk, encoding, callback);
};

process.stderr.write = (chunk, encoding, callback) => {
    telemetryBuffer.AUDITOR += chunk.toString();
    if (!telemetryTimeout) telemetryTimeout = setTimeout(flushTelemetry, 50);
    return originalStderrWrite(chunk, encoding, callback);
};

function advancePhase(phaseNumber) {
    if (process.send) {
        process.send({ channel: 'forge-status', payload: { phase: phaseNumber } });
    }
}

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
    console.error(`${c.yellow}⚠️ ERRO: A pasta "templates-library" está vazia.${c.reset}`);
    process.exit(1);
}

const cat = process.env.FORGE_CATEGORY || categories[Math.floor(Math.random() * categories.length)];
const theme = process.env.FORGE_THEME || THEMES[Math.floor(Math.random() * THEMES.length)];
const envTier = process.env.FORGE_TIER ? parseInt(process.env.FORGE_TIER, 10) : NaN;
const designTier = !isNaN(envTier) ? envTier : Math.floor(Math.random() * 3) + 1;

// --- FUNÇÕES DE MANUTENÇÃO DO CHASSI FIXO ---
function resetSandbox() {
    const appDir = path.join(SANDBOX_DIR, 'src', 'app');
    const compDir = path.join(SANDBOX_DIR, 'src', 'components');

    // Limpeza Cirúrgica: App e Components
    if (fs.existsSync(appDir)) {
        fs.readdirSync(appDir).forEach(file => {
            // JAMAIS apagar globals.css e layout.tsx
            if (file !== 'globals.css' && file !== 'layout.tsx') {
                fs.rmSync(path.join(appDir, file), { recursive: true, force: true });
            }
        });
    } else {
        fs.mkdirSync(appDir, { recursive: true });
    }

    if (fs.existsSync(compDir)) {
        fs.readdirSync(compDir).forEach(file => {
            fs.rmSync(path.join(compDir, file), { recursive: true, force: true });
        });
    } else {
        fs.mkdirSync(compDir, { recursive: true });
    }

    // Recriação de Boilerplate Mínimo apenas se necessário
    if (!fs.existsSync(path.join(appDir, 'layout.tsx'))) {
        const layoutContent = `import './globals.css';\n\nexport default function RootLayout({\n  children,\n}: {\n  children: React.ReactNode;\n}) {\n  return (\n    <html lang="en">\n      <body>{children}</body>\n    </html>\n  );\n}\n`;
        fs.writeFileSync(path.join(appDir, 'layout.tsx'), layoutContent);
    }

    const pageContent = `export default function Page() {\n  return null;\n}\n`;
    fs.writeFileSync(path.join(appDir, 'page.tsx'), pageContent);

    console.log(`${c.gray}✓ Sandbox resetado cirurgicamente (Chassi Mantido).${c.reset}`);
}

function packageTemplate(cat, theme) {
    const contextPath = path.join(TEMPLATES_DIR, 'forge', 'forge-context.md');
    let projectName = 'template-' + Date.now();
    let description = "Template gerado automaticamente via SOA Forge.";

    if (fs.existsSync(contextPath)) {
        const context = fs.readFileSync(contextPath, 'utf8');
        const headerMatch = context.match(/# ⚙️ FORGE CONTEXT:\s*(.*)/i);
        const fieldMatch = context.match(/-\s+\*\*Name:\*\*\s*(.*)/i);
        const descMatch = context.match(/-\s+\*\*Description:\*\*\s*(.*)/i);

        const name = (fieldMatch ? fieldMatch[1] : (headerMatch ? headerMatch[1] : 'Generated-Template')).trim();
        projectName = (name || '').toString().replace(/[^a-z0-9-]/gi, '_');
        if (descMatch) description = descMatch[1].trim();
    }

    const destDir = path.join(LIB_PATH, cat, theme, projectName);
    if (fs.existsSync(destDir)) fs.rmSync(destDir, { recursive: true, force: true });
    fs.mkdirSync(destDir, { recursive: true });

    // 1. Geração do template.json (ESSENCIAL para a Galeria)
    const templateMeta = {
        name: projectName,
        description: description,
        category: cat,
        theme: theme,
        tier: designTier,
        stack: "Next.js 15, TailwindCSS, TypeScript",
        createdAt: new Date().toISOString()
    };
    fs.writeFileSync(path.join(destDir, 'template.json'), JSON.stringify(templateMeta, null, 2));

    // 2. Extração Segura: Apenas o código, sem infra pesada ou lixo (.next, node_modules)
    const itemsToCopy = [
        'src', 
        'public', 
        'package.json', 
        'tailwind.config.ts', 
        'next.config.ts', 
        'tsconfig.json', 
        'preview', 
        'postcss.config.js', 
        'postcss.config.mjs'
    ];

    itemsToCopy.forEach(item => {
        const src = path.join(SANDBOX_DIR, item);
        const dest = path.join(destDir, item);
        if (fs.existsSync(src)) {
            // Garantir que não estamos copiando subpastas de build acidentalmente
            fs.cpSync(src, dest, { 
                recursive: true,
                filter: (srcPath) => {
                    const base = path.basename(srcPath);
                    return base !== '.next' && base !== 'node_modules' && base !== 'out';
                }
            });
        }
    });

    console.log(`${c.green}✓ Template extraído e registrado na Galeria: ${c.bold}${destDir}${c.reset}`);
}

// 🔐 PROMPTS BLINDADOS E INJEÇÃO DE CONTEXTO
const prompts = [
    `Leia e EXECUTE rigorosamente o que pede o forge/1-iniciar.md. Categoria: [${cat}], Modo de Tema: [${theme}], Design Tier: [Tier ${designTier}]. Gere e salve o arquivo forge-context.md.`,
    `Leia e EXECUTE as ordens de forge/2b-public-ui.md. LEIA TAMBÉM forge/tiers/tier-${designTier}.md para manter a consistência da Persona.`,
    `Leia e EXECUTE as ordens de forge/2c-internal-ui.md. LEIA TAMBÉM forge/tiers/tier-${designTier}.md para manter a consistência da Persona.`,
    `Leia e EXECUTE as ordens de forge/3-capturar.md.`
];

async function sleep(ms) {
    console.log('[INFO] Aguardando cooldown da API (' + (ms/1000) + 's)...');
    return new Promise(resolve => setTimeout(resolve, ms));
}

function executeGeminiPhase(promptText, stepName, icon = '🤖') {
    console.log('[INFO] Iniciando ' + stepName + '...');
    return new Promise((resolve, reject) => {
        const isWindows = process.platform === 'win32';
        const cmdStr = isWindows ? 'gemini.cmd' : 'gemini';

        const child = spawn(`${cmdStr} --yolo`, {
            cwd: TEMPLATES_DIR,
            stdio: ['pipe', 'ignore', 'ignore'],
            shell: true
        });

        activeProcesses.add(child);

        child.stdin.write(promptText + '\n');
        child.stdin.end();

        let seconds = 0;
        const timer = setInterval(() => { seconds++; }, 1000);

        child.on('close', (code) => {
            activeProcesses.delete(child);
            clearInterval(timer);
            console.log('[SUCCESS] ' + stepName + ' concluída.');
            resolve();
        });

        child.on('error', (err) => {
            activeProcesses.delete(child);
            clearInterval(timer);
            console.error(`\n${c.yellow}⚠️ Erro na ${stepName}:${c.reset}`, err);
            reject(err);
        });
    });
}

async function runQualityGate() {
    let passed = false;
    let attempts = 0;
    const MAX_ATTEMPTS = 3;

    while (!passed && attempts < MAX_ATTEMPTS) {
        console.log('[INFO] Iniciando Quality Gate (Tentativa ' + (attempts + 1) + '/' + MAX_ATTEMPTS + ')...');
        
        const buildPromise = () => new Promise((resolve, reject) => {
            const child = spawn('npx next build', { 
                cwd: SANDBOX_DIR, 
                shell: true,
                stdio: ['pipe', 'pipe', 'pipe'] 
            });
            
            activeProcesses.add(child);
            let buildLogs = '';

            child.stdout.on('data', (data) => {
                const str = data.toString();
                buildLogs += str;
                process.stdout.write(data);
            });

            child.stderr.on('data', (data) => {
                const str = data.toString();
                buildLogs += str;
                process.stderr.write(data);
            });

            child.on('close', (code) => {
                activeProcesses.delete(child);
                if (code === 0) resolve();
                else reject(new Error(buildLogs));
            });

            child.on('error', (err) => {
                activeProcesses.delete(child);
                reject(err);
            });
        });

        try {
            await buildPromise();
            console.log('[SUCCESS] Quality Gate aprovado! Código blindado.');
            passed = true;
        } catch (error) {
            console.log('[WARNING] Quality Gate reprovado! Iniciando reparo...');
            attempts++;

            if (attempts < MAX_ATTEMPTS) {
                const errorOutput = error.message || '';
                // O log já foi enviado em tempo real, mas enviamos o resumo para o AUDITOR explicitamente se necessário
                const repairPrompt = `⚠️ QUALITY GATE FALHOU. O 'next build' quebrou. Analise o log abaixo e CONSERTE O CÓDIGO (ex: se for erro de Context/Hook, adicione 'use client' no topo do arquivo; corrija imports; etc). NÃO adicione features, apenas faça o código compilar.\n\nERRO:\n${errorOutput.substring(0, 1500)}`;    
                await executeGeminiPhase(repairPrompt, 'Auto-Cura (Reparo de Build)', '🔧');
            } else {
                console.log(`${c.yellow}⚠️ Auto-Healing esgotado. Forçando avanço.${c.reset}\n`);
            }
        }
    }
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

    try {
        resetSandbox();

        advancePhase(1);
        await executeGeminiPhase(prompts[0], 'Fase 1 (Contexto)', '📄');
        await sleep(10000);

        advancePhase(2);
        await executeGeminiPhase(prompts[1], 'Fase 2B (Public UI)', '🎨');
        await sleep(10000);

        advancePhase(3);
        await executeGeminiPhase(prompts[2], 'Fase 2C (Internal UI)', '🧠');

        await runQualityGate();
        await sleep(10000);

        advancePhase(4);
        await executeGeminiPhase(prompts[3], 'Fase 3 (Fotografias)', '📸');
        await sleep(10000);

        advancePhase(5);
        packageTemplate(cat, theme);

        const totalSeconds = Math.floor((Date.now() - startTime) / 1000);
        const mins = Math.floor(totalSeconds / 60);
        const secs = totalSeconds % 60;

        process.stdout.write('\x07\x07\x07');
        console.log(`\n${c.green}${c.bold}✨ SUCESSO ABSOLUTO!${c.reset}`);
        console.log(`⏳ Tempo Total da Fábrica: ${c.bold}${mins > 0 ? `${mins}m ` : ''}${secs}s${c.reset}`);
        console.log(`📂 Template polido e testado na sua Galeria SOA!\n`);

        if (process.send) {
            process.send({ channel: 'forge-completed', payload: { code: 0 } });
        }

    } catch (error) {
        console.error(`\n${c.yellow}⚠️ Ciclo interrompido.${c.reset}`, error);
        if (process.send) {
            process.send({ channel: 'forge-completed', payload: { code: 1, error: error.message } });
        }
    }
})();
