const originalStdoutWrite = process.stdout.write.bind(process.stdout);
const originalStderrWrite = process.stderr.write.bind(process.stderr);

let telemetryBuffer = { FORJA: '', AUDITOR: '' };
let telemetryTimeout = null;

export function flushTelemetry() {
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

export function setupTelemetry() {
    process.stdout.write = (chunk, encoding, callback) => {
        telemetryBuffer.FORJA += chunk.toString();
        if (!telemetryTimeout) telemetryTimeout = setTimeout(() => flushTelemetry(false), 50);
        return originalStdoutWrite(chunk, encoding, callback);
    };

    process.stderr.write = (chunk, encoding, callback) => {
        telemetryBuffer.AUDITOR += chunk.toString();
        if (!telemetryTimeout) telemetryTimeout = setTimeout(() => flushTelemetry(false), 50);
        return originalStderrWrite(chunk, encoding, callback);
    };

    process.on('uncaughtException', (err) => {
        telemetryBuffer.AUDITOR += `\n[FATAL] Uncaught Exception: ${err.stack || err.message}\n`;
        flushTelemetry(true);
        process.exit(1);
    });

    process.on('unhandledRejection', (reason) => {
        telemetryBuffer.AUDITOR += `\n[FATAL] Unhandled Rejection: ${reason}\n`;
        flushTelemetry(true);
        process.exit(1);
    });
}

export function advancePhase(phaseNumber) {
    if (process.send) {
        process.send({ channel: 'forge-status', payload: { phase: phaseNumber } });
    }
}
