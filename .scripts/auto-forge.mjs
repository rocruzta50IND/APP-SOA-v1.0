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
const designTier = !isNaN(envTier) ? envTier : Math.floor(Math.random() * 5) + 1;
console.log(`[INFO] Nível de Design estabelecido: Tier ${designTier}`);

// --- FUNÇÕES DE MANUTENÇÃO DO CHASSI FIXO ---
function resetSandbox() {
    const appDir = path.join(SANDBOX_DIR, 'src', 'app');
    const compDir = path.join(SANDBOX_DIR, 'src', 'components');

    // Blindagem de I/O (Win32/NTFS)
    const cleanDirectory = (dir) => {
        if (!fs.existsSync(dir)) return;
        const items = fs.readdirSync(dir, { withFileTypes: true });
        for (const item of items) {
            const fullPath = path.join(dir, item.name);
            // JAMAIS apagar globals.css e layout.tsx da raiz do app
            if (dir === appDir && (item.name === 'globals.css' || item.name === 'layout.tsx')) {
                continue;
            }
            // JAMAIS apagar componentes base UI pre-fabricados ou wrappers ThreeJS para blindar o build
            if (dir === compDir && (item.name === 'ui' || item.name === 'ThreeScene.tsx' || item.name === 'ThreeSceneClient.tsx')) {
                continue;
            }
            if (item.isSymbolicLink() || (process.platform === 'win32' && item.isDirectory())) {
                const stats = fs.lstatSync(fullPath);
                if (stats.isSymbolicLink()) {
                    fs.unlinkSync(fullPath);
                } else if (process.platform === 'win32') {
                    try {
                        fs.unlinkSync(fullPath); 
                    } catch (e) {
                        if (item.isDirectory()) {
                            cleanDirectory(fullPath);
                            fs.rmSync(fullPath, { recursive: true, force: true });
                        }
                    }
                }
            } else if (item.isDirectory()) {
                cleanDirectory(fullPath);
                fs.rmSync(fullPath, { recursive: true, force: true });
            } else {
                fs.unlinkSync(fullPath);
            }
        }
    };

    // Limpeza Cirúrgica: App e Components
    cleanDirectory(appDir);
    cleanDirectory(compDir);

    if (!fs.existsSync(appDir)) fs.mkdirSync(appDir, { recursive: true });
    if (!fs.existsSync(compDir)) fs.mkdirSync(compDir, { recursive: true });

    // Recriação de Boilerplate Mínimo apenas se necessário
    if (!fs.existsSync(path.join(appDir, 'layout.tsx'))) {
        const layoutContent = `import './globals.css';\n\nexport default function RootLayout({\n  children,\n}: {\n  children: React.ReactNode;\n}) {\n  return (\n    <html lang="en">\n      <body>{children}</body>\n    </html>\n  );\n}\n`;
        fs.writeFileSync(path.join(appDir, 'layout.tsx'), layoutContent);
    }

    const pageContent = `export default function Page() {\n  return null;\n}\n`;
    fs.writeFileSync(path.join(appDir, 'page.tsx'), pageContent);

    console.log(`${c.gray}✓ Sandbox resetado cirurgicamente (Chassi Mantido com Blindagem I/O).${c.reset}`);
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
    `Leia e EXECUTE rigorosamente o que pede o @.templates/forge/1-iniciar.md. Categoria: [${cat}], Modo de Tema: [${theme}], Design Tier: [Tier ${designTier}]. Gere e salve o arquivo forge-context.md. OBRIGATÓRIO: Leia @.templates/forge/regras-ui.md e garanta que nenhuma cor hardcoded (magic strings) seja definida no DNA.`,
    `Leia e EXECUTE as ordens de @.templates/forge/2b-public-ui.md. LEIA TAMBÉM @.templates/forge/tiers/tier-${designTier}.md e a instrução/conteúdo de @.templates/forge/skills/skill-ui-tier-${designTier}.md para manter a consistência da Persona. LEIA OBRIGATORIAMENTE AS REGRAS MESTRAS EM @.templates/forge/regras-ui.md (NENHUMA COR HARDCODED PERMITIDA). Importante: Ao finalizar, crie o arquivo forge/design-dna.md servindo de âncora de design. Garantia Visual: Use sempre um container base \`min-h-screen bg-background text-foreground\`. Implemente skeletons de carregamento para componentes complexos. Se um mock data falhar, a UI deve permanecer estruturalmente intacta. ${designTier >= 4 ? '⚠️ REGRA BUNKER: Para Tiers 4+, componentes Three.js DEVEM ser isolados via next/dynamic com ssr: false em wrappers ThreeScene.tsx.' : ''}`,
    `Leia e EXECUTE as ordens de @.templates/forge/2c-1-core-ui.md. LEIA TAMBÉM @.templates/forge/tiers/tier-${designTier}.md, o conteúdo de @.templates/forge/skills/skill-ui-tier-${designTier}.md e OBRIGATORIAMENTE o arquivo forge/design-dna.md gerado na fase anterior. LEIA OBRIGATORIAMENTE AS REGRAS MESTRAS EM @.templates/forge/regras-ui.md. Construa o App Shell (Sidebar/Header) e a Página 1 (Main Dashboard). Garantia Visual: Use containers \`min-h-screen bg-background text-foreground\` e variáveis CSS para cores. ${designTier >= 4 ? '⚠️ REGRA BUNKER: Proibido importar Three.js ou R3F diretamente em pages. Use componentes isolados.' : ''}`,
    `Leia e EXECUTE as ordens de @.templates/forge/2c-2-secondary-ui.md. LEIA TAMBÉM @.templates/forge/tiers/tier-${designTier}.md, o conteúdo de @.templates/forge/skills/skill-ui-tier-${designTier}.md e @.templates/forge/regras-ui.md. Com base no App Shell construído, construa as 4 páginas secundárias restantes definidas em forge-context.md. ${designTier >= 4 ? '⚠️ REGRA BUNKER: Proibido importar Three.js/R3F em pages.' : ''}`,
    `Leia e EXECUTE as ordens de @.templates/forge/3-capturar.md.`
];

