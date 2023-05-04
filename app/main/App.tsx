import * as React from 'react';
import { useStoreState } from '../common/reduxHooks';
import DialogTypes from '../enums/DialogTypes';
import ConfirmDialog from '../standard/components/ConfirmDialog';
import TipsDialog from '../standard/components/TipsDialog';
import ConfirmDialogTypes from '../enums/ConfirmDialogTypes';
import { Modal, Spin } from 'antd';
import Keypad from '../standard/components/Keypad';
import KeypadModes from '../enums/KeypadModes';

interface Props {
  children: any;
}

function mapState(store: any) {
  return {
    loadingText: store.appReducer.loadingText,
    dialogType: store.appReducer.dialogType,
    confirmDialogType: store.appReducer.confirmDialogType,
    keypadMode: store.appReducer.keypadMode
  };
}

export default function App(props: Props) {

  const { children } = props;
  const {
    loadingText,
    dialogType,
    confirmDialogType,
    keypadMode
  }: {
    loadingText: string,
    dialogType: DialogTypes,
    confirmDialogType: ConfirmDialogTypes,
    keypadMode: KeypadModes
  } = useStoreState(mapState);

  return (
    <React.Fragment>
      {children}
      {renderLoadingMask(loadingText)}
      {renderDialog(dialogType)}
      {renderConfirmDialog(confirmDialogType)}
      {renderKeypad(keypadMode)}
    </React.Fragment>
  );
}

const renderLoadingMask = (loadingText) => {
  return (
    <div id='mask'>
      <Spin tip={loadingText} size='large'/>
    </div>
  );
};

const renderDialog = (dialogType: DialogTypes) => {
  return (
    <Modal
      visible={dialogType !== DialogTypes.DISMISS}
      title={null}
      footer={null}
      closable={false}
      centered={true}
      maskClosable={false}
      width={window.innerWidth}
    >
      {
        (() => {
          switch (dialogType) {
            case DialogTypes.SHOW_TIPS:
              return <TipsDialog/>;
            default:
              return null;
          }
        })()
      }
    </Modal>
  );
};

const renderConfirmDialog = (confirmDialogType: ConfirmDialogTypes) => {
  return (
    <Modal
      visible={confirmDialogType !== ConfirmDialogTypes.DISMISS}
      title={null}
      footer={null}
      closable={false}
      centered={true}
      maskClosable={false}
      width={window.innerWidth}
    >
      {confirmDialogType !== ConfirmDialogTypes.DISMISS && <ConfirmDialog/>}
    </Modal>
  );
};

const renderKeypad = (keypadMode: KeypadModes) => {
  return keypadMode !== KeypadModes.HIDDEN && (
    <Keypad/>
  );
};
