import { ButtonProps, InputProps } from '../../../common/baseInterfaces';
import appActions from '../../../actions/appActions';
import { useState } from 'react';
import ConfirmDialogTypes from '../../../enums/ConfirmDialogTypes';
import DialogListener from '../../../common/DialogListener';

export default class ConfirmDialogListener extends DialogListener {

  constructor() {
    super();
  }

  //取消
  bindRefuseButton(): ButtonProps {
    return {
      onClick: async e => {
        this.dispatch(appActions.setConfirmDialogChoice(0));
      }
    };
  }

  //确定
  bindOkButton(): ButtonProps {
    return {
      onClick: async e => {
        this.dispatch(appActions.setConfirmDialogChoice(1));
      }
    };
  }

  onKeyPressed(key: string) {
    console.log(this.className, key);
    if (key === 'Enter') {
      this.bindOkButton().onClick(null);
    } else if (key === 'Escape') {
      this.bindRefuseButton().onClick(null);
    }
  }
}