async function executeGeminiPhase(promptText, stepName, model = 'gemini-1.5-flash') {
    let attempts = 0;
    const maxAttempts = 5;
    let baseDelayMs = 2000; // Exponential backoff starts here

    while (attempts < maxAttempts) {
        attempts++;
        if (attempts > 1) {
            console.log(`[INFO] Retentando ${stepName} (Tentativa ${attempts}/${maxAttempts})...`);
        } else {
            console.log(`[INFO] Iniciando ${stepName}...`);
        }

        try {
            await new Promise((resolve, reject) => {
                const isWindows = process.platform === 'win32';
                const cmdStr = isWindows ? 'gemini.cmd' : 'gemini';

                const child = spawn(`${cmdStr} --yolo --model ${model}`, {
                    cwd: TEMPLATES_DIR,
                    stdio: ['pipe', 'pipe', 'pipe'],
                    shell: true
                });

                activeProcesses.add(child);

                let outputStr = '';

                child.stdout.on('data', (data) => {
                    const chunk = data.toString();
                    outputStr += chunk;
                    // Echo back for visibility
                    process.stdout.write(chunk);
                });

                child.stderr.on('data', (data) => {
                    const chunk = data.toString();
                    outputStr += chunk;
                    // Echo back for visibility
                    process.stderr.write(chunk);
                });

                child.stdin.write(promptText + '\n');
                child.stdin.end();

                let seconds = 0;
                const timer = setInterval(() => { seconds++; }, 1000);

                child.on('close', (code) => {
                    activeProcesses.delete(child);
                    clearInterval(timer);
                    if (code === 0) {
                        console.log('[SUCCESS] ' + stepName + ' concluída.');
                        resolve();
                    } else {
                        reject(new Error(`Exit code ${code}:\n${outputStr}`));
                    }
                });

                child.on('error', (err) => {
                    activeProcesses.delete(child);
                    clearInterval(timer);
                    reject(err);
                });
            });
            // If it succeeds, exit the loop
            return;
        } catch (error) {
            const errStr = error.toString().toLowerCase();
            // Check for 429 Rate Limit
            if (errStr.includes('429') || errStr.includes('rate limit') || errStr.includes('quota') || errStr.includes('too many requests')) {
                if (attempts >= maxAttempts) {
                    console.error(`\n${c.yellow}⚠️ Erro de Rate Limit persistente na ${stepName}.${c.reset}`);
                    throw error;
                }
                const waitTime = baseDelayMs * Math.pow(2, attempts - 1);
                console.log(`\n${c.yellow}⚠️ API Rate Limit (429) detectado. Backoff de ${waitTime / 1000}s...${c.reset}`);
                await new Promise(r => setTimeout(r, waitTime));
            } else {
                console.error(`\n${c.yellow}⚠️ Erro na ${stepName}:${c.reset}`, error);
                throw error;
            }
        }
    }
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
                let repairPrompt = '';
                
                if (errorOutput.includes('ReactCurrentOwner')) {
                    console.log(`${c.yellow}[DETECÇÃO] Erro Crítico de Reconciler (ReactCurrentOwner) identificado.${c.reset}`);
                    repairPrompt = `⚠️ ERRO CRÍTICO: ReactCurrentOwner indefinido. Isso ocorre por conflito de SSR no R3F/React 19. 
                    AÇÕES OBRIGATÓRIAS:
                    1. Mova TODO o código de Three.js/R3F para um arquivo 'ThreeSceneClient.tsx' com 'use client'.
                    2. No 'ThreeScene.tsx', importe-o usando: 'const Scene = dynamic(() => import("./ThreeSceneClient"), { ssr: false });'
                    3. Certifique-se de que NENHUM Hook do React (useState, useEffect) ou do R3F (useFrame) seja chamado fora de um Client Component isolado.
                    ERRO:\n${errorOutput.substring(0, 1000)}`;
                } else {
                    repairPrompt = `⚠️ QUALITY GATE FALHOU. O 'next build' quebrou. Analise o log abaixo e CONSERTE O CÓDIGO (ex: se for erro de Context/Hook, adicione 'use client' no topo do arquivo; corrija imports; etc). NÃO adicione features, apenas faça o código compilar.\n\nERRO:\n${errorOutput.substring(0, 1500)}`;
                }
                
                await executeGeminiPhase(repairPrompt, 'Auto-Cura (Reparo de Build)', 'gemini-3.1-pro-preview');
            } else {
                console.log(`${c.yellow}⚠️ Auto-Healing esgotado. Forçando avanço.${c.reset}\n`);
            }
        }
    }
    return { passed, attempts };
}

