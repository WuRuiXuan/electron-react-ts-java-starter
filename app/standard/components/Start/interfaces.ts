import { ReactNode } from 'react';
import { InputProps } from 'antd/lib/input';
import { SelectProps } from 'antd/lib/select';
import { ButtonProps } from 'antd/lib/button';


export interface StartInterface {
  renderProgress(): ReactNode;

  renderServerIPInput(): InputProps;

  renderServerPortInput(): InputProps;

  renderServerPathInput(): InputProps;

  renderTerminalNoInput(): InputProps;

  renderShopIdInput(): InputProps;

  renderCashierNoInput(): InputProps;

  renderPaymentSelect(): SelectProps<string>;

  renderTransactionTypeSelect(): SelectProps<string>;

  renderPayAmountInput(): InputProps;

  renderTransactionKeyInput(): InputProps;

  renderTestButton(): ButtonProps;
}

export interface StartBusinessConstructor {
  new(): StartInterface;
}
