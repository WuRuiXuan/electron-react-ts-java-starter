import { ButtonProps } from '../../../common/baseInterfaces';
import DialogListener from '../../../common/DialogListener';

export default class TipsDialogListener extends DialogListener {

  constructor() {
    super();
  }

  bindOkButton(): ButtonProps {
    return {
      onClick: e => {
        this.dismissDialog();
      }
    };
  }

  onKeyPressed(key: string) {
    if (key === 'Enter' || key === 'Escape') {
      this.bindOkButton().onClick(null);
    }
  }
}
