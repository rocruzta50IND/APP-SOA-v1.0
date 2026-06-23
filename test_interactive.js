const pty = require('./apps/control-center/node_modules/node-pty');
const ptyProcess = pty.spawn('powershell.exe', ['-NoProfile', '-Command', 'agy --dangerously-skip-permissions'], {
    name: 'xterm-color', cols: 120, rows: 30, cwd: process.cwd(), env: { ...process.env, FORCE_COLOR: '0' }
});
let buf = '';
let sent = false;
let exited = false;
ptyProcess.onData(data => {
    buf += data;
    process.stdout.write(data);
    const clean = buf.replace(/\x1b\[[0-9;]*m/g, '');
    if (!sent && clean.includes('? for shortcuts')) {
        console.log('\n[TEST] DETECTED READY! Sending oi...\n');
        ptyProcess.write('oi\r');
        sent = true;
        buf = '';
    } else if (sent && !exited && clean.includes('? for shortcuts')) {
        console.log('\n[TEST] DETECTED READY AGAIN! Exiting...\n');
        ptyProcess.write('/exit\r');
        exited = true;
        setTimeout(() => process.exit(0), 2000);
    }
});
