const { open, mkdir } = require('fs.promises');
const path = require('path');

const log = console.log;
const { BASE_PATH, DATA_FILE } = require('../utils/constants');
const dataFile = path.join(BASE_PATH, DATA_FILE);

async function writeToFile(contents, options) {
  const { file = dataFile } = options;
  console.log(path.dirname(file));
  try {
    const createDir = await mkdir(path.dirname(file), options);
    if (createDir) log(`${createDir} created `);
    f = await open(file, 'a+');
    f.writeFile(contents);
    log(`wrote ${contents} to ${file}`);
  } catch (err) {
    console.error(err.message);
  } finally {
    await f.close();
  }
}

module.exports = { writeToFile };
