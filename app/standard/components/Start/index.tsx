import * as React from 'react';
import { StartBusinessConstructor, StartInterface } from './interfaces';
import { ReactNode } from 'react';
import { Input, Select, Button } from 'antd';
import { InputProps } from 'antd/lib/input';
import { SelectProps } from 'antd/lib/select';
import { ButtonProps } from 'antd/lib/button';

let styles = require('./styles.scss');
let isSquare: boolean = window.innerWidth / window.innerHeight < 1.7;
if (isSquare) {
  styles = require('./stylesSquare.scss');
}

const { Option } = Select;

interface Props {
  business: StartBusinessConstructor;
}

export default function Start(props: Props) {
  const events: StartInterface = new props.business();
  const progress: ReactNode = events.renderProgress();

  const serverIPInput: InputProps = events.renderServerIPInput();
  const serverPortInput: InputProps = events.renderServerPortInput();
  const serverPathInput: InputProps = events.renderServerPathInput();
  const terminalNoInput: InputProps = events.renderTerminalNoInput();
  const shopIdInput: InputProps = events.renderShopIdInput();

  const cashierNoInput: InputProps = events.renderCashierNoInput();
  const paymentSelect: SelectProps<string> = events.renderPaymentSelect();
  const transactionTypeSelect: SelectProps<string> = events.renderTransactionTypeSelect();
  const payAmountInput: InputProps = events.renderPayAmountInput();
  const transactionKeyInput: InputProps = events.renderTransactionKeyInput();

  const testButton: ButtonProps = events.renderTestButton();

  const paymentList = ['工商银行', '建设银行', '中国银行'];
  const transactionTypeList = ['支付', '撤销', '隔日退货'];

  return (
    <div className={styles.container}>
      {progress}
      <section className={styles.title}>
        <span>银行卡测试程序</span>
      </section>
      <section className={styles.main}>
        <section className={styles.table}>
          <div className={styles.row}>
            <span>IP</span>
            <Input className={styles.disabled} {...serverIPInput}/>
          </div>
          <div className={styles.row}>
            <span>端口</span>
            <Input className={styles.disabled} {...serverPortInput}/>
          </div>
          <div className={styles.row}>
            <span>路径</span>
            <Input className={styles.disabled} {...serverPathInput}/>
          </div>
          <div className={styles.row}>
            <span>终端号</span>
            <Input className={styles.disabled} {...terminalNoInput}/>
          </div>
          <div className={styles.row}>
            <span>门店号</span>
            <Input className={styles.disabled} {...shopIdInput}/>
          </div>
        </section>
        <section className={styles.table}>
          <div className={styles.row}>
            <span>收银员号</span>
            <Input {...cashierNoInput}/>
          </div>
          <div className={styles.row}>
            <span>支付方式</span>
            <Select {...paymentSelect}>
              {
                paymentList.map((itm, idx) => {
                  return (
                    <Option value={itm} key={idx}>{itm}</Option>
                  )
                })
              }
            </Select>
          </div>
          <div className={styles.row}>
            <span>交易类型</span>
            <Select {...transactionTypeSelect}>
              {
                transactionTypeList.map((itm, idx) => {
                  return (
                    <Option value={itm} key={idx}>{itm}</Option>
                  )
                })
              }
            </Select>
          </div>
          <div className={styles.row}>
            <span>支付金额</span>
            <Input {...payAmountInput}/>
          </div>
          <div className={styles.row}>
            <span>交易要素</span>
            <Input {...transactionKeyInput}/>
          </div>
        </section>
      </section>
      <section className={styles.footer}>
        <Button type='primary' {...testButton}>测试</Button>
      </section>
    </div>
  );
}