(async () => {
    const startTime = Date.now();
    const metrics = {
        phase1Ms: 0,
        phase2BMs: 0,
        phase2C1Ms: 0,
        phase2C2Ms: 0,
        qualityGateMs: 0,
        qualityGateAttempts: 0,
        qualityGatePassed: false,
        phase3Ms: 0,
        packagingMs: 0,
        totalMs: 0
    };

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
        const t1 = Date.now();
        await executeGeminiPhase(prompts[0], 'Fase 1 (Contexto)', 'gemini-3.1-flash-lite');
        metrics.phase1Ms = Date.now() - t1;

        advancePhase(2);
        const t2b = Date.now();
        await executeGeminiPhase(prompts[1], 'Fase 2B (Public UI)', 'gemini-3-flash-preview');
        metrics.phase2BMs = Date.now() - t2b;

        advancePhase(3);
        const t2c1 = Date.now();
        await executeGeminiPhase(prompts[2], 'Fase 2C-1 (Core Dashboard & Shell)', 'gemini-3.1-pro-preview');
        metrics.phase2C1Ms = Date.now() - t2c1;

        // Emitimos a phase 3 novamente para indicar progresso visual dentro da UI de orquestração do Electron, sem pular etapas visuais
        advancePhase(3);
        const t2c2 = Date.now();
        await executeGeminiPhase(prompts[3], 'Fase 2C-2 (Secondary Pages)', 'gemini-3.1-pro-preview');
        metrics.phase2C2Ms = Date.now() - t2c2;

        const tQg = Date.now();
        const qgResult = await runQualityGate();
        metrics.qualityGateMs = Date.now() - tQg;
        metrics.qualityGateAttempts = qgResult.attempts;
        metrics.qualityGatePassed = qgResult.passed;

        advancePhase(4);
        const t3 = Date.now();
        await executeGeminiPhase(prompts[4], 'Fase 3 (Fotografias)', 'gemini-3.1-flash-lite');
        metrics.phase3Ms = Date.now() - t3;

        advancePhase(5);
        const tPkg = Date.now();
        packageTemplate(cat, theme);
        metrics.packagingMs = Date.now() - tPkg;

        const totalSeconds = Math.floor((Date.now() - startTime) / 1000);
        metrics.totalMs = Date.now() - startTime;
        const mins = Math.floor(totalSeconds / 60);
        const secs = totalSeconds % 60;

        process.stdout.write('\x07\x07\x07');
        console.log(`\n${c.green}${c.bold}✨ SUCESSO ABSOLUTO!${c.reset}`);
        console.log(`⏳ Tempo Total da Fábrica: ${c.bold}${mins > 0 ? `${mins}m ` : ''}${secs}s${c.reset}`);
        console.log(`📂 Template polido e testado na sua Galeria SOA!\n`);

        if (process.send) {
            process.send({ channel: 'forge-completed', payload: { code: 0, metrics } });
        }

    } catch (error) {
        console.error(`\n${c.yellow}⚠️ Ciclo interrompido.${c.reset}`, error);
        metrics.totalMs = Date.now() - startTime;
        if (process.send) {
            process.send({ channel: 'forge-completed', payload: { code: 1, error: error.message, metrics } });
        }
    }
})();