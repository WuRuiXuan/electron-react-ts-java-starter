import * as React from 'react';
import { ButtonProps, InputProps } from '../../../common/baseInterfaces';
import ConfirmDialogListener from './ConfirmDialogListener';
import { useStoreState } from '../../../common/reduxHooks';
import ConfirmDialogTypes from '../../../enums/ConfirmDialogTypes';

let styles = require('./styles.scss');
let isSquare: boolean = window.innerWidth / window.innerHeight < 1.7;
if (isSquare) {
  styles = require('./stylesSquare.scss');
}

function mapState(store: any) {
  return {
    dialogTitle: store.appReducer.dialogTitle,
    confirmDialogType: store.appReducer.confirmDialogType
  };
}

export default function ConfirmDialog() {
  const events = new ConfirmDialogListener();
  const okButton: ButtonProps = events.bindOkButton();
  const refuseButton: ButtonProps = events.bindRefuseButton();

  const {
    dialogTitle,
    confirmDialogType
  }: {
    dialogTitle: string,
    confirmDialogType: ConfirmDialogTypes
  } = useStoreState(mapState);

  return (
    <div className={styles.confirm}>
      <div className={styles.title}>
        <span>{dialogTitle}</span>
      </div>
      <div className={styles.buttonsWrap}>
        <input className={styles.refuseButton} type='button' value='取消' {...refuseButton}/>
        <input className={styles.okButton} type='button' value='确认' {...okButton}/>
      </div>
    </div>
  );
}
