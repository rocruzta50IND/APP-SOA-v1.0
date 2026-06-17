const { spawn } = require('child_process');
const fs = require('fs');

fs.writeFileSync('test_cmd.cmd', 'echo ARG1: %1\necho ARG2: %2\necho ARG3: %3\necho ARG4: %4\n');

const child = spawn('test_cmd.cmd', ['--model', '"Gemini 3.5"'], { shell: true });
child.stdout.on('data', d => console.log(d.toString()));
