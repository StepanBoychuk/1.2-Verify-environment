const { exec } = require('child_process');
const util = require('util');

const nvmInitScript = '~/.nvm/nvm.sh';
const toolsList = ['docker', 'git', 'npm', 'nvm', 'node'];

const promisifiedExec = util.promisify(exec);

const toolVersionCheck = async (toolName) => {
  const { stdout } = await promisifiedExec(`/bin/bash -c "source ${nvmInitScript} && ${toolName} --version"`);
  return `${toolName}: ${stdout}`; 
}

Promise.all(toolsList.map(toolVersionCheck))
  .then(result => {
    console.log(result);
  }).catch(error => {
    console.error(`${error}`);
    process.exit(error.code);
  })