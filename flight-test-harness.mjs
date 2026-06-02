import { fork } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const scriptPath = path.resolve(__dirname, '.scripts/auto-forge.mjs');

console.log('🚀 Iniciando Flight Test Harness...');

const child = fork(scriptPath, [], {
    stdio: ['pipe', 'pipe', 'pipe', 'ipc'],
    env: {
        ...process.env,
        FORCE_COLOR: '1',
        NODE_ENV: 'test'
    }
});

let routingOk = false;
let qualityGateOk = false;
let packagingOk = false;
let phasesCaptured = [];
let agentIdsCaptured = new Set();

child.on('message', (msg) => {
    if (msg.channel === 'telemetry-raw') {
        if (msg.payload && msg.payload.agentId) {
            agentIdsCaptured.add(msg.payload.agentId);
            if (msg.payload.agentId === 'AUDITOR') {
                console.log('\n[AUDITOR LOG]:\n', msg.payload.data);
            }
        }
    }
    if (msg.channel === 'forge-status') {
        if (msg.payload && typeof msg.payload.phase === 'number') {
            phasesCaptured.push(msg.payload.phase);
        }
    }
});

child.stdout.on('data', (data) => {
    const output = data.toString();
    process.stdout.write(output); // Pipe to main console
    if (output.includes('Quality Gate aprovado')) {
        qualityGateOk = true;
    }
    if (output.includes('SUCESSO ABSOLUTO')) {
        packagingOk = true;
    }
});

child.stderr.on('data', (data) => {
    process.stderr.write(data.toString()); // Pipe to main console
});

child.on('exit', (code) => {
    console.log(`\n🏁 Processo finalizado com código: ${code}`);
    
    // Verificações
    const hasForja = agentIdsCaptured.has('FORJA');
    const hasAuditor = agentIdsCaptured.has('AUDITOR') || agentIdsCaptured.has('FORJA'); // Auditor só aparece se houver erro ou stream de erro
    routingOk = hasForja && phasesCaptured.length > 0;

    console.log('\n--- RESULTADOS DO VOO ---');
    console.log(`Roteamento IPC: ${routingOk ? 'PASSOU' : 'FALHOU'} (Agents: ${Array.from(agentIdsCaptured).join(', ')}, Phases: ${phasesCaptured.join('->')})`);
    console.log(`Quality Gate: ${qualityGateOk ? 'PASSOU' : 'FALHOU'}`);
    console.log(`Empacotamento: ${packagingOk ? 'PASSOU' : 'FALHOU'}`);
    
    if (code === 0 && routingOk && qualityGateOk && packagingOk) {
        process.exit(0);
    } else {
        process.exit(1);
    }
});

// Timeout de segurança: 15 minutos
setTimeout(() => {
    console.error('TIMEOUT: O teste demorou demais.');
    child.kill();
    process.exit(1);
}, 900000);
