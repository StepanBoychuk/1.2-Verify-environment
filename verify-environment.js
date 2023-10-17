const { exec } = require('child_process');
const util = require('util');

const nvmInitScript = '~/.nvm/nvm.sh';
const toolsList = ['docker', 'git', 'npm', 'nvm', 'node'];

const promisifiedExec = util.promisify(exec);

const toolVersionCheck = async (toolName) => {
  try {
    const { stdout } = await promisifiedExec(`/bin/bash -c "source ${nvmInitScript} && ${toolName} --version"`)
    return stdout
  } catch (error) {
    console.error(`${toolName} not found`);
    process.exit(4);
  }
}

Promise.all(toolsList.map(tool => {
  toolVersionCheck(tool)
    .then(result => {
      console.log(`${tool}: ${result}`);
    });
}));