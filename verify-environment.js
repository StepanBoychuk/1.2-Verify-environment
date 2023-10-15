const { exec } = require('child_process');

const nvmInitScript = '~/.nvm/nvm.sh';
const toolsList = ['docker', 'git', 'npm', 'nvm', 'node'];

const runCommand = (toolName) => {
  return new Promise((resolve) => {
    exec(`/bin/bash -c "source ${nvmInitScript} && ${toolName} --version"`, (error, stdout, stderr) => {
      resolve(stdout);
    });
  });
}

const envVersionCheck = async (toolName) => {
  const toolVersion = await runCommand(toolName);
  if(toolVersion) {
    console.log(`${toolName}: ${toolVersion}`);
  } else {
    console.log(`${toolName} not found`);
    process.exit(1);
  }
}

toolsList.forEach(tool => {
  envVersionCheck(tool).catch(error => {
    console.error(error);
    process.exit(1)
  });
});
