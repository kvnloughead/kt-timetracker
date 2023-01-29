const { writeToFile } = require('../utils/helpers');
const { basePath, dataFile } = require('../utils/constants');

const startTimer = (argv) => {
  const entry = `\n${argv.time.toISOString()},current-timer,${argv.project}`;
  writeToFile(entry, {
    recursive: true,
  });
};

module.exports = { startTimer };
