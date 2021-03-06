const inquirer = require('inquirer'); // https://www.npmjs.com/package/inquirer

const plugins = ['axios', 'jsonwebtoken', 'redis', 'rz-des', 'rz-mysql', 'mysql', '@hapi/joi']

module.exports.generalOptions = () => {
  const question = [
    {
      type: 'input',
      name: 'folderName',
      message: 'Enter your package name:',
      validate: function (value) {
        if (/^\w+$/.test(value)) {
          return true;
        } else {
          return 'Please enter your package name (英文、数字、_)';
        }
      }
    },
    {
      type: "checkbox",
      message: "Select the plugins you need: ",
      name: "select",
      choices: plugins,
      pageSize: 15, // 设置行数
      default: ['axios', 'jsonwebtoken', 'rz-des', 'rz-mysql'],
    }
    /* ,
    {
      type: 'confirm',
      name: 'confirm',
      message: "Run 'NPM install' for you after project creation",
    } */
  ]

  return inquirer.prompt(question);
}