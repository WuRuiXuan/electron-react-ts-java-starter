import { app, BrowserWindow, dialog, globalShortcut, shell } from 'electron';
import MenuBuilder from './menu';
import { autoUpdater } from 'electron-updater';

const { ipcRenderer } = require('electron');
// const deleteFolderRecursive = require("./common/deleteFolder");
const ipcMain = require('electron').ipcMain;
const path = require('path');
const fs = require('fs');
const cp = require('child_process');
const appPackage = require('./package.json');

app.commandLine.appendSwitch('disable-pinch');  //禁止屏幕缩放

let mainWindow = null;
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true';

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (
  process.env.NODE_ENV === 'development' ||
  process.env.DEBUG_PROD === 'true'
) {
  require('electron-debug')();
  const path = require('path');
  const p = path.join(__dirname, '..', 'app', 'node_modules');
  require('module').globalPaths.push(p);
}

// const installExtensions = async () => {
//   const installer = require('electron-devtools-installer');
//   const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
//   const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];
//
//   return Promise.all(
//     extensions.map(name => installer.default(installer[name], forceDownload))
//   ).catch(console.log);
// };


// 删除日志
let saveLogsMonth = 3;  //本地日志保留月数
const logPath = path.join(__dirname, '../logs');
if (fs.existsSync(logPath)) {
  let arr = fs.readdirSync(logPath);
  if (arr.length > saveLogsMonth) {
    arr.forEach((item, index) => {
      if (index < arr.length - saveLogsMonth) deleteFolderRecursive(`${logPath}/${item}`);
    });
  }
}

//删除本地压缩文件
const zipPath = path.join(__dirname, '../');
if (fs.existsSync(zipPath)) {
  let zipArr = fs.readdirSync(zipPath);
  zipArr.forEach((item, index) => {
    if (item.indexOf('.zip') > -1) {
      fs.unlinkSync(zipPath + item);
    }
  });
}

