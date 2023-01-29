const replace = require('replace');

const { dataFile } = require('../utils/helpers');

const stopTimer = async (argv) => {
  replace({
    regex: `,current-timer,`,
    replacement: `,${new Date().toISOString()},`,
    paths: [dataFile],
  });
};

module.exports = { stopTimer };
