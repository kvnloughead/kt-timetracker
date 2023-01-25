#!/usr/bin/env node

const yargs = require('yargs');
const { hideBin } = require('yargs/helpers');

const { startTimer } = require('../commands/start');

yargs(hideBin(process.argv))
  .command(
    'start <project> [time]',
    'starts timer for a project',
    (yargs) => {
      yargs.positional('project', {
        describe: 'name of project in progress',
      });
      yargs.positional('time', {
        describe: 'time to start the project',
        default: 'now',
      });
    },
    startTimer,
  )
  .example('$0 start side-gig now', 'start side-gig timer now')
  .usage('\nUsage: $0 <command> [options]')
  .option('verbose', {
    alias: 'v',
    type: 'boolean',
    description: 'run with verbose logging',
  })
  .demandCommand()
  .showHelpOnFail(true, 'Something went wrong')
  .help('h')
  .alias('h', 'help').argv;
