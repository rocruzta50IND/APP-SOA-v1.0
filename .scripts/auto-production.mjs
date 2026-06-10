import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import net from 'net';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '../');

const notifyEvent = (payload) => {
    if (process.send) process.send(payload);
};

let isPausedRequested = false;
let resolvePause = null;

async function waitForIntervention() {
    return new Promise(resolve => {
        resolvePause = resolve;
    });
}

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

const waitForResume = () => new Promise(resolve => { 
    const handler = (msg) => { 
        if (msg === 'resume') { 
            process.off('message', handler); 
            resolve(); 
        } 
    }; 
    process.on('message', handler); 
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

    // PHASE_DISCOVERY
    console.log("\x1b[36m[PHASE_DISCOVERY]\x1b[0m Analisando ambiente e requisitos...");
    notifyEvent({ type: 'log', message: '[PHASE_DISCOVERY] Analisando ambiente e requisitos...' });
    await runGeminiTask("Analyze current workspace and identify missing components for the MVP.");

    // PHASE_ARCH
    console.log("\x1b[36m[PHASE_ARCH]\x1b[0m Definindo arquitetura técnica...");
    notifyEvent({ type: 'log', message: '[PHASE_ARCH] Definindo arquitetura técnica...' });
    await runGeminiTask("Define the technical architecture for the upcoming implementation.");

    // PHASE_ENV
    console.log("\x1b[36m[PHASE_ENV]\x1b[0m Preparando ambiente de execução...");
    notifyEvent({ type: 'log', message: '[PHASE_ENV] Preparando ambiente de execução...' });

    const selectedTemplatePath = path.join(projectRoot, '.agent', 'selected-template.json');
    const sandboxPath = path.join(projectRoot, 'environment-sandbox');

    if (fs.existsSync(selectedTemplatePath)) {
        const tplData = JSON.parse(fs.readFileSync(selectedTemplatePath, 'utf-8'));
        const sourcePath = path.join(projectRoot, tplData.templatePath);

        // Dispara evento de IPC com os dados do template
        let mainImage = '';
        const previewPath = path.join(sourcePath, 'preview');
        if (fs.existsSync(previewPath)) {
            const files = fs.readdirSync(previewPath);
            mainImage = files.find(f => f.endsWith('.webp') || f.endsWith('.png') || f.endsWith('.jpg')) || '';
        }

        notifyEvent({ 
            type: 'setup', 
            payload: { 
                template: { 
                    name: tplData.selectedTemplate, 
                    category: tplData.category, 
                    theme: tplData.subcategory, 
                    images: mainImage ? [mainImage] : [], 
                    path: tplData.templatePath 
                } 
            } 
        });

        // Limpeza e Cópia (Deep Clone)
        console.log("\x1b[36m[PHASE_ENV]\x1b[0m Clonando template de", sourcePath, "para", sandboxPath);
        notifyEvent({ type: 'log', message: '[PHASE_ENV] Clonando template para a sandbox...' });

        // Remove src, public e preview antigos para evitar sujeira
        const dirsToClean = ['src', 'public', 'preview'];
        for (const dir of dirsToClean) {
            const p = path.join(sandboxPath, dir);
            if (fs.existsSync(p)) fs.rmSync(p, { recursive: true, force: true });
        }
        
        fs.cpSync(sourcePath, sandboxPath, { recursive: true, force: true });

        // NPM Install
        console.log("\x1b[36m[PHASE_ENV]\x1b[0m Instalando dependências...");
        notifyEvent({ type: 'log', message: '[PHASE_ENV] Executando npm install...' });

        await new Promise((resolve, reject) => {
            const npmInstall = spawn('npm', ['install'], {
                cwd: sandboxPath,
                shell: true
            });

            npmInstall.stdout.on('data', (data) => notifyEvent({ type: 'log', message: data.toString().trim() }));
            npmInstall.stderr.on('data', (data) => notifyEvent({ type: 'log', message: `[NPM] ${data.toString().trim()}` }));

            npmInstall.on('close', (code) => {
                if (code === 0) resolve();
                else reject(new Error(`npm install falhou com código ${code}`));
            });
        });
    } else {
        console.log("\x1b[31m[PHASE_ENV]\x1b[0m selected-template.json não encontrado.");
        notifyEvent({ type: 'log', message: '[ERRO] selected-template.json não encontrado.' });
    }

    // Pausa após ambiente configurado
    notifyEvent({ type: 'pause', message: 'Dependências instaladas com sucesso. Aguardando confirmação para iniciar o servidor.' });
    await waitForResume();
    
    // Inicia o servidor Next.js na sandbox
    console.log("\x1b[36m[SERVER]\x1b[0m Iniciando npm run dev em environment-sandbox...");
    notifyEvent({ type: 'log', message: '[SERVER] Iniciando npm run dev...' });

    const devServer = spawn('npm', ['run', 'dev'], {
        cwd: sandboxPath,
        shell: true,
        env: { ...process.env, PORT: '3001' }
    });

    let isCheckingPort = false;
    let isServerReady = false;

    const checkServerReady = (attempt = 1) => {
        if (isServerReady) return;
        if (attempt > 20) {
            notifyEvent({ type: 'log', message: '[ERRO] Falha ao conectar ao servidor Next.js após várias tentativas.' });
            isCheckingPort = false;
            return;
        }

        const socket = net.createConnection({ port: 3001, host: '127.0.0.1' });

        socket.on('connect', () => {
            socket.destroy();
            isServerReady = true;
            isCheckingPort = false;
            notifyEvent({ type: 'ready' });
        });

        socket.on('error', () => {
            setTimeout(() => {
                checkServerReady(attempt + 1);
            }, 500);
        });
    };

    devServer.stdout.on('data', (data) => {
        const output = data.toString();
        // Repassa para a telemetria
        notifyEvent({ type: 'log', message: output.trim() });
        // Detecta quando está pronto
        if (/Ready in|started server on .*(3000|3001)|ready started server on/i.test(output)) {
            if (!isCheckingPort && !isServerReady) {
                isCheckingPort = true;
                checkServerReady();
            }
        }
    });

    devServer.stderr.on('data', (data) => {
        const output = data.toString();
        notifyEvent({ type: 'log', message: `[ERRO SERVIDOR]: ${output.trim()}` });
    });

    // ITERATION_START
    console.log("\x1b[32m[ITERATION_START]\x1b[0m Entrando no loop de produção contínua...");
    notifyEvent({ type: 'log', message: '[ITERATION_START] Entrando no loop de produção contínua...' });
    
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
            
            // Deletar os arquivos após execução para não entrar em loop
            fs.unlinkSync(missionPath);
            fs.unlinkSync(instructionsPath);
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
