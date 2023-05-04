import ActionTypes from '../enums/ActionTypes';
import DialogTypes from '../enums/DialogTypes';
import ConfirmDialogTypes from '../enums/ConfirmDialogTypes';
import KeypadModes from '../enums/KeypadModes';
import { AppConfig } from '../common/baseInterfaces';

export default {

  setAppConfig(appConfig: AppConfig) {
    return {
      type: ActionTypes.SET_APP_CONFIG,
      appConfig
    };
  },

  showLoading(text: string) {
    return {
      type: ActionTypes.SHOW_LOADING,
      text
    };
  },

  dismissLoading() {
    return {
      type: ActionTypes.DISMISS_LOADING
    };
  },

  showDialog(dialogType: DialogTypes, dialogTitle: string, dialogContent: string) {
    return {
      type: ActionTypes.SHOW_DIALOG,
      dialogType,
      dialogTitle,
      dialogContent
    };
  },

  dismissDialog(dialogType: DialogTypes = DialogTypes.DISMISS, isSuccess: boolean = undefined) {
    return {
      type: ActionTypes.DISMISS_DIALOG,
      dialogType,
      dialogBusinessResult: isSuccess === undefined ? -1 : Number(isSuccess)
    };
  },

  showConfirmDialog(confirmDialogType: ConfirmDialogTypes, dialogTitle: string) {
    return {
      type: ActionTypes.SHOW_CONFIRM_DIALOG,
      confirmDialogType,
      dialogTitle
    };
  },

  setConfirmDialogChoice(confirmDialogChoice: number) {
    return {
      type: ActionTypes.SET_CONFIRM_DIALOG_CHOICE,
      confirmDialogChoice
    };
  },

  clearStore() {
    return {
      type: ActionTypes.CLEAR_STORE
    };
  },

  showKeypad(keypadMode: KeypadModes, positionStyle: Object) {
    return {
      type: ActionTypes.SHOW_KEYPAD,
      keypadMode,
      positionStyle
    };
  },

  hideKeypad() {
    return {
      type: ActionTypes.HIDE_KEYPAD
    };
  },
};
