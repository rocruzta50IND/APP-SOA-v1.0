import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.join(__dirname, '..');
const TEMPLATES_DIR = path.join(ROOT_DIR, '.templates');

const pty = require('../apps/control-center/node_modules/node-pty');

let currentState = 'START';
let cliProcess = null;
let outputBuffer = '';
let promptGenerated = '';

function sleep(ms) {
    return new Promise(r => setTimeout(r, ms));
}

function notifyFrontend(phase, message) {
    if (process.send) {
        process.send({ channel: 'forge-status', payload: { phase } });
        process.send({ channel: 'forge-ui-log', payload: { message } });
    } else {
        console.log(`[STATUS - FASE ${phase}] ${message}`);
    }
}

process.on('message', async (msg) => {
    if (msg.channel === 'forge.continue') {
        const { phase, answers } = msg.payload;
        if (phase === 'prompt_build' && currentState === 'WAITING_USER_ANSWERS') {
            notifyFrontend(2, "Respostas recebidas. Enviando PROMPT_BUILDER...");
            currentState = 'SENDING_PROMPT_BUILDER';
            
            const forgeDir = path.join(TEMPLATES_DIR, 'forge');
            const promptFile = path.join(forgeDir, 'PROMPT.md');
            if (fs.existsSync(promptFile)) fs.rmSync(promptFile);
            
            cliProcess.write(`@.templates/forge/PROMPT_BUILDER.md As escolhas do usuário foram: ${typeof answers === 'string' ? answers : JSON.stringify(answers)}. Retorne EXCLUSIVAMENTE o conteúdo Markdown do PROMPT final. \r`);
            currentState = 'WAITING_PROMPT_GERADO';
            outputBuffer = '';
        } else if (phase === 'generate_code' && currentState === 'WAITING_FINAL_START') {
            startProcess2();
        }
    }
});

async function startOrchestrator(userInput) {
    notifyFrontend(1, "Aguardando CLI (Processo 1)...");
    
    const shell = process.platform === 'win32' ? 'powershell.exe' : 'bash';
    const args = process.platform === 'win32' 
        ? ['-NoProfile', '-Command', `agy --dangerously-skip-permissions`]
        : ['-c', `agy --dangerously-skip-permissions`];

    cliProcess = pty.spawn(shell, args, {
        name: 'xterm-color',
        cols: 120,
        rows: 30,
        cwd: ROOT_DIR,
        env: { ...process.env, FORCE_COLOR: '0' }
    });



    cliProcess.onData(async (data) => {
        outputBuffer += data;
        process.stdout.write(data); 

        try {
            const debugFile = path.join(ROOT_DIR, 'debug_buffer.txt');
            fs.writeFileSync(debugFile, outputBuffer, 'utf-8');
        } catch (e) {}

        const cleanBuffer = outputBuffer.replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, '').replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');

        if (currentState === 'START' && cleanBuffer.includes('? for shortcuts')) {
            currentState = 'SENDING_BRAINSTORM';
            notifyFrontend(1, "Enviando templates de Brainstorm...");
            
            // Delete old file to prevent reading stale data
            const brainstormFile = path.join(TEMPLATES_DIR, 'forge', 'BRAINSTORM.json');
            if (fs.existsSync(brainstormFile)) fs.rmSync(brainstormFile);
            
            cliProcess.write(`@.templates/forge/BRAINSTORM_BOT.md A ideia inicial do usuário é: "${userInput}". \r`);
            currentState = 'WAITING_BRAINSTORM_RESPONSE';
            outputBuffer = '';
        } 
        else if (currentState === 'WAITING_BRAINSTORM_RESPONSE' && cleanBuffer.includes('[FIM_BRAINSTORM]')) {
            notifyFrontend(2, "O CLI terminou a execução (Prompt detectado). Lendo arquivo JSON gerado...");
            
            let jsonString = '{}';
            let success = false;
            try {
                let rawContent = '';
                const brainstormFile = path.join(TEMPLATES_DIR, 'forge', 'BRAINSTORM.json');
                if (fs.existsSync(brainstormFile)) {
                    rawContent = fs.readFileSync(brainstormFile, 'utf8');
                    notifyFrontend(2, "Arquivo BRAINSTORM.json lido do disco com sucesso.");
                } else {
                    notifyFrontend(2, "Aviso: Arquivo BRAINSTORM.json não encontrado. Extraindo do buffer (stdout)...");
                    rawContent = cleanBuffer;
                }
                
                const extractRegex = /```(?:json)?\s*([\s\S]*?)\s*```/;
                const match = extractRegex.exec(rawContent);
                if (match && match[1]) {
                    jsonString = match[1];
                } else {
                    const fallbackMatch = rawContent.match(/\{[\s\S]*\}/);
                    if (fallbackMatch) jsonString = fallbackMatch[0];
                    else jsonString = rawContent;
                }
                success = true;
            } catch (e) {
                notifyFrontend(2, "Erro ao processar JSON de Brainstorm: " + e.message);
            }
            
            if (process.send) {
                process.send({ channel: 'forge-brainstorm-completed', payload: { code: success ? 0 : 1, json: jsonString } });
            }
            if (success) {
                currentState = 'WAITING_USER_ANSWERS';
            } else {
                currentState = 'IDLE'; // NEVER use 'START' here to prevent infinite loop
            }
            outputBuffer = '';
        }
        else if (currentState === 'WAITING_PROMPT_GERADO' && cleanBuffer.includes('[PROMPT_GERADO]')) {
            notifyFrontend(2, "O CLI terminou a execução. Verificando PROMPT.md...");
            
            const forgeDir = path.join(TEMPLATES_DIR, 'forge');
            if (!fs.existsSync(forgeDir)) fs.mkdirSync(forgeDir, { recursive: true });
            
            const promptFile = path.join(forgeDir, 'PROMPT.md');
            let success2 = false;
            if (fs.existsSync(promptFile)) {
                success2 = true;
                notifyFrontend(2, "Arquivo PROMPT.md verificado no disco.");
            } else {
                notifyFrontend(2, "Aviso: Arquivo PROMPT.md não encontrado. Extraindo do buffer (stdout)...");
                
                const extractRegex = /```(?:markdown)?\s*([\s\S]*?)\s*```/;
                const match = extractRegex.exec(cleanBuffer);
                let promptGenerated = match ? match[1] : cleanBuffer.replace(/[\s\S]*?As escolhas do usuário foram:/, '');
                
                fs.writeFileSync(promptFile, (promptGenerated || '').trim(), 'utf-8');
                success2 = true;
            }
            
            if (process.send) {
                process.send({ channel: 'forge-prompt-ready', payload: { code: success2 ? 0 : 1 } });
            }
            
            if (success2) {
                notifyFrontend(3, "Reiniciando CLI (Matando Processo 1)... Aguardando Início da Fase 3.");
                currentState = 'WAITING_FINAL_START';
                cliProcess.kill();
            } else {
                currentState = 'IDLE'; // Stop infinite loops
            }
        }
    });
}

