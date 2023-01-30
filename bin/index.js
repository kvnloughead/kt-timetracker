#!/usr/bin/env node

/** kt (keep time) - a command line time tracker */

const findUp = require('find-up');
const fs = require('fs');
const yargs = require('yargs');
const { hideBin } = require('yargs/helpers');
require('dotenv').config();

const configPath = findUp.sync(['.ktrc', '.ktrc.json']);
const config = configPath ? JSON.parse(fs.readFileSync(configPath)) : {};

const { startTimer } = require('../commands/start');
const { stopTimer } = require('../commands/stop');

const argv = yargs(hideBin(process.argv))
  .env('KT')
  .default({ timeEntries: './test/time-entires.csv', dev: false })
  .options({
    d: {
      alias: 'dev',
      describe: 'run in dev mode',
      type: 'boolean',
    },
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
  .showHelpOnFail(true, 'Something went wrong')
  .help('h')
  .alias('h', 'help')
  .config(config).argv;

console.log(argv);
