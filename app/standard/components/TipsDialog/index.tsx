import * as React from 'react';
import { ButtonProps } from '../../../common/baseInterfaces';
import TipsDialogListener from './TipsDialogListener';
import { useStoreState } from '../../../common/reduxHooks';

let styles = require('./styles.scss');
let isSquare: boolean = window.innerWidth / window.innerHeight < 1.7;
if (isSquare) {
  styles = require('./stylesSquare.scss');
}

function mapState(store: any) {
  return {
    dialogTitle: store.appReducer.dialogTitle,
    dialogContent: store.appReducer.dialogContent
  };
}

export default function TipsDialog() {
  const events = new TipsDialogListener();
  const okButton: ButtonProps = events.bindOkButton();

  const {
    dialogTitle,
    dialogContent
  }: {
    dialogTitle: string,
    dialogContent: string;
  } = useStoreState(mapState);

  return (
    <div className={styles.tipsMask} {...okButton}>
      <div className={styles.tips}>
        <span className={styles.title}>{dialogTitle}</span>
        <div className={styles.content}>
          <span>{dialogContent}</span>
        </div>
      </div>
    </div>
  );
}
