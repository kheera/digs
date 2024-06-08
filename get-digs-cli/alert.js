const { exec } = require('child_process');

exec('powershell.exe -ExecutionPolicy Bypass -File ./alert.ps1', (err, stdout, stderr) => {
  if (err) {
    console.error(`exec error: ${err}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
  console.error(`stderr: ${stderr}`);
});

