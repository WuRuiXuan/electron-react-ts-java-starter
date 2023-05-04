import { ButtonProps, InputProps } from '../../../common/baseInterfaces';
import { default as React, ReactNode, useEffect, useRef, useState } from 'react';
import KeypadPositions from '../../../enums/KeypadPositions';
import { useStoreState } from '../../../common/reduxHooks';
import DialogListener from '../../../common/DialogListener';

let styles = require('./styles.scss');
let isSquare: boolean = window.innerWidth / window.innerHeight < 1.7;
if (isSquare) {
  styles = require('./stylesSquare.scss');
}

function mapState(store: any) {
  return {
    dialogTitle: store.appReducer.dialogTitle
  };
}

export default class InputDialogListener extends DialogListener {

  protected inputValue: string;
  protected setInputValue;
  protected mainInput;

  constructor() {
    super();
    const [inputValue, setInputValue] = useState('');
    this.inputValue = inputValue;
    this.setInputValue = setInputValue;
    this.mainInput = useRef();

    const {
      dialogTitle
    }: {
      dialogTitle: string,
    } = useStoreState(mapState);

    useEffect(() => {
      this.setInputValue('');
      setTimeout(() => {
        this.mainInput.current.focus();
      }, 200);
    }, [dialogTitle]);
  }

  bindMainInput(): InputProps {
    return {
      value: this.inputValue,
      onChange: e => {
        this.setInputValue(this.checkInputValue(e.target.value));
      },
      ref: this.mainInput,
      onFocus: e => {
        setTimeout(() => {
          this.mainInput.current.onchange = (e) => {
            this.setInputValue(this.checkInputValue(e.target.value));
          };
          this.mainInput.current.onenter = (e) => {
            this.confirmEventHandle(this.mainInput.current.getAttribute('value'));
          };
          this.showNumberKeypad(this.mainInput, KeypadPositions.RIGHT_TOP);
        }, 500);
      },
      onClick: e => {
        if (this.isShowKeypad) {
          this.hideKeypad();
        } else {
          this.showNumberKeypad(this.mainInput, KeypadPositions.RIGHT_TOP);
        }
      }
    };
  }

  confirmEventHandle(inputText: string = '') {

  }

  renderConfirmButton(): ReactNode {
    const confirmButton = this.bindConfirmButton();
    return (
      <input className={this.inputValue ? styles.active : styles.confirmButton}
             type='button'
             value='确认' {...confirmButton}/>
    );
  }

  bindConfirmButton(): ButtonProps {
    return undefined;
  }
}
