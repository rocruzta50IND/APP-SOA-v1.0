import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '../');

const notifyEvent = (payload) => {
    if (process.send) process.send(payload);
};

let isPausedRequested = false;
let resolvePause = null;

process.on('message', async (msg) => {
    if (msg === 'pause-request') {
        isPausedRequested = true;
    } else if (msg === 'resume-auto-request') {
        isPausedRequested = false;
        if (resolvePause) {
            resolvePause();
            resolvePause = null;
        }
    } else if (typeof msg === 'object' && msg.type === 'manual-mission-command') {
        const missionPath = path.join(projectRoot, '.agent', 'mission.md');
        await fs.promises.writeFile(missionPath, msg.payload, 'utf-8');
        if (isPausedRequested && resolvePause) {
            isPausedRequested = false;
            resolvePause();
            resolvePause = null;
        }
    }
});

async function runGeminiTask(task) {
    return new Promise((resolve) => {
        console.log(`\n\x1b[35m[ENGINE]\x1b[0m Executando: ${task}\n`);
        
        const gemini = spawn('gemini', ['--yolo', task], {
            cwd: projectRoot,
            shell: true,
            stdio: 'inherit'
        });

        gemini.on('close', (code) => {
            resolve(code);
        });
    });
}

async function main() {
    console.log("\x1b[32m[FACTORY MVP]\x1b[0m Iniciando Motor de Produção Automatizada...\n");
    notifyEvent({ type: 'log', message: 'Iniciando Motor de Produção Automatizada...' });

    console.log("\x1b[32m[ITERATION_START]\x1b[0m Entrando no loop de produção contínua (Fase 2)...");
    notifyEvent({ type: 'log', message: '[ITERATION_START] Entrando no loop de produção contínua...' });
    
    while (true) {
        if (isPausedRequested) {
            console.log("\x1b[33m[AGENT]\x1b[0m Execução pausada. Aguardando retomada...");
            notifyEvent({ type: 'pause', message: 'Automação pausada. Aguardando retomada.' });
            await new Promise(resolve => { resolvePause = resolve; });
        }

        const missionPath = path.join(projectRoot, '.agent', 'mission.md');
        const instructionsPath = path.join(projectRoot, '.agent', 'instructions.md');

        if (fs.existsSync(missionPath) && fs.existsSync(instructionsPath)) {
            const mission = fs.readFileSync(missionPath, 'utf-8');
            const instructions = fs.readFileSync(instructionsPath, 'utf-8');
            
            console.log("\x1b[33m[AGENT]\x1b[0m Nova missão detectada. Processando...");
            
            // Simular o comando /clear e a execução
            console.log("\x1b[90m[SYSTEM] /clear\x1b[0m");
            
            await runGeminiTask(`Perform task based on MISSION: ${mission} and INSTRUCTIONS: ${instructions}`);
            
            // Deletar os arquivos após execução para não entrar em loop
            if (fs.existsSync(missionPath)) fs.unlinkSync(missionPath);
            if (fs.existsSync(instructionsPath)) fs.unlinkSync(instructionsPath);
        } else {
            console.log("\x1b[90m[SYSTEM]\x1b[0m Aguardando .agent/mission.md e .agent/instructions.md...");
            notifyEvent({ type: 'status', message: 'awaiting-manual-input' });
        }

        // Aguarda 10 segundos antes da próxima iteração ou verificação
        await new Promise(r => setTimeout(r, 10000));
    }
}

main().catch(err => {
    console.error("\x1b[31m[CRITICAL ERROR]\x1b[0m", err);
    process.exit(1);
});
