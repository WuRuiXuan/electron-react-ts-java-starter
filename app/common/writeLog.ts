const path = require('path');
const fs = require('fs');
// const dev = process.env.NODE_ENV === 'development';

const { ipcRenderer } = require('electron');

export default function writeLog(text) {
  const appPath = ipcRenderer.sendSync('getAppPath');
  const logPath = path.join(appPath, '../logs');
  let date = new Date();
  if (date.getHours() < 5) {
    date = new Date(date.getTime() - 24 * 60 * 60 * 1000);
  }

  let year: number | string = date.getFullYear();
  let month: number | string = date.getMonth() + 1;
  let day: number | string = date.getDate();
  let hour: number | string = date.getHours();
  let minute: number | string = date.getMinutes();
  let second: number | string = date.getSeconds();
  let ms: number | string = date.getMilliseconds();

  month < 10 && (month = `0${month}`);
  day < 10 && (day = `0${day}`);
  hour < 10 && (hour = `0${hour}`);
  minute < 10 && (minute = `0${minute}`);
  second < 10 && (second = `0${second}`);

  if (ms < 10) {
    ms = `00${ms}`;
  } else if (ms < 100) {
    ms = `0${ms}`;
  }
  let time = `[${hour}:${minute}:${second} ${ms}]`;
  let path1 = `${year}${month}`;
  let path2 = `${path1}${day}`;
  let dir1 = `${logPath}/${path1}`;
  let dir2 = `${logPath}/${path1}/${path2}.txt`;
  !fs.existsSync(logPath) && fs.mkdirSync(logPath);
  !fs.existsSync(dir1) && fs.mkdirSync(dir1);
  let txt = `${time} ${text} \r\n`;

  if (fs.existsSync(dir2)) {
    fs.appendFileSync(dir2, txt, 'utf8');
  } else {
    try {
      fs.writeFileSync(dir2, txt, 'utf8');
    } catch (err) {
      throw err;
    }
  }
}
