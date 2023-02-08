const { writeToFile } = require('../utils/helpers');
const { basePath, timeEntries } = require('../utils/constants');

const startTimer = (argv) => {
  const entry = `\n${argv.time.toISOString()},current-timer,${argv.project}`;
  writeToFile(argv.timeEntries, entry, {
    recursive: true,
  });
};

module.exports = { startTimer };
