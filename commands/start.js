const { writeToFile } = require('../utils/helpers');
const { basePath, timeEntries } = require('../utils/constants');

const startTimer = (argv) => {
  console.log(argv);
  const entry = `\n${argv.time.toISOString()},current-timer,${argv.project}`;
  writeToFile(entry, {
    recursive: true,
  });
};

module.exports = { startTimer };
