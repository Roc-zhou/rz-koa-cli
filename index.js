#! node
const path = require('path')
const clear = require('clear'); // https://www.npmjs.com/package/clear
const chalk = require('chalk'); // https://www.npmjs.com/package/chalk
const figlet = require('figlet'); // https://www.npmjs.com/package/figlet
const CLI = require('clui'),
  Spinner = CLI.Spinner;
const { copyFolder, mkdir, exists, install } = require('./lib/util')
const { spawn } = require('child_process')

// const parseArgs = require('minimist')(process.argv.slice(2))

const { generalOptions } = require('./lib/inquirer');

clear();
console.log(
  chalk.blue(
    figlet.textSync('rz-koa-cli', { horizontalLayout: 'full' })
  )
);

const run = async () => {
  const credentials = await generalOptions();
  // console.log(credentials);

  const countdown = new Spinner('Downloading, please wait......', ['⣾', '⣽', '⣻', '⢿', '⡿', '⣟', '⣯', '⣷']);
  countdown.start();
  try {
    const isHave = await exists(credentials.folderName)
  } catch (error) {
    mkdir(path.resolve(process.cwd(), './', credentials.folderName))
  }
  copyFolder(path.join(__dirname + '/templates'), path.resolve(process.cwd(), './', credentials.folderName), function (err) {
    if (err) {
      return
    }
    //continue
    const pa = path.resolve(process.cwd(), './', credentials.folderName)
    const init = spawn(process.platform === 'win32' ? 'npm.cmd' : 'npm', ['init', '-y'], {
      cwd: pa
    })
    init.stdout.on('data', (data) => { })
    init.stderr.on('data', (data) => { })
    init.on('close', async cod => {
      if (cod !== 0) {
        console.log(cod);
        return
      }

      await install(pa, 'koa')
      await install(pa, 'koa-router')
      await install(pa, 'koa-logger')
      await install(pa, 'koa-bodyparser')
      await install(pa, 'moment')
      await install(pa, 'koa-json')

      if (credentials.select.length !== 0) {
        for (const x of credentials.select) await install(pa, x)
      }
      process.stdout.write('\n');
      console.log(`    you can cd ${credentials.folderName}`);
      process.exit(0);
    })
  })
}

run();

