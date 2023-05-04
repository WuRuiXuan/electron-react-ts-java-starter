import * as React from 'react';
import { ButtonProps, InputProps } from '../../../common/baseInterfaces';
import { useStoreState } from '../../../common/reduxHooks';
import { InputDialogBusinessConstructor, InputDialogInterface } from './interfaces';
import { ReactNode } from 'react';

let styles = require('./styles.scss');
let isSquare: boolean = window.innerWidth / window.innerHeight < 1.7;
if (isSquare) {
  styles = require('./stylesSquare.scss');
}

interface Props {
  business: InputDialogBusinessConstructor;
}

function mapState(store: any) {
  return {
    dialogTitle: store.appReducer.dialogTitle,
    dialogContent: store.appReducer.dialogContent
  };
}

export default function InputDialog(props: Props) {
  const events: InputDialogInterface = new props.business();
  const mainInput: InputProps = events.bindMainInput();
  const closeButton: ButtonProps = events.bindCloseButton();
  const cancelButton: ButtonProps = events.bindCancelButton();
  const confirmButton: ReactNode = events.renderConfirmButton();

  const {
    dialogTitle,
    dialogContent
  }: {
    dialogTitle: string,
    dialogContent: string,
  } = useStoreState(mapState);

  return (
    <div className={styles.dialog}>
      <div className={styles.title}>
        <span>{dialogTitle}</span>
        <img alt='' src={require('../../images/icon_close.png')} {...closeButton}/>
      </div>
      <span className={styles.inputTips}>{dialogContent}：</span>
      <div className={styles.inputWrap}>
        <input type='text' placeholder='' {...mainInput}/>
      </div>
      <div className={styles.buttonsWrap}>
        <input className={styles.cancelButton} type='button' value='取消' {...cancelButton}/>
        {confirmButton}
      </div>
    </div>
  );
}
