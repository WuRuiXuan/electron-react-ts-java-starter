const fs = require('fs');
const util = require('util');

const readFileSync = util.promisify(fs.readFile);

const getFile = async (fileName) => {
  try {
    const data = await readFileSync(fileName);
    console.log(data)
  }
  catch (e) {
    console.log(e.message);
  }
};

(async () => {
  await getFile('/etc/passwd');
})();
