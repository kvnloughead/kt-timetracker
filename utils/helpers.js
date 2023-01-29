const fs = require('fs');
const csvParser = require('csv-parser');
const createReadStream = require('fs').createReadStream;
const createWriteStream = require('fs').createWriteStream;
const { execSync } = require('child_process');
const { open, mkdir } = require('fs.promises');
const path = require('path');

const { BASE_PATH, DATA_FILE, HEADERS } = require('../utils/constants');
const dataFile = path.join(BASE_PATH, DATA_FILE);

function createCsvReadStream(path) {
  const result = [];
  createReadStream(path)
    .pipe(csvParser())
    .on('data', (data) => {
      result.push(data);
    })
    .on('end', () => {
      console.log(result);
    });
  return result;
}

/** Returns number of lines in a file */
function getLines(file) {
  const result = +execSync(`wc -l ${file}`).toString().split(' ')[0];
  return result;
}

/** Gets last non-empty line in file */
function getLastNonEmptyLine(file) {
  const line = execSync(`tac ${file} | grep -m 1 .`).toString();
  return line;
}

function isActiveTimer(file) {
  const lastEntry = getLastNonEmptyLine(file);
  const { stop } = parseCsvLine(lastEntry, HEADERS);
  if (stop == 'current-timer') return true;
}

/**
 *
 * @param {string} - the line to parse
 * @param {string[]} - array of position CSV headers
 */
function parseCsvLine(line, headers, options = { sep: ',' }) {
  const data = {};
  const fields = line.replace('\n', '').split(options.sep);
  fields.forEach((field, i) => {
    data[headers[i]] = field;
  });
  return data;
}

async function writeToFile(contents, options) {
  const { file = dataFile } = options;
  try {
    // create directory, file, and add CSV headers, if necessary
    await mkdir(path.dirname(file), options);
    if (!fs.existsSync(file)) {
      contents = `start,stop,project\n` + contents;
    }
    // append data to file
    f = await open(file, 'a+');
    f.writeFile(contents);
    console.log(`wrote ${contents} to ${file}`);
  } catch (err) {
    console.error(err.message);
  } finally {
    await f.close();
  }
}

module.exports = {
  writeToFile,
  createCsvReadStream,
  getLines,
  getLastNonEmptyLine,
  parseCsvLine,
  isActiveTimer,
  dataFile,
};
