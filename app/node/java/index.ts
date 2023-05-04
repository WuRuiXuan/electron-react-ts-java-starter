const java = require('java');
const path = require('path');
const { ipcRenderer } = require('electron');

let called = false;
if (!called) {
  let appPath = ipcRenderer.sendSync('getAppPath');
  java.classpath.push(path.resolve(appPath, './node/java/bin'));
  java.classpath.pushDir(path.resolve(appPath, './node/java/bin'));
  called = true;
}

export const App = java.import('com.common.App');
export const AppConfig = java.import('com.common.AppConfig');
export const FileService = java.import('com.service.FileService');
