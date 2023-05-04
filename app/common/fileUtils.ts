import writeLog from './writeLog';

const fs = require('fs');
const path = require('path');
const { ipcRenderer } = require('electron');
const appPath = ipcRenderer.sendSync('getAppPath');

let tempDirPath = path.join(appPath, 'temp');
let versionPath = path.join(tempDirPath, 'version.txt');

export const writeFile = (text, filePath) => {
  try {
    if (!fs.existsSync(tempDirPath)) {
      fs.mkdirSync(tempDirPath);
    }
    fs.writeFileSync(filePath, text, 'utf8');
  } catch (err) {
    writeLog(err.message);
    throw err;
  }
};

export const readFile = (filePath) => {
  try {
    if (fs.existsSync(filePath)) {
      return fs.readFileSync(filePath, 'utf8');
    } else {
      return '';
    }
  } catch (err) {
    writeLog(err.message);
    throw err;
  }
};

export const deleteFile = (filePath) => {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      return true;
    } else {
      return false;
    }
  } catch (err) {
    writeLog(err.message);
    throw err;
  }
};

/**
 * 更新版本
 * @param text
 */
export const writeVersion = (text) => {
  return writeFile(text, versionPath);
};

export const readVersion = () => {
  return readFile(versionPath) || '0';
};
