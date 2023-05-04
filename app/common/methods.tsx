import appActions from '../actions/appActions';
import writeLog from './writeLog';
import { message } from 'antd';
import { AppConfig } from './baseInterfaces';

const { store } = require('../store/configureStore');
const dispatch = store.dispatch;

export const accurate = (num, accuracy) => {
  switch (accuracy) {
    case '0' || 0: {
      return (Math.round(num * 100) / 100).toFixed(2); // 精确到分
    }
    case '1' || 1: {
      return (Math.round(num * 10) / 10).toFixed(1); // 四舍五入到角
    }
    case '2' || 2: {
      return (parseInt(String(num * 10)) / 10).toFixed(1); // 截断到角
    }
    case '3' || 3: {
      return Math.round(num).toString(); // 四舍五入到元
    }
    case '4' || 4: {
      return parseInt(num).toString(); // 截断到元
    }
    default: {
      return num.toString();
    }
  }
};

export const toastSuccess = (text: string, time: number = 2): void => {
  message.destroy();
  message.success(text, time);
};

export const toastWarn = (text: string, time: number = 5): void => {
  message.destroy();
  message.warn(text, time);
};

export const toastError = (text: string, time: number = 5): void => {
  message.destroy();
  message.error(text, time);
};

export const toastInfo = (text: string, time: number = 5): void => {
  message.destroy();
  message.info(text, time);
};

export const showLoading = (loadingText: string = 'Loading') => {
  dispatch(appActions.showLoading(loadingText + '...'));
  document.getElementById('mask').style.visibility = 'visible';
};

export const dismissLoading = () => {
  dispatch(appActions.dismissLoading());
  document.getElementById('mask').style.visibility = 'hidden';
};

export const sendRequest = (
  reqData: { command_id: string },
  loadingText: string = 'Loading',
  isShowLoading: boolean = true,
  requestUrl?: string
) => {
  for (let key in reqData) {
    if (
      reqData[key] === '' ||
      reqData[key] === null ||
      reqData[key] === undefined ||
      JSON.stringify(reqData[key]) === '{}'
    ) {
      delete reqData[key];
    }
  }

  let url = '';
  let config: AppConfig = store.getState().appReducer.config;
  if (!requestUrl || requestUrl === '') {
    url =
      'http://' +
      config.ServerIP +
      ':' +
      config.ServerPort +
      '/' +
      config.ServerPath;
  } else {
    url = requestUrl;
  }

  isShowLoading && showLoading(loadingText);
  console.log('【' + reqData.command_id + '】' + '请求入参：', reqData);
  writeLog('【' + reqData.command_id + '】' + '请求入参：' + JSON.stringify(reqData));

  return new Promise((resolve) => {
    Promise.race([
      fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/html, application/xhtml+xml, */*',
          'Content-Type': 'application/json'
        },
        mode: 'cors',
        // cache: 'force-cache',
        body: JSON.stringify(reqData)
      }),
      new Promise((resolve, reject) => {
        setTimeout(() => {
          reject(new Error('服务器访问超时'));
        }, Number(config.ReceiveTimeout));
      })
    ])
      .then(response => {
        // @ts-ignore
        if (response.ok) {
          // @ts-ignore
          return response.json();
        } else {
          return { retflag: 1, retmsg: '服务器访问失败' };
        }
      })
      .then(resData => {
        dismissLoading();
        if (resData && resData.data && resData.data instanceof Object && !(resData.data instanceof Array)) {
          resData = {
            ...resData,
            ...resData.data
          };
          delete resData.data;
        }
        console.log('【' + reqData.command_id + '】' + '返回参数：', resData);
        writeLog('【' + reqData.command_id + '】' + '返回参数：' + JSON.stringify(resData));
        resolve(resData);
      })
      .catch(err => {
        dismissLoading();
        toastError(err.message);
        resolve({ retflag: 1, retmsg: err.message });
      });
  })
    .then(result => {
      return result;
    })
    .catch(err => {
      dismissLoading();
      toastError(err.message);
      return { retflag: 1, retmsg: err.message };
    });
};
