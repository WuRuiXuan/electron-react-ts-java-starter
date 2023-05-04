import { useDispatch, useStoreState } from './reduxHooks';
import appInstance from './appInstance';
import { MutableRefObject, useEffect, useState } from 'react';
import ConfirmDialogTypes from '../enums/ConfirmDialogTypes';
import appActions from '../actions/appActions';
import DialogTypes from '../enums/DialogTypes';
import KeypadPositions from '../enums/KeypadPositions';
import NetService from '../standard/service/NetService';
import KeypadModes from '../enums/KeypadModes';
import moment from 'moment';

const { history } = require('../store/configureStore');
const { ipcRenderer } = require('electron');

const keys = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
  'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
  'Enter', 'Escape', 'Tab', 'CapsLock', 'Shift', 'Control', 'Alt',
  'Delete', 'Insert', 'Home', 'End', 'PageUp', 'PageDown', 'NumLock',
  'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12',
  '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+',
  '`', '-', '=', '{', '}', '[', ']', '|', '/', ':', '"', ';',
  '<', '>', '?', ',', '.'
];

function mapState(store: any) {
  return {
    confirmDialogType: store.appReducer.confirmDialogType,
    confirmDialogChoice: store.appReducer.confirmDialogChoice,
    dialogType: store.appReducer.dialogType,
    dialogBusinessResult: store.appReducer.dialogBusinessResult,
    keypadMode: store.appReducer.keypadMode
  };
}

export default class DialogListener {
  protected dispatch;
  protected history;
  protected netService: NetService;
  protected keyFlag: symbol;
  protected setKeyFlag;
  protected className: string = Object.getPrototypeOf(this).constructor.name;
  protected isShowDialog: boolean;
  protected keyboardListeners: Array<any> = [];

  protected confirmDialogType: ConfirmDialogTypes;
  protected confirmDialogChoice: number;
  protected dialogType: DialogTypes;
  protected dialogBusinessResult: number;
  protected isShowKeypad: boolean;

  constructor() {
    this.dispatch = useDispatch();
    this.history = history;
    this.netService = appInstance.netService;

    useEffect(() => {
      this.componentDidMount();
      return this.componentWillUnmount.bind(this);
    }, [true]);

    useEffect(() => {
      this.addKeyboardListener();
      return this.removeKeyboardListener.bind(this);
    }, [true]);

    const [keyFlag, setKeyFlag] = useState(Symbol(''));
    this.keyFlag = keyFlag;
    this.setKeyFlag = setKeyFlag;

    useEffect(() => {
      let keyStr = keyFlag.toString();
      this.onKeyPressed(keyStr.substring(7, keyStr.length - 1));
    }, [keyFlag]);

    const {
      confirmDialogType,
      confirmDialogChoice,
      dialogType,
      dialogBusinessResult,
      keypadMode
    }: {
      confirmDialogType: ConfirmDialogTypes,
      confirmDialogChoice: number,
      dialogType: DialogTypes,
      dialogBusinessResult: number,
      keypadMode: KeypadModes
    } = useStoreState(mapState);

    this.confirmDialogType = confirmDialogType;
    this.confirmDialogChoice = confirmDialogChoice;
    this.dialogType = dialogType;
    this.dialogBusinessResult = dialogBusinessResult;
    this.isShowKeypad = keypadMode !== KeypadModes.HIDDEN;
    this.isShowDialog = (dialogType !== DialogTypes.DISMISS) || (confirmDialogType !== ConfirmDialogTypes.DISMISS);
  }

  componentDidMount() {

  }

  componentWillUnmount() {
    this.hideKeypad();
  }

  addKeyboardListener() {
    // console.log('add prev', tempListeners);
    // this.keyBoardListeners = [];
    keys.forEach((itm, idx) => {
      const func = (key: string) => {
        this.setKeyFlag(Symbol(key));
      };
      const listener = func.bind(this, itm);
      this.keyboardListeners.push(listener);
      // tempListeners.push(listener);
      ipcRenderer.on(itm, listener);
    });
    // console.log('add next', tempListeners);
  }

  removeKeyboardListener() {
    // console.log('remove prev', tempListeners);
    keys.forEach((itm, idx) => {
      ipcRenderer.removeListener(itm, this.keyboardListeners[idx]);
    });
    this.keyboardListeners = [];
    // tempListeners = tempListeners.filter((itm, idx) => {
    //   return appInstance.keyBoardListeners[this.className].indexOf(itm) === -1;
    // });
    // console.log('remove next', tempListeners);
  }

