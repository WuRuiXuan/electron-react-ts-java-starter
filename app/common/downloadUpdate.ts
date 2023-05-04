import writeLog from './writeLog';
import { writeVersion } from './fileUtils';

// const request = require('request');
// const progress = require('progress-stream');
const unzip = require('unzip-stream');
const fs = require('fs');
const path = require('path');
const { ipcRenderer } = require('electron');
const appPath = ipcRenderer.sendSync('getAppPath');

const downloadUpdate = (
  downloadUrl: string,
  patchVersion: string,
  fileSize: number,
  updatingCallback: (progress: number, status: string) => void
) => {
  const downloadPath = path.join(appPath, `../${patchVersion}.zip`);
  const extractPath = (process.env.NODE_ENV === 'development' ? path.join(appPath, '../downloads/') : path.join(appPath, '../'));//解压路径
  const downloadFileStream = fs.createWriteStream(downloadPath); // zip文件的写入流
  const zipUrl = decodeURI(downloadUrl); // zip文件的地址，防止连接中有中文字符出错使用decodeURI

  // fs.existsSync(downloadPath) && fs.unlinkSync(downloadPath);
  !fs.existsSync(extractPath) && fs.mkdirSync(extractPath);

  const handleReady = () => {
    // showLoading('更新包开始下载');
    console.log('更新包开始下载');
    writeLog('更新包开始下载');
    updatingCallback(0, 'active');
  };

  const handleError = (err) => {
    // dismissLoading();
    // toastError('更新错误：' + err.message);
    console.log('更新错误：' + err.message);
    writeLog('更新错误：' + err.message);
    if (err.message.indexOf('dll') > -1) {
      fs.unlinkSync(downloadPath);//解压完删除本地压缩包
      writeVersion(patchVersion);
      updatingCallback(100, 'success');
      ipcRenderer.send('reload');
    }
    else {
      updatingCallback(100, 'exception');
    }
  };

  const handleDownloadFinish = () => {
    // showLoading('更新包下载完成，开始安装');
    console.log('更新包下载完成，开始安装');
    writeLog('更新包下载完成，开始安装');
    updatingCallback(100, 'normal');

    //解压文件
    fs.createReadStream(downloadPath)
      .on('error', handleError)
      .pipe(unzip.Extract({ path: extractPath }))
      .on('error', handleError)
      .on('finish', handleExtractFinish);
  };

  const handleExtractFinish = () => {
    // dismissLoading();
    // toastSuccess('更新包解压完成', 10);
    console.log('更新包解压完成');
    writeLog('更新包解压完成');
    writeVersion(patchVersion);
    updatingCallback(100, 'success');
    fs.unlinkSync(downloadPath);//解压完删除本地压缩包
    ipcRenderer.send('reload');
  };

  downloadFileStream.on('finish', handleDownloadFinish).on('error', handleError);

  console.log('download fetch start: ' + zipUrl);
  writeLog('download fetch start: ' + zipUrl);
  let size = 0;
  fetch(zipUrl, {
    method: 'GET',
    headers: {
      'Accept': 'text/html, application/xhtml+xml, application/xml',
      'Accept-Encoding': 'gzip, deflate',
      'Content-Type': 'application/zip'
    }
  })
    .then(response => {
      handleReady();
      const reader = response.body.getReader();
      return new ReadableStream({
        start(controller) {
          // 下面的函数处理每个数据块
          function push() {
            // "done"是一个布尔型，"value"是一个Unit8Array
            reader.read().then(({ done, value }) => {
              // 判断是否还有可读的数据？
              if (done) {
                console.log('end size: ' + size);
                downloadFileStream.end();
                // 告诉浏览器已经结束数据发送
                controller.close();
                return;
              }
              downloadFileStream.write(value);
              size += value.length || 0;
              updatingCallback(Math.floor(size / fileSize * 100), 'normal');
              // 取得数据并将它通过controller发送给浏览器
              controller.enqueue(value);
              push();
            });
          }

          push();
        }
      });
    })
    // .then(response => savingFile(new Response(response), `${patchVersion}.zip`))
    .catch(handleError);

  // return new Promise((resolve) => {
  //
  // }).then(result => {
  //   return result;
  // })
  //   .catch((err) => {
  //     dismissLoading();
  //     toastError('更新错误：' + err.message);
  //     console.log('更新错误：' + err.message);
  //     writeLog('更新错误：' + err.message);
  //     return false;
  //   });
};

const savingFile = (response, fileName) => {
  response.blob().then(blob => {
    const reader = new FileReader();
    reader.addEventListener('loadend', function() {
      downloadBlob(blob, fileName);
    });
    reader.readAsText(blob);

    //下载
    function downloadBlob(blob, fileName) {
      let blobUrl = window.URL.createObjectURL(blob);
      let a = document.createElement('a');
      a.href = blobUrl;
      a.target = '_blank';
      a.style.display = 'none';
      document.body.appendChild(a);
      a.download = fileName;
      a.click();
      window.URL.revokeObjectURL(blobUrl);
      document.body.removeChild(a);
    }
  });
};

export default downloadUpdate;
