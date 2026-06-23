import { spawn, execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const forgeSeed = Math.random().toString(36).substring(2, 10).toUpperCase();

import { c } from './forge-engine/utils.mjs';
import { setupTelemetry, advancePhase, flushTelemetry } from './forge-engine/telemetry-wrapper.mjs';
import { sweepStrayItems, resetSandbox, packageTemplate } from './forge-engine/sandbox-manager.mjs';

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

setupTelemetry();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SCRIPTS_DIR = __dirname;
const ROOT_DIR = path.join(SCRIPTS_DIR, '..');
const TEMPLATES_DIR = path.join(ROOT_DIR, '.templates');
const LIB_PATH = path.join(TEMPLATES_DIR, 'templates-library');
const SANDBOX_DIR = path.join(TEMPLATES_DIR, 'forge', 'sandbox');

const THEMES = ['Duo Model', 'Dark Mode', 'Light Mode'];

sweepStrayItems(TEMPLATES_DIR);

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

const targetThemePath = path.join(LIB_PATH, cat, theme);
let forbiddenNames = "Nenhum";
if (fs.existsSync(targetThemePath)) {
    const existingTemplates = fs.readdirSync(targetThemePath).filter(f => fs.statSync(path.join(targetThemePath, f)).isDirectory());
    if (existingTemplates.length > 0) forbiddenNames = existingTemplates.join(', ');
}

const skillProductDiscovery = fs.readFileSync(path.join(process.cwd(), '.agent/skills/skill-product-discovery.md'), 'utf-8');
const themeMasterCommand = `O tema EXIGIDO e OBRIGATÓRIO para este projeto é: ${theme}. REGRA ESTRITA: Se o tema for 'Light Mode', você está EXPRESSAMENTE PROIBIDO de escrever classes 'dark:' do Tailwind e DEVE garantir um background claro. Ignore quaisquer cores hexadecimais escuras do 'design-dna.json' se elas conflitarem com a regra do 'Light Mode'.`;

const prompts = [
    `Leia e EXECUTE rigorosamente o que pede o @.templates/forge/1-iniciar.md. Categoria: [${cat}], Modo de Tema: [${theme}], Design Tier: [Tier ${designTier}]. [SEED: ${forgeSeed}]. Use esta semente para variar sutilmente a paleta de cores e a disposição dos componentes, garantindo um resultado único. Gere e salve o arquivo forge-context.md. OBRIGATÓRIO: Leia @.templates/forge/regras-ui.md e garanta que nenhuma cor hardcoded (magic strings) seja definida no DNA. LEIA TAMBÉM @.templates/forge/tiers/tier-${designTier}.md e a instrução de @.templates/forge/skills/skill-ui-tier-${designTier}.md para ancorar a complexidade do projeto. NOMES PROIBIDOS (Marcas já existentes nesta categoria e tema): [${forbiddenNames}]. OBRIGATÓRIO: Você DEVE inventar um nome de marca e projeto totalmente INÉDITO, original e estruturalmente DIFERENTE dos nomes listados.`,
    `${themeMasterCommand} Leia e EXECUTE as ordens de @.templates/forge/2b-public-ui.md. LEIA TAMBÉM @.templates/forge/tiers/tier-${designTier}.md e a instrução/conteúdo de @.templates/forge/skills/skill-ui-tier-${designTier}.md para manter a consistência da Persona. LEIA OBRIGATORIAMENTE AS REGRAS MESTRAS EM @.templates/forge/regras-ui.md (NENHUMA COR HARDCODED PERMITIDA). CONTEXTO DE NEGÓCIO RIGOROSO: O sistema é da categoria [${cat}]. A UI, componentes e mock datas DEVEM refletir especificamente esta categoria. Não crie um dashboard genérico. Importante: Ao finalizar, crie o arquivo forge/design-dna.md servindo de âncora de design. Garantia Visual: Use sempre um container base \`min-h-screen bg-background text-foreground\`. Implemente skeletons de carregamento para componentes complexos. Se um mock data falhar, a UI deve permanecer estruturalmente intacta. ${designTier >= 4 ? '⚠️ REGRA BUNKER: Para Tiers 4+, componentes Three.js DEVEM ser isolados via next/dynamic com ssr: false em wrappers ThreeScene.tsx.' : ''}`,
    `${themeMasterCommand} Leia e EXECUTE as ordens de @.templates/forge/2c-1-core-ui.md. LEIA TAMBÉM @.templates/forge/tiers/tier-${designTier}.md, o conteúdo de @.templates/forge/skills/skill-ui-tier-${designTier}.md e OBRIGATORIAMENTE o arquivo forge/design-dna.md gerado na fase anterior. LEIA OBRIGATORIAMENTE AS REGRAS MESTRAS EM @.templates/forge/regras-ui.md. CONTEXTO DE NEGÓCIO RIGOROSO: O sistema é da categoria [${cat}]. A UI, componentes e mock datas DEVEM refletir especificamente esta categoria. Não crie um dashboard genérico. Construa o App Shell (Sidebar/Header) e a Página 1 (Main Dashboard). Garantia Visual: Use containers \`min-h-screen bg-background text-foreground\` e variáveis CSS para cores. ${designTier >= 4 ? '⚠️ REGRA BUNKER: Proibido importar Three.js ou R3F diretamente em pages. Use componentes isolados.' : ''}`,
    `${themeMasterCommand} Leia e EXECUTE as ordens de @.templates/forge/2c-2-secondary-ui.md. LEIA TAMBÉM @.templates/forge/tiers/tier-${designTier}.md, o conteúdo de @.templates/forge/skills/skill-ui-tier-${designTier}.md e @.templates/forge/regras-ui.md. CONTEXTO DE NEGÓCIO RIGOROSO: O sistema é da categoria [${cat}]. A UI, componentes e mock datas DEVEM refletir especificamente esta categoria. Não crie um dashboard genérico. Com base no App Shell construído, construa as 4 páginas secundárias restantes definidas em forge-context.md. ${designTier >= 4 ? '⚠️ REGRA BUNKER: Proibido importar Three.js/R3F em pages.' : ''}`,
    `Você é o Diretor de Produto. Sua missão é criar a documentação mestre (PRD). Abaixo está a metodologia rigorosa que você DEVE seguir:\n\n---\n${skillProductDiscovery}\n---\n\nLeia o 'forge/forge-context.md' e o 'forge/design-dna.md' criados anteriormente. Usando ESTRITAMENTE o formato e os critérios da 'Skill de Product Discovery' acima, redija o arquivo e salve-o ESTRITAMENTE no caminho 'forge/sandbox/PRD.md'. Ele será o cérebro das próximas automações. Responda apenas 'PRD_CONCLUIDO' quando terminar.`,
    `Leia e EXECUTE as ordens de @.templates/forge/3-capturar.md.`
];

async function executeGeminiPhase(promptText, stepName, model = 'Gemini 3.5 Flash (Medium)') {
    let attempts = 0;
    const maxAttempts = 5;
    let baseDelayMs = 2000;
    const isWin = process.platform === 'win32';

    while (attempts < maxAttempts) {
        attempts++;
        if (attempts > 1) {
            console.log(`[INFO] Retentando ${stepName} (Tentativa ${attempts}/${maxAttempts})...`);
        } else {
            console.log(`[INFO] Iniciando ${stepName}...`);
        }

        try {
            const result = await new Promise((resolve, reject) => {
                let outputStr = '';
                const fs = require('fs');
                const path = require('path');
                const tempPromptPath = path.join(process.cwd(), '.temp-forge-prompt.md');
                fs.writeFileSync(tempPromptPath, promptText, 'utf-8');
                
                const pty = require('../apps/control-center/node_modules/node-pty');
                const shell = isWin ? 'powershell.exe' : 'bash';
                const args = isWin 
                    ? ['-NoProfile', '-Command', `agy --print "@.temp-forge-prompt.md"`]
                    : ['-c', `agy --print "@.temp-forge-prompt.md"`];
                console.log(`[DEBUG] Executing: ${shell} ${args.join(' ')}`);
                
                const ptyProcess = pty.spawn(shell, args, {
                    name: 'xterm-color',
                    cols: 120,
                    rows: 30,
                    cwd: TEMPLATES_DIR,
                    env: { ...process.env, FORCE_COLOR: '0' }
                });

                let seconds = 0;
                const timer = setInterval(() => { seconds++; }, 1000);

                ptyProcess.onData((data) => {
                    outputStr += data;
                    if (process.send) {
                        process.send({ channel: 'telemetry-raw', payload: { agentId: 'MAESTRO', data } });
                    } else {
                        process.stdout.write(data);
                    }
                });

                ptyProcess.onExit(({ exitCode }) => {
                    clearInterval(timer);
                    // Remove ALL ANSI escape codes and control chars (except newlines/tabs)
                    const cleanOutput = outputStr.replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, '').replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');
                    if (exitCode === 0) {
                        console.log('[SUCCESS] ' + stepName + ' concluída.');
                        resolve(cleanOutput);
                    } else {
                        reject(new Error(`Exit code ${exitCode}:\n${cleanOutput}`));
                    }
                });
            });
            return result;
        } catch (error) {
            const errStr = error.toString().toLowerCase();
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

async function executeInteractiveGeminiPhase(prompts, stepName, model = 'Gemini 3.5 Flash (Medium)') {
    console.log(`[INFO] Iniciando ${stepName} (Interactive Mode)...`);
    return new Promise((resolve, reject) => {
        let outputStr = '';
        const isWin = process.platform === 'win32';
        const pty = require('../apps/control-center/node_modules/node-pty');
        const shell = isWin ? 'powershell.exe' : 'bash';
        const args = isWin 
            ? ['-NoProfile', '-Command', `agy --dangerously-skip-permissions --model "${model}"`]
            : ['-c', `agy --dangerously-skip-permissions --model "${model}"`];
        
        const ptyProcess = pty.spawn(shell, args, {
            name: 'xterm-color',
            cols: 120,
            rows: 30,
            cwd: TEMPLATES_DIR,
            env: { ...process.env, FORCE_COLOR: '0' }
        });

        let currentPromptIndex = 0;
        let idleTimer = null;
        let buffer = '';

        ptyProcess.onData((data) => {
            outputStr += data;
            buffer += data;
            if (process.send) {
                process.send({ channel: 'telemetry-raw', payload: { agentId: 'MAESTRO', data } });
            } else {
                process.stdout.write(data);
            }

            if (data.includes('Do you trust the contents of this project?')) {
                ptyProcess.write('\r');
                buffer = '';
            }

            if (idleTimer) clearTimeout(idleTimer);
            idleTimer = setTimeout(() => {
                const cleanBuffer = buffer.replace(/\x1b\[[0-9;]*m/g, '');
                if (cleanBuffer.includes('? for shortcuts')) {
                    if (currentPromptIndex < prompts.length) {
                        ptyProcess.write(prompts[currentPromptIndex].replace(/"/g, '\\"').replace(/\n/g, ' ').replace(/\r/g, '') + '\r');
                        currentPromptIndex++;
                        buffer = '';
                    } else {
                        ptyProcess.write('/exit\r');
                        buffer = '';
                    }
                }
            }, 1000);
        });

        ptyProcess.onExit(({ exitCode }) => {
            if (idleTimer) clearTimeout(idleTimer);
            const cleanOutput = outputStr.replace(/\x1b\[[0-9;]*m/g, '');
            resolve(cleanOutput);
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
                
                await executeGeminiPhase(repairPrompt, 'Auto-Cura (Reparo de Build)', 'Gemini 3.1 Pro (High)');
            } else {
                console.log(`${c.yellow}⚠️ Auto-Healing esgotado. Forçando avanço.${c.reset}\n`);
            }
        }
    }
    return { passed, attempts };
}

(async () => {
    const startTime = Date.now();
    const forgePhase = process.env.FORGE_PHASE || 'brainstorm'; // Fases: 'brainstorm', 'prompt_build', 'generate_code'

    console.clear();
    console.log(`${c.cyan}${c.bold}=============================================================${c.reset}`);   
    console.log(`${c.cyan}${c.bold}🚀 AUTO-FORGE v8.0 | INTERACTIVE UI/UX PRO MAX WORKFLOW${c.reset}`); 
    console.log(`${c.cyan}${c.bold}=============================================================${c.reset}\n`); 

    try {
        if (forgePhase === 'brainstorm') {
            const userInput = process.env.FORGE_USER_INPUT || "Gerar um dashboard moderno";
            
            console.log(`[INFO] Iniciando Brainstorm Bot Interativo para a ideia: "${userInput}"...`);
            
            const fs = require('fs');
            const path = require('path');
            const ruleFile = fs.readFileSync(path.join(TEMPLATES_DIR, 'forge', 'BRAINSTORM_BOT.md'), 'utf-8');
            const promptText = `Aqui estão as regras que você deve seguir (lidas do arquivo BRAINSTORM_BOT.md):\n\n${ruleFile}\n\nA ideia inicial do usuário é: "${userInput}". Retorne EXCLUSIVAMENTE o JSON estruturado e não diga mais nada.`;
            const output = await executeGeminiPhase(promptText, 'UX Brainstorm Phase', 'Gemini 3.5 Flash (Medium)');
            
            let jsonString = output || '{}';
            jsonString = jsonString.replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, '').replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');
            const jsonRegex = /\`\`\`json\s*([\s\S]*?)\s*\`\`\`/g;
            let match = jsonRegex.exec(jsonString);
            
            if (match && match[1]) {
                jsonString = match[1];
            } else {
                const fallbackRegex = /(\{[\s\S]*\})/g;
                let fallbackMatch = fallbackRegex.exec(jsonString);
                if (fallbackMatch && fallbackMatch[1]) {
                    jsonString = fallbackMatch[1];
                } else {
                    const fallbackMatch = output?.match(/\{[\s\S]*\}/);
                    if (fallbackMatch) jsonString = fallbackMatch[0];
                }
            }
            
            if (process.send) {
                process.send({ channel: 'forge-brainstorm-completed', payload: { code: 0, json: jsonString } });
            }
        } 
        else if (forgePhase === 'prompt_build') {
            const userAnswers = process.env.FORGE_USER_ANSWERS || "Nenhuma opção enviada";
            const fs = require('fs');
            const path = require('path');
            const ruleFile = fs.readFileSync(path.join(TEMPLATES_DIR, 'forge', 'PROMPT_BUILDER.md'), 'utf-8');
            const promptText = `Aqui estão as instruções que você deve seguir:\n\n${ruleFile}\n\nAs escolhas do usuário foram: ${userAnswers}. Retorne EXCLUSIVAMENTE o conteúdo Markdown do PROMPT final. NÃO crie o arquivo, apenas cuspa o texto.`;
            
            console.log(`[INFO] Construindo o PROMPT.md a partir das respostas do usuário...`);
            const finalPrompt = await executeGeminiPhase(promptText, 'Prompt Builder Phase', 'Gemini 3.1 Pro (High)');
            
            const forgeDir = path.join(process.cwd(), 'forge');
            if (!fs.existsSync(forgeDir)) fs.mkdirSync(forgeDir, { recursive: true });
            // Remove possible code block wrapping the markdown
            let cleanPrompt = finalPrompt || '';
            const mdRegex = /\`\`\`markdown\s*([\s\S]*?)\s*\`\`\`/g;
            let mdMatch = mdRegex.exec(cleanPrompt);
            if (mdMatch && mdMatch[1]) cleanPrompt = mdMatch[1];
            fs.writeFileSync(path.join(forgeDir, 'PROMPT.md'), cleanPrompt, 'utf-8');
            
            if (process.send) {
                process.send({ channel: 'forge-prompt-ready', payload: { code: 0 } });
            }
        } 
        else if (forgePhase === 'generate_code') {
            console.log(`[INFO] Iniciando Geração de Código no Sandbox (UI/UX Pro Max)...`);
            resetSandbox(SANDBOX_DIR);
            
            const fs = require('fs');
            const path = require('path');
            const ruleFile = fs.readFileSync(path.join(process.cwd(), 'forge', 'PROMPT.md'), 'utf-8');
            const promptText = `Aqui está o PROMPT final do projeto gerado:\n\n${ruleFile}\n\nConstrua TODO o projeto detalhado nele EXCLUSIVAMENTE na pasta forge/sandbox/. Obedeça às diretrizes do Agente UI/UX Pro Max.`;
            
            await executeGeminiPhase(promptText, 'Code Generation Phase', 'Gemini 3.1 Pro (High)');
            
            console.log(`[INFO] Validando integridade (Quality Gate)...`);
            const qgResult = await runQualityGate();
            
            if (qgResult.passed) {
                console.log(`[INFO] Tirando fotos do projeto (Capture Phase)...`);
                const fs = require('fs');
                const path = require('path');
                const ruleFile = fs.readFileSync(path.join(TEMPLATES_DIR, 'forge', '3-capturar.md'), 'utf-8');
                await executeGeminiPhase(`Aqui estão as ordens de captura:\n\n${ruleFile}\n\nLeia e EXECUTE rigorosamente.`, 'Screenshot Capture Phase', 'Gemini 3.5 Flash (Medium)');
                
                console.log(`[INFO] Empacotando Template para a Galeria...`);
                
                let cat = 'AI Generated';
                let theme = 'Dynamic';
                try {
                    const answers = JSON.parse(process.env.FORGE_USER_ANSWERS || '{}');
                    for (const [k, v] of Object.entries(answers)) {
                        const key = k.toLowerCase();
                        if (key.includes('categor')) cat = v.replace('(Recomendado) ', '');
                        if (key.includes('theme') || key.includes('estilo') || key.includes('visual')) theme = v.replace('(Recomendado) ', '');
                    }
                } catch(e) {}

                cat = cat.replace(/[^a-zA-Z0-9 -]/g, '').trim() || 'AI Generated';
                theme = theme.replace(/[^a-zA-Z0-9 -]/g, '').trim() || 'Dynamic';

                packageTemplate(TEMPLATES_DIR, LIB_PATH, SANDBOX_DIR, cat, theme, 1);
            }
            
            const totalSeconds = Math.floor((Date.now() - startTime) / 1000);
            const mins = Math.floor(totalSeconds / 60);
            const secs = totalSeconds % 60;

            console.log(`\n${c.green}${c.bold}✨ SUCESSO ABSOLUTO!${c.reset}`);
            console.log(`⏳ Tempo Total: ${c.bold}${mins > 0 ? `${mins}m ` : ''}${secs}s${c.reset}`);
            
            flushTelemetry(true);
            if (process.send) {
                process.send({ channel: 'forge-completed', payload: { code: 0, qualityGatePassed: qgResult.passed } });
            }
        }

    } catch (error) {
        console.error(`\n${c.yellow}⚠️ Ciclo interrompido na fase [${forgePhase}].${c.reset}`, error);
        flushTelemetry(true);
        if (process.send) {
            process.send({ channel: 'forge-error', payload: { code: 1, error: error.message, phase: forgePhase } });
        }
        process.exit(1);
    }
})();