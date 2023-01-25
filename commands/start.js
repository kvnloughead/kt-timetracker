const { writeToFile } = require('../utils/helpers');
const { basePath, dataFile } = require('../utils/constants');

const startTimer = (argv) => {
  const now = Date.now();
  writeToFile(`${now}\n`, { recursive: true });
};

module.exports = { startTimer };
