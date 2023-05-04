import ActionTypes from '../enums/ActionTypes';
import DialogTypes from '../enums/DialogTypes';
import ConfirmDialogTypes from '../enums/ConfirmDialogTypes';
import { AppConfig } from '../common/baseInterfaces';
import KeypadModes from '../enums/KeypadModes';

interface StoreState {
  isShowLoading: boolean,
  loadingText: string,
  dialogType: DialogTypes,
  dialogTitle: string,
  dialogContent: string,
  dialogBusinessResult: number,
  confirmDialogType: ConfirmDialogTypes,
  confirmDialogChoice: number,
  appConfig: AppConfig,
  keypadMode: KeypadModes,
  positionStyle: Object
}

interface Action {
  type: ActionTypes,
  bool: boolean,
  text: string,
  num: number,
  appConfig: AppConfig,
  dialogType: DialogTypes,
  dialogTitle: string,
  dialogContent: string,
  dialogBusinessResult: number,
  confirmDialogType: ConfirmDialogTypes,
  confirmDialogChoice: number,
  keypadMode: KeypadModes,
  positionStyle: Object
}

const initialState = {
  isShowLoading: false,
  loadingText: 'Loading...',
  dialogType: DialogTypes.DISMISS,
  dialogTitle: '',
  dialogContent: '',
  dialogBusinessResult: -1,
  confirmDialogType: ConfirmDialogTypes.DISMISS,
  confirmDialogChoice: -1,
  appConfig: null,
  keypadMode: KeypadModes.HIDDEN,
  positionStyle: null
};

export default function appReducer(state: StoreState = initialState, action: Action) {
  switch (action.type) {

    case ActionTypes.SET_APP_CONFIG:
      return {
        ...state,
        appConfig: action.appConfig
      };

    case ActionTypes.SHOW_LOADING:
      return {
        ...state,
        isShowLoading: true,
        loadingText: action.text
      };

    case ActionTypes.DISMISS_LOADING:
      return {
        ...state,
        isShowLoading: false
      };

    case ActionTypes.SHOW_DIALOG:
      return {
        ...state,
        dialogType: action.dialogType,
        dialogTitle: action.dialogTitle,
        dialogContent: action.dialogContent,
        dialogBusinessResult: -1,
        confirmDialogType: ConfirmDialogTypes.DISMISS,
        confirmDialogChoice: -1
      };

    case ActionTypes.DISMISS_DIALOG:
      return {
        ...state,
        dialogType: action.dialogType,
        dialogBusinessResult: action.dialogBusinessResult,
        confirmDialogType: DialogTypes.DISMISS,
        confirmDialogChoice: -1
      };

    case ActionTypes.SHOW_CONFIRM_DIALOG:
      return {
        ...state,
        dialogType: DialogTypes.DISMISS,
        dialogTitle: action.dialogTitle,
        dialogContent: '',
        dialogBusinessResult: -1,
        confirmDialogType: action.confirmDialogType,
        confirmDialogChoice: -1
      };

    case ActionTypes.SET_CONFIRM_DIALOG_CHOICE:
      return {
        ...state,
        confirmDialogChoice: action.confirmDialogChoice
      };

    case ActionTypes.SHOW_KEYPAD:
      return {
        ...state,
        keypadMode: action.keypadMode,
        positionStyle: action.positionStyle
      };

    case ActionTypes.HIDE_KEYPAD:
      return {
        ...state,
        keypadMode: KeypadModes.HIDDEN
      };

    default:
      return state;
  }
}
