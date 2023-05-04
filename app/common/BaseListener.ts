import { useEffect } from 'react';
import DialogListener from './DialogListener';
import ConfirmDialogTypes from '../enums/ConfirmDialogTypes';
import DialogTypes from '../enums/DialogTypes';

export default class BaseListener extends DialogListener {

  constructor() {
    super();
    // const prevConfirmDialogChoice = usePrevious(this.confirmDialogChoice);
    // const prevDialogBusinessResult = usePrevious(this.dialogBusinessResult);

    useEffect(() => {
      // if (prevConfirmDialogChoice !== undefined && confirmDialogChoice >= 0) {
      //   this.dismissDialog();
      //   this.onDialogMakeChoice(confirmDialogType, Boolean(confirmDialogChoice));
      // }
      if (this.confirmDialogChoice >= 0) {
        this.dismissDialog();
        this.onDialogMakeChoice(this.confirmDialogType, Boolean(this.confirmDialogChoice));
      }
    }, [this.confirmDialogChoice]);

    useEffect(() => {
      // if (prevDialogBusinessResult !== undefined && dialogBusinessResult >= 0) {
      //   this.dismissDialog();
      //   this.onDialogFinishBusiness(dialogType, Boolean(dialogBusinessResult));
      // }
      if (this.dialogBusinessResult >= 0) {
        this.dismissDialog();
        this.onDialogFinishBusiness(this.dialogType, Boolean(this.dialogBusinessResult));
      }
    }, [this.dialogBusinessResult]);
  }

  onDialogMakeChoice(type: ConfirmDialogTypes, choice: boolean) {

  }

  onDialogFinishBusiness(type: DialogTypes, isSuccess: boolean) {

  }
}
