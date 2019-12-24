#! node
const clear = require('clear'); // https://www.npmjs.com/package/clear
const chalk = require('chalk'); // https://www.npmjs.com/package/chalk
const figlet = require('figlet'); // https://www.npmjs.com/package/figlet

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
  console.log(credentials);
}

run();