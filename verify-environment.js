const { exec } = require('child_process');
const util = require('util');

const nvmInitScript = '~/.nvm/nvm.sh';
const toolsList = ['docker', 'git', 'npm', 'nvm', 'node'];

const promisifiedExec = util.promisify(exec);

const toolVersionCheck = async (toolName) => {
  const { stdout } = await promisifiedExec(`/bin/bash -c "source ${nvmInitScript} && ${toolName} --version"`);
  return stdout;
}

Promise.all(toolsList.map(tool => {
  toolVersionCheck(tool)
    .then(result => {
      console.log(`${tool}: ${result}`);
    }).catch(error => {
      console.error(`${tool} not found`);
      process.exit(error.code);
    })
}));