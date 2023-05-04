import { sendRequest } from '../../common/methods';

const { store } = require('../../store/configureStore');

export default class NetService {

  test(): Promise<any> {
    let req: any = {};
    return sendRequest(req, 'test');
  }
}
