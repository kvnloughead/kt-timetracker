#!/usr/bin/env node

/** kt (keep time) - a command line time tracker */

const fs = require('fs');
const yargs = require('yargs');
const { hideBin } = require('yargs/helpers');
require('dotenv').config();

// const configPath = `/home/${process.env.USER}/.config/.ktrc.json`;
// const config = JSON.parse(fs.readFileSync(configPath));

const { startTimer } = require('../commands/start');
const { stopTimer } = require('../commands/stop');

const argv = yargs(hideBin(process.argv))
  .env('KT')
  .default({
    timeEntries: `/home/${process.env.USER}/.config/kt/time-entries.csv`,
  })
  .option('config', {
    describe: 'specify configuration file',
    alias: 'cfg',
    default: `/home/${process.env.USER}/.config/.ktrc.json`,
  })
  .command(
    'start <project> [time]',
    'starts timer for a project',
    (yargs) => {
      yargs.positional('project', {
        describe: 'name of project in progress',
      });
      yargs.positional('time', {
        describe: 'time to start the project',
        default: new Date(),
      });
    },
    startTimer,
  )
  .command(
    'stop [time]',
    'stops current timer',
    (yargs) => {
      yargs.positional('time', {
        describe: 'time to stop the project at',
        default: new Date(),
      });
    },
    stopTimer,
  )
  .example('$0 start side-gig now', 'start side-gig timer now')
  .usage('\nUsage: $0 <command> [options]')
  .option('verbose', {
    alias: 'v',
    type: 'boolean',
    description: 'run with verbose logging',
  })
  .demandCommand()
  .showHelpOnFail(true)
  .help('h')
  .alias('h', 'help')
  .config().argv;

console.log(argv.config);
