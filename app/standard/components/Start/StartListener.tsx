import BaseListener from '../../../common/BaseListener';
import { default as React, ReactNode, useState } from 'react';
import { Progress } from 'antd';
import { AppConfig } from '../../../common/baseInterfaces';
import { InputProps } from 'antd/lib/input';
import { useStoreState } from '../../../common/reduxHooks';
import { SelectProps } from 'antd/lib/select';
import { ButtonProps } from 'antd/lib/button';

let styles = require('./styles.scss');
let isSquare: boolean = window.innerWidth / window.innerHeight < 1.7;
if (isSquare) {
  styles = require('./stylesSquare.scss');
}

function mapState(store: any) {
  return {
    appConfig: store.appReducer.appConfig
  };
}

export default class StartListener extends BaseListener {

  protected progress: number;
  protected setProgress;
  protected loadingText: string;
  protected setLoadingText;
  protected progressStatus: any; // "normal", "exception", "active", "success"
  protected setProgressStatus;
  protected appConfig: AppConfig;

  protected cashierNo: string;
  protected paymentCode: string;
  protected transactionType: string;
  protected payAmount: string;
  protected transactionKey: string;
  protected setCashierNo;
  protected setPaymentCode;
  protected setTransactionType;
  protected setPayAmount;
  protected setTransactionKey;

  constructor() {
    super();

    const [progress, setProgress] = useState(0);
    const [loadingText, setLoadingText] = useState('');
    const [progressStatus, setProgressStatus] = useState('normal');

    this.progress = progress;
    this.setProgress = setProgress;
    this.loadingText = loadingText;
    this.setLoadingText = setLoadingText;
    this.progressStatus = progressStatus;
    this.setProgressStatus = setProgressStatus;

    const {
      appConfig
    }: {
      appConfig: AppConfig
    } = useStoreState(mapState);
    this.appConfig = appConfig;

    const [cashierNo, setCashierNo] = useState('');
    const [paymentCode, setPaymentCode] = useState('');
    const [transactionType, setTransactionType] = useState('');
    const [payAmount, setPayAmount] = useState('');
    const [transactionKey, setTransactionKey] = useState('');
    this.cashierNo = cashierNo;
    this.paymentCode = paymentCode;
    this.transactionType = transactionType;
    this.payAmount = payAmount;
    this.transactionKey = transactionKey;
    this.setCashierNo = setCashierNo;
    this.setPaymentCode = setPaymentCode;
    this.setTransactionType = setTransactionType;
    this.setPayAmount = setPayAmount;
    this.setTransactionKey = setTransactionKey;
  }

  renderProgress(): ReactNode {
    return (
      <div id='progressMask'>
        <Progress type="circle" percent={this.progress} status={this.progressStatus}/>
        <span className={styles.loadingText}>{this.loadingText}</span>
      </div>
    );
  }

  showProgress() {
    document.getElementById('progressMask').style.visibility = 'visible';
  }

  dismissProgress() {
    document.getElementById('progressMask').style.visibility = 'hidden';
  }

  updateProgress(progress: number) {
    this.setProgress(progress);
  }

  updateProgressStatus(status: string) {
    this.setProgressStatus(status);
    if (status === 'active') {
      this.setLoadingText('正在下载最新版本，请稍后...');
    } else if (status === 'exception') {
      this.setLoadingText('更新错误');
    } else if (status === 'success') {
      this.setLoadingText('更新成功');
    } else if (this.progress === 100) {
      this.setLoadingText('最新版本已经下载完成，正在重启程序，请稍后...');
    }
  }

  renderServerIPInput(): InputProps {
    return {
      value: this.appConfig ? this.appConfig.ServerIP : '',
      contentEditable: false,
    }
  }

  renderServerPortInput(): InputProps {
    return {
      value: this.appConfig ? this.appConfig.ServerPort : '',
      contentEditable: false
    }
  }

  renderServerPathInput(): InputProps {
    return {
      value: this.appConfig ? this.appConfig.ServerPath : '',
      contentEditable: false
    }
  }

  renderTerminalNoInput(): InputProps {
    return {
      value: this.appConfig ? this.appConfig.TerminalNo : '',
      contentEditable: false
    }
  }

  renderShopIdInput(): InputProps {
    return {
      value: this.appConfig ? this.appConfig.ShopId : '',
      contentEditable: false
    }
  }

  renderCashierNoInput(): InputProps {
    return {
      value: this.cashierNo,
      onChange: event => {
        this.setCashierNo(event.target.value);
      }
    }
  }

  renderPaymentSelect(): SelectProps<string> {
    return {
      value: this.paymentCode,
      onChange: val => {
        this.setPaymentCode(val);
      },
    }
  }

  renderTransactionTypeSelect(): SelectProps<string> {
    return {
      value: this.transactionType,
      onChange: val => {
        this.setTransactionType(val);
      },
    }
  }

  renderPayAmountInput(): InputProps {
    return {
      value: this.payAmount,
      onChange: event => {
        this.setPayAmount(event.target.value);
      }
    }
  }

  renderTransactionKeyInput(): InputProps {
    return {
      value: this.transactionKey,
      onChange: event => {
        this.setTransactionKey(event.target.value);
      }
    }
  }

  renderTestButton(): ButtonProps {
    return {
      onClick: event => {

      }
    }
  }
}
