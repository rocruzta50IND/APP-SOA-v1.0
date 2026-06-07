import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '../');

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

    // PHASE_DISCOVERY
    console.log("\x1b[36m[PHASE_DISCOVERY]\x1b[0m Analisando ambiente e requisitos...");
    await runGeminiTask("Analyze current workspace and identify missing components for the MVP.");

    // PHASE_ARCH
    console.log("\x1b[36m[PHASE_ARCH]\x1b[0m Definindo arquitetura técnica...");
    await runGeminiTask("Define the technical architecture for the upcoming implementation.");

    // PHASE_ENV
    console.log("\x1b[36m[PHASE_ENV]\x1b[0m Preparando ambiente de execução...");
    await runGeminiTask("Setup the environment, install necessary dependencies and create scaffolding.");

    // ITERATION_START
    console.log("\x1b[32m[ITERATION_START]\x1b[0m Entrando no loop de produção contínua...");
    
    while (true) {
        const missionPath = path.join(projectRoot, '.agent', 'mission.md');
        const instructionsPath = path.join(projectRoot, '.agent', 'instructions.md');

        if (fs.existsSync(missionPath) && fs.existsSync(instructionsPath)) {
            const mission = fs.readFileSync(missionPath, 'utf-8');
            const instructions = fs.readFileSync(instructionsPath, 'utf-8');
            
            console.log("\x1b[33m[AGENT]\x1b[0m Nova missão detectada. Processando...");
            
            // Simular o comando /clear e a execução
            console.log("\x1b[90m[SYSTEM] /clear\x1b[0m");
            
            await runGeminiTask(`Perform task based on MISSION: ${mission} and INSTRUCTIONS: ${instructions}`);
        } else {
            console.log("\x1b[90m[SYSTEM]\x1b[0m Aguardando .agent/mission.md e .agent/instructions.md...");
        }

        // Aguarda 10 segundos antes da próxima iteração ou verificação
        await new Promise(r => setTimeout(r, 10000));
    }
}

main().catch(err => {
    console.error("\x1b[31m[CRITICAL ERROR]\x1b[0m", err);
    process.exit(1);
});
