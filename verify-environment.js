const { exec } = require('child_process');

const nvmInitScript = '~/.nvm/nvm.sh';
const toolsList = ['docker', 'git', 'npm', 'nvm', 'node'];

const toolVersionCheck = (tool) => {
  return new Promise((resolve) => {
      exec(`/bin/bash -c "source ${nvmInitScript} && ${tool} --version"`, (error, stdout, stderr) => {
        if (stdout){
          resolve(console.log(`${tool}: ${stdout}`));
        }else{
          throw new Error(`${tool} not found.`);
        }
      });
  });
}

Promise.all(toolsList.map(tool => {
  toolVersionCheck(tool).catch(error => {
    console.log(error)
    process.exit(1)
  });
}));