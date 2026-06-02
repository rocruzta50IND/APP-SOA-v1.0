import { fork } from 'child_process';
import path from 'path';

const scriptPath = path.resolve('.scripts/auto-forge.mjs');
const child = fork(scriptPath, [], {
  stdio: ['pipe', 'pipe', 'pipe', 'ipc'],
  env: { ...process.env, FORCE_COLOR: '1' }
});

child.on('message', (msg) => {
  console.log('[IPC MESSAGE RECEIVED]', JSON.stringify(msg, null, 2));
});

child.stdout.on('data', (data) => {
  // console.log('[STDOUT]', data.toString());
});

child.stderr.on('data', (data) => {
  // console.log('[STDERR]', data.toString());
});

child.on('exit', (code) => {
  console.log('[PROCESS EXIT]', code);
  process.exit(code);
});

// Auto-kill after 30 seconds to avoid long hangs in this test environment
setTimeout(() => {
  console.log('[TIMEOUT] Killing test...');
  child.kill();
  process.exit(0);
}, 30000);
