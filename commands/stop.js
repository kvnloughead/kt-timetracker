const replace = require('replace');

const { timeEntries } = require('../utils/helpers');

const stopTimer = async (argv) => {
  replace({
    regex: `,current-timer,`,
    replacement: `,${new Date().toISOString()},`,
    paths: [timeEntries],
  });
};

module.exports = { stopTimer };