  onKeyPressed(key: string) {

  }

  showConfirmDialog(type: ConfirmDialogTypes, title: string) {
    console.log('>>>>>>' + this.className + ' showConfirmDialog');
    this.hideKeypad();
    this.dispatch(appActions.showConfirmDialog(type, title));
  }

  showDialog(type: DialogTypes, title: string = '', content: string = '') {
    console.log('>>>>>>' + this.className + ' showDialog');
    this.hideKeypad();
    this.dispatch(appActions.showDialog(type, title, content));
  }

  dismissDialog(isSuccess: boolean = undefined) {
    console.log('>>>>>>' + this.className + ' dismissDialog');
    if (isSuccess === undefined) {
      this.dispatch(appActions.dismissDialog());
    } else {
      this.dispatch(appActions.dismissDialog(this.dialogType, isSuccess));
    }
  }

  showNumberKeypad(ref: MutableRefObject<any>, position: KeypadPositions) {
    appInstance.inputRef = ref;
    let positionStyle = this.calculateStyle(ref, position);
    this.dispatch(appActions.showKeypad(KeypadModes.NUMBER, positionStyle));
  }

  showLetterKeypad(ref: MutableRefObject<any>, position: KeypadPositions) {
    appInstance.inputRef = ref;
    let positionStyle = this.calculateStyle(ref, position);
    this.dispatch(appActions.showKeypad(KeypadModes.UPPER_LETTER, positionStyle));
  }

  calculateStyle(ref: MutableRefObject<any>, position: KeypadPositions): Object {
    let positionStyle = null;
    let left = ref.current.getBoundingClientRect().right + 64 * window.innerHeight / 1920 + 'px';
    let right = window.innerWidth - ref.current.getBoundingClientRect().left + 64 * window.innerHeight / 1920 + 'px';
    if (position === KeypadPositions.RIGHT_TOP) {
      positionStyle = {
        left,
        top: ref.current.getBoundingClientRect().top + 'px'
      };
    } else if (position === KeypadPositions.RIGHT_MIDDLE) {
      positionStyle = {
        left,
        top: ref.current.getBoundingClientRect().top - ref.current.offsetHeight + 'px'
      };
    } else if (position === KeypadPositions.RIGHT_BOTTOM) {
      positionStyle = {
        left,
        top: ref.current.getBoundingClientRect().top - 500 * window.innerHeight / 1920 + 'px'
      };
    } else if (position === KeypadPositions.LEFT_TOP) {
      positionStyle = {
        right,
        top: ref.current.getBoundingClientRect().top + 'px'
      };
    } else if (position === KeypadPositions.LEFT_MIDDLE) {
      positionStyle = {
        right,
        top: ref.current.getBoundingClientRect().top - ref.current.offsetHeight + 'px'
      };
    } else if (position === KeypadPositions.LEFT_BOTTOM) {
      positionStyle = {
        right,
        top: ref.current.getBoundingClientRect().top - 500 * window.innerHeight / 1920 + 'px'
      };
    } else if (position === KeypadPositions.BOTTOM) {
      positionStyle = {
        left: ref.current.getBoundingClientRect().left + 'px',
        top: ref.current.getBoundingClientRect().bottom + ref.current.offsetHeight / 4 + 'px'
      };
    } else if (position === KeypadPositions.TOP) {
      positionStyle = {
        left: ref.current.getBoundingClientRect().left + 'px',
        top: ref.current.getBoundingClientRect().top - ref.current.offsetHeight * 6 + 'px'
      };
    }
    return positionStyle;
  }

  hideKeypad() {
    this.dispatch(appActions.hideKeypad());
  }

  checkInputValue(value: string) {
    // 超过小数点后两位自动清空前面的数字
    if (value.indexOf('.') > -1 && value.split('.')[1].length > 2) {
      return value.substring(value.length - 1);
    }
    //先把非数字的都替换掉，除了数字和.
    value = value.replace(/[^\d.]/g, '');
    //必须保证第一个为数字而不是.
    value = value.replace(/^\./g, '');
    //保证只有出现一个.而没有多个.
    value = value.replace(/\.{2,}/g, '.');
    //保证.只出现一次，而不能出现两次以上
    value = value.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.');
    //只能输入两个小数
    value = value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
    return value;
  }

  checkDateString(dateString: string): boolean {
    return moment(dateString).isBefore(moment());
  }
}