function deleteFolderRecursive(path) {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach(function(file) {
      let curPath = path + '/' + file;
      if (fs.statSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
}

const createWindow = async () => {
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.DEBUG_PROD === 'true'
  ) {
    // await installExtensions();
  }

  mainWindow = new BrowserWindow({
    show: false,
    useContentSize: true,
    autoHideMenuBar: true, //隐藏菜单栏
    frame: true, //隐藏图标栏(最小化最大化关闭按钮)
    resizable: true,
    fullscreen: false,
    width: 1280,
    height: 720,
    movable: true
  });

  mainWindow.loadURL(`file://${__dirname}/app.html`);

  // @TODO: Use 'ready-to-show' event
  // https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
  mainWindow.webContents.on('did-finish-load', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
      mainWindow.focus();
      if (process.env.NODE_ENV === 'development') {
        if (process.platform !== 'darwin') {
          mainWindow.maximize();
        }
      }
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  mainWindow.on('focus', (event, msg) => {
    mainWindow.webContents.send('pos-focus');
  });

  mainWindow.on('restore', (event, msg) => {
    mainWindow.webContents.send('pos-restore');
  });

  mainWindow.on('minimize', (event, msg) => {
    mainWindow.webContents.send('pos-minimize');
  });

  mainWindow.on('maximize', (event, msg) => {
    mainWindow.webContents.send('pos-maximize');
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  updateHandle();
};

const isSecondInstance = app.makeSingleInstance(
  (commandLine, workingDirectory) => {
    // Someone tried to run a second instance, we should focus our window.
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
  }
);

if (isSecondInstance) {
  app.quit();
}

/**
 * Add event listeners...
 */

ipcMain.on('reload', (evt, msg) => {
  mainWindow.webContents.reload();
});

ipcMain.on('getAppPath', (evt, msg) => {
  evt.returnValue = __dirname;
});

ipcMain.on('appQuit', (evt, msg) => {
  app.quit();
});

ipcMain.on('min-window', () => {
  if (mainWindow.isMaximized()) {
    mainWindow.restore();
  }
  mainWindow.minimize();
});

ipcMain.on('max-window', () => {
  // if (mainWindow.isMaximized()) {
  //   mainWindow.restore();
  // }
  mainWindow.maximize();
});

ipcMain.on('close-window', () => {
  const options = {
    type: 'info',
    title: '温馨提示',
    message: '确定要关闭POS吗?',
    buttons: ['否', '是']
  };
  dialog.showMessageBox(options, index => {
    if (index === 1) {
      app.quit();
    }
  });
});

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') {
    checkJavac();
    doStartCmd();
    createShortcut();
  }
  createWindow().then(r => {
  });
  updateConfigFile({ autoQuit: true });
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow().then(r => {
    });
  }
});

app.on('quit', () => {
  if (process.env.NODE_ENV === 'production') {
    // doQuitCmd();
  }
});

/**
 * Functions
 */

const checkJavac = () => {
  if (!checkJvm()) {
    cp.exec('javac', (err, stdout, stderr) => {
      if (err) {
        showJVMPathDialog();
      } else {
        installIVM();
      }
    });
  }
};

const checkJvm = () => {
  let jvmDllPath = path.join(
    __dirname,
    'node_modules/java/build/jvm_dll_path.json'
  );
  let _jvm1 = fs
    .readFileSync(jvmDllPath)
    .toString()
    .split(';')[1]
    .replace('"', '');
  let jvmDllFile = path.join(_jvm1, 'jvm.dll');
  return fs.existsSync(jvmDllFile);
};

const showJVMPathDialog = () => {
  dialog.showMessageBox(
    { title: '温馨提示', message: '请设置jvm路径', buttons: ['确定', '取消'] },
    index => {
      if (index === 0) {
        dialog.showOpenDialog({
          title: '设置jvm路径',
          defaultPath: path.join(__dirname, 'node_modules/java/build/'),
          properties: ['openFile', 'showHiddenFiles'],
          message: '设置jvm路径'
        });
      }
    }
  );
};

const installIVM = () => {
  let _file = fs.readFileSync(path.join(__dirname, 'appConfig.json'));
  let _config = JSON.parse(_file);
  if (_config.installJVM) {
    let jvmDllPath = path.join(
      __dirname,
      'node_modules/java/build/jvm_dll_path.json'
    );
    let _jvm1 = fs.readFileSync(jvmDllPath).toString();

    cp.exec(
      'node postInstall.js',
      { cwd: path.join(__dirname, 'node_modules/java') },
      (err, stdout, stderr) => {
        if (err) {
          process.stdout.write(stderr);
        } else {
          let _jvm2 = fs.readFileSync(jvmDllPath).toString();
          if (_jvm1 !== _jvm2) {
            const options = {
              type: 'info',
              title: '温馨提示',
              message: '需要重启',
              buttons: ['确定']
            };
            dialog.showMessageBox(options, index => {
              if (index === 0) {
                updateConfigFile({ autoQuit: false });
                app.relaunch();
                app.quit();
              }
            });
          }
        }
      }
    );
  } else {
    showJVMPathDialog();
  }
};

const doStartCmd = () => {
  let cmdFile = path.join(__dirname, 'start.cmd');
  doCmd(cmdFile);
};

const doQuitCmd = () => {
  let _file = fs
    .readFileSync(path.join(__dirname, 'appConfig.json'))
    .toString();
  let quitConfig = _file;
  if (typeof _file === 'string') {
    quitConfig = JSON.parse(_file);
  }
  let { autoQuit, quitTime } = quitConfig;
  if (!quitTime) {
    quitTime = 0;
  }
  if (autoQuit) {
    cp.exec(`shutdown -s -t ${quitTime}`, (err, stdout, stderr) => {
      if (err) {
        console.log('执行关机命令失败');
      } else {
        console.log('执行关机命令成功');
      }
    });
  }
  // let quitCmdFile = path.join(__dirname, "quit.cmd");
  // doCmd(quitCmdFile);
};

const doCmd = cmdFile => {
  let exist = fs.existsSync(cmdFile);
  if (exist) {
    cp.exec(cmdFile, (err, stdout, stderr) => {
      if (err) {
        console.log('执行cmd文件失败', err);
      } else {
        console.log(stdout);
      }
    });
  } else {
    console.log('温馨提示', `文件[${cmdFile}]不存在`);
  }
};

const readShortcut = () => {
  let env = process.env;
  //桌面路径
  const desktopPath = path.join(`${env.HOMEDRIVE}${env.HOMEPATH}`, 'Desktop');
  //公用桌面路径
  const publicDesktopPath = path.join(env.PUBLIC, 'Desktop');
  //桌面上pos的快捷方式
  const startLink = path.join(desktopPath, `${appPackage.productName}.lnk`);
  const startLink2 = path.join(
    publicDesktopPath,
    `${appPackage.productName}.lnk`
  );
  let shortcutDetails = null;
  try {
    shortcutDetails = shell.readShortcutLink(startLink2);
    if (!shortcutDetails) {
      shortcutDetails = shell.readShortcutLink(startLink);
    }
  } catch (error) {
    shortcutDetails = null;
  }
  return shortcutDetails;
};

const createShortcut = () => {
  let _file = fs.readFileSync(path.join(__dirname, 'appConfig.json'));
  let _config = JSON.parse(_file);
  let { autoStart } = _config;
  if (autoStart) {
    let shortcutDetails = readShortcut();
    //系统启动目录
    const startPath = path.join(
      process.env.APPDATA,
      'Microsoft',
      'Windows',
      'Start Menu',
      'Programs',
      'Startup'
    );
    let shortcutPath = path.join(startPath, `${appPackage.productName}.lnk`);
    if (fs.existsSync(shortcutPath)) {
      fs.unlinkSync(shortcutPath);
    }
    let isCreateShortcut = false;
    if (shortcutDetails) {
      isCreateShortcut = shell.writeShortcutLink(
        shortcutPath,
        'create',
        shortcutDetails
      );
    } else {
      isCreateShortcut = shell.writeShortcutLink(shortcutPath, 'create', {
        target: process.execPath,
        cwd: process.execPath.replace(`\\${appPackage.productName}.exe`, ''),
        description: appPackage.description
      });
    }
  }
};

const writeFile = (data, fileName, extName) => {
  let fileDir = path.join(__dirname, 'logs');
  if (!fs.existsSync(fileDir)) {
    fs.mkdirSync(fileDir);
  }
  let filePath = path.join(fileDir, `${fileName}.${extName}`);
  fs.appendFileSync(filePath, `${data} \r\n`);
};

// 检测更新
const updateHandle = () => {
  let message = {
    error: '检查更新出错',
    checking: '正在检查更新……',
    updateAva: '检测到新版本，正在下载……',
    updateNotAva: '现在使用的就是最新版本，不用更新'
  };
  const os = require('os');

  // autoUpdater.setFeedURL(appPackage.build.publish.url);
  autoUpdater.on('error', error => {
    sendUpdateMessage(message.error);
  });
  autoUpdater.on('checking-for-update', () => {
    sendUpdateMessage(message.checking);
  });
  autoUpdater.on('update-available', info => {
    sendUpdateMessage(message.updateAva);
  });
  autoUpdater.on('update-not-available', info => {
    sendUpdateMessage(message.updateNotAva);
  });

  // 更新下载进度事件
  autoUpdater.on('download-progress', progressObj => {
    mainWindow.webContents.send('downloadProgress', progressObj);
  });
  autoUpdater.on(
    'update-downloaded',
    (
      event,
      releaseNotes,
      releaseName,
      releaseDate,
      updateUrl,
      quitAndUpdate
    ) => {
      ipcMain.on('isUpdateNow', (e, arg) => {
        // console.log(arguments);
        console.log('开始更新');
        //some code here to handle event
        updateConfigFile({ autoQuit: false });
        autoUpdater.quitAndInstall();
      });

      mainWindow.webContents.send('isUpdateNow');
    }
  );

  ipcMain.on('checkForUpdate', () => {
    //执行自动更新检查
    autoUpdater.checkForUpdates().then(r => {
    });
  });
};

// 通过main进程发送事件给renderer进程，提示更新信息
const sendUpdateMessage = text => {
  mainWindow.webContents.send('message', text);
};

const updateConfigFile = config => {
  let _file = fs.readFileSync(path.join(__dirname, 'appConfig.json'));
  let _config = JSON.parse(_file);
  for (let k in _config) {
    if (config[k] !== undefined) {
      _config[k] = config[k];
    }
  }
  fs.writeFileSync(
    path.join(__dirname, 'appConfig.json'),
    JSON.stringify(_config)
  );
};
