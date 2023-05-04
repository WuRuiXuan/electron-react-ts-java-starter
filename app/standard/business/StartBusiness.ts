import StartListener from '../components/Start/StartListener';
import { StartInterface } from '../components/Start/interfaces';
import { FileService } from '../../node/java';
import { toastError } from '../../common/methods';
import RoutePaths from '../../enums/RoutePaths';
import ConfirmDialogTypes from '../../enums/ConfirmDialogTypes';
import { readVersion } from '../../common/fileUtils';
import appActions from '../../actions/appActions';
import downloadUpdate from '../../common/downloadUpdate';
import writeLog from '../../common/writeLog';
import { AppConfig } from '../../common/baseInterfaces';
import { useStoreState } from '../../common/reduxHooks';

const { ipcRenderer } = require('electron');
const packageInfo = require('../../package.json');

function mapState(store: any) {
  return {
    appConfig: store.appReducer.appConfig
  };
}

export default class StartBusiness extends StartListener implements StartInterface {

  protected appConfig: AppConfig;

  constructor() {
    super();

    const {
      appConfig
    }: {
      appConfig: AppConfig
    } = useStoreState(mapState);
    this.appConfig = appConfig;
  }

  async componentDidMount() {
    await this.doStart();
  }

  async doStart() {
    let configStr = this.readConfigFile();
    if (configStr) {
      console.log('【readConfigFile】', JSON.parse(configStr));
      try {
        this.updateConfigFile(JSON.parse(configStr));
        // this.downloadUpdate();
      } catch (err) {
        toastError(err.message);
        this.showStartFail();
      }
    } else {
      toastError('初始化配置文件错误');
      this.showStartFail();
    }
  }

  readConfigFile(): string {
    let res = FileService.initSync();
    return res ? FileService.readConfigFileSync() : null;
  }

  async downloadUpdate() {
    // let res = await this.netService.getPosVersion();
    // if (res.retflag === 0) {
    //   const serverIP = this.appConfig.ServerIP;
    //   const serverPort = this.appConfig.ServerPort;
    //   const downloadUrl = `http://${serverIP}:${serverPort}/pos-server-home/file/downloadFile?file_id=${res.fileurl}`;
    //   let currentVersion = readVersion();
    //   writeLog('currentVersion: ' + Number(currentVersion));
    //   if (res.ispublish === 'Y' && Number(currentVersion) < Number(res.packversion)) {
    //     const updatingCallback = (progress: number, status: string) => {
    //       this.updateProgressStatus(status);
    //       if (status === 'active') {
    //         this.showProgress();
    //       } else if (status === 'normal') {
    //         this.updateProgress(progress);
    //       } else if (status === 'success') {
    //         this.dismissProgress();
    //       } else if (status === 'exception') {
    //         this.dismissProgress();
    //         this.showStartFail();
    //       }
    //     };
    //     downloadUpdate(downloadUrl, res.packversion, Number(res.filesize), updatingCallback);
    //     return;
    //   }
    // }
  }

  updateConfigFile(config: AppConfig) {
    this.dispatch(appActions.setAppConfig(config));
  }

  showStartFail() {
    this.showConfirmDialog(ConfirmDialogTypes.START_FAIL, '启动失败，是否重试？');
  }
}
