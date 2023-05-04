import { ButtonProps, InputProps } from '../../../common/baseInterfaces';
import { ReactNode } from 'react';

export interface InputDialogInterface {

  bindMainInput(): InputProps;

  bindCloseButton(): ButtonProps;

  bindCancelButton(): ButtonProps;

  bindConfirmButton(): ButtonProps;

  renderConfirmButton(): ReactNode;
}

export interface InputDialogBusinessConstructor {
  new(): InputDialogInterface;
}
