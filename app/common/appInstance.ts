import NetService from '../standard/service/NetService';
import { AppInstance } from './baseInterfaces';

let netService = new NetService();

let appInstance: AppInstance = {
  netService,
  customizeName: '',
  inputRef: null,
};

export default appInstance;