function startProcess2() {
    notifyFrontend(3, "Iniciando Processo 2 e limpando sandbox antigo...");
    
    // Wipe sandbox before starting
    const sandboxDir = path.join(TEMPLATES_DIR, 'forge', 'sandbox');
    if (fs.existsSync(sandboxDir)) {
        fs.rmSync(sandboxDir, { recursive: true, force: true });
    }
    fs.mkdirSync(sandboxDir, { recursive: true });

    const shell = process.platform === 'win32' ? 'powershell.exe' : 'bash';
    const args = process.platform === 'win32' 
        ? ['-NoProfile', '-Command', `agy --dangerously-skip-permissions`]
        : ['-c', `agy --dangerously-skip-permissions`];

    const cliProcess2 = pty.spawn(shell, args, {
        name: 'xterm-color',
        cols: 120,
        rows: 30,
        cwd: TEMPLATES_DIR, // Restringir o CLI a olhar APENAS para a pasta .templates
        env: { ...process.env, FORCE_COLOR: '0' }
    });

    let p2State = 'START';
    let p2Buffer = '';

    cliProcess2.onData(async (data) => {
        p2Buffer += data;
        process.stdout.write(data);

        if (p2State === 'START' && p2Buffer.includes('? for shortcuts')) {
            p2State = 'SENDING_PROMPT';
            notifyFrontend(4, "Processo 2 Pronto. Enviando conteúdo do PROMPT.md gerado...");
            
            cliProcess2.write(`@forge/PROMPT.md \r`);
            p2State = 'WAITING_FINAL';
        }
    });
    
    cliProcess2.onExit(({ exitCode }) => {
        if (process.send) {
            process.send({ channel: 'forge-completed', payload: { code: exitCode } });
        }
        process.exit(exitCode);
    });
}

const input = process.env.FORGE_USER_INPUT || process.argv[2] || "Dashboard Administrativo";
startOrchestrator(input);
