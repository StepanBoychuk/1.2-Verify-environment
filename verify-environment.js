const { exec } = require('child_process');

const nvmInitScript = '~/.nvm/nvm.sh';
const environmentList = ['docker', 'git', 'npm', 'nvm', 'node', 'java']

const envVersionCheck = (envArray) => {
    envArray.forEach((e) => {
        exec(`/bin/bash -c "source ${nvmInitScript} && ${e} --version"`, (error, stdout, stderr) => {
            if (error) {
              console.error(`Error: ${error.message}`);
              return;
            }
            if (stderr) {
              console.error(`stderr: ${stderr}`);
              return;
            }
            console.log(`${e} version: ${stdout}`);
          });
    }) 
};
envVersionCheck(environmentList);
