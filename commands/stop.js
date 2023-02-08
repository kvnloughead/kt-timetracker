const { sed, tail } = require('shelljs');

const stopTimer = async (argv) => {
  const lastEntry = tail({ '-n': 1 }, argv.timeEntries);
  if (!lastEntry.includes('current-timer')) {
    console.error('No timer is currently running');
  } else {
    const project = lastEntry.split(',')[argv.headers.indexOf('project')];
    const t = argv.time.toISOString();
    const res = sed('-i', 'current-timer', t, argv.timeEntries);
    res.stderr
      ? console.error(stderr)
      : console.log(
          `Timer for "${project}" stopped at ${argv.time.toLocaleString()}`,
        );
  }
};

module.exports = { stopTimer };
