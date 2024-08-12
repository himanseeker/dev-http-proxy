const { Command } = require('commander');
const { startServer } = require('./proxyService');

const program = new Command();

program
  .requiredOption('-e, --env <environment>', 'Environment to proxy to (dev or qa)')
  .option('-x, --exclude-port <port>', 'Port of the service to not proxy')
  .parse(process.argv);

const options = program.opts();

if (!['dev', 'qa'].includes(options.env)) {
  console.error('Invalid environment. Choose either "dev" or "qa".');
  process.exit(1);
}

startServer(options.env, options.excludePort);
