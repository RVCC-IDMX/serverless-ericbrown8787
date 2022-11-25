const chalk = require('chalk');
const { DateTime } = require('luxon');

exports.handler = async function () {
  const date = DateTime.now();
  console.log(chalk.cyanBright.bold(`${date}: Hello from Netlify Functions! We appear to be working!`));
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Hello world!' }),
  };
};
