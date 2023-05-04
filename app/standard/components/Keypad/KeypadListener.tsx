import { ButtonProps } from '../../../common/baseInterfaces';
import { MutableRefObject, default as React, ReactNodeArray, useState, useEffect } from 'react';
import appInstance from '../../../common/appInstance';
import appActions from '../../../actions/appActions';
import { Button, Tooltip } from 'antd';
import KeypadModes from '../../../enums/KeypadModes';
import { useStoreState } from '../../../common/reduxHooks';
import DialogListener from '../../../common/DialogListener';

const numberKeys = ['7', '8', '9', '4', '5', '6', '1', '2', '3', 'ABC', '0', '.'];
const upperLetterKeys = ['ABC', 'DEF', 'GHI', 'JKL', 'MNO', 'PQR', 'STU', 'VWX', 'YZ', '123', '@.', '小写'];
const lowerLetterKeys = ['abc', 'def', 'ghi', 'jkl', 'mno', 'pqr', 'stu', 'vwx', 'yz', '123', '@.', '大写'];

let chooseTimer = null;

function mapState(store: any) {
  return {
    keypadMode: store.appReducer.keypadMode
  };
}

export default class KeypadListener extends DialogListener {

  protected mode: KeypadModes;
  protected setMode;
  protected chooseIndex: number;
  protected setChooseIndex;
  protected visibleIndex: number;
  protected setVisibleIndex;

  constructor() {
    super();

    const {
      keypadMode
    }: {
      keypadMode: KeypadModes
    } = useStoreState(mapState);

    useEffect(() => {
      this.setMode(keypadMode);
    }, [keypadMode]);

    const [mode, setMode] = useState(KeypadModes.NUMBER);
    this.mode = mode;
    this.setMode = setMode;
    const [chooseIndex, setChooseIndex] = useState(0);
    this.chooseIndex = chooseIndex;
    this.setChooseIndex = setChooseIndex;
    const [visibleIndex, setVisibleIndex] = useState(-1);
    this.visibleIndex = visibleIndex;
    this.setVisibleIndex = setVisibleIndex;
  }

  componentDidMount() {
    super.componentDidMount();
  }

  componentWillUnmount() {
    super.componentWillUnmount();
    clearTimeout(chooseTimer);
    chooseTimer = null;
  }

  bindKeypadItem(keyValue: string, index: number): ButtonProps {
    return {
      onClick: e => {
        e.persist();
        if (keyValue === 'ABC' && this.mode === KeypadModes.NUMBER) {
          this.setMode(KeypadModes.UPPER_LETTER);
          return;
        } else if (keyValue === '123') {
          this.setMode(KeypadModes.NUMBER);
          return;
        } else if (keyValue === '大写') {
          this.setMode(KeypadModes.UPPER_LETTER);
          return;
        } else if (keyValue === '小写') {
          this.setMode(KeypadModes.LOWER_LETTER);
          return;
        }

        if (this.mode === KeypadModes.NUMBER
          || keyValue === '清空'
          || keyValue === '后退'
          || keyValue === '确定') {
          this.inputKeyValue(e, keyValue);
          return;
        }

        this.setVisibleIndex(index);
        if (chooseTimer) {
          clearTimeout(chooseTimer);
          chooseTimer = null;
          let start = this.chooseIndex + 1 === keyValue.length ? 0 : this.chooseIndex + 1;
          chooseTimer = setTimeout(() => {
            this.inputKeyValue(e, keyValue.substring(start, start + 1));
          }, 700);

          if (this.chooseIndex + 1 === keyValue.length) {
            this.setChooseIndex(0);
          } else {
            this.setChooseIndex((prevValue) => {
              return prevValue + 1;
            });
          }
        } else {
          chooseTimer = setTimeout(() => {
            this.inputKeyValue(e, keyValue.substring(this.chooseIndex, this.chooseIndex + 1));
          }, 700);
        }
      }
    };
  }

  inputKeyValue(e: any, value: string) {
    clearTimeout(chooseTimer);
    chooseTimer = null;
    this.setVisibleIndex(-1);
    this.setChooseIndex(0);
    let inputRef: MutableRefObject<any> = appInstance.inputRef;
    if (value === '清空') {
      e.target.value = '';
      inputRef.current.onchange && inputRef.current.onchange(e);
    } else if (value === '后退') {
      let prevValue = inputRef.current.value;
      e.target.value = prevValue.length ? prevValue.substring(0, prevValue.length - 1) : prevValue;
      inputRef.current.onchange && inputRef.current.onchange(e);
    } else if (value === '确定') {
      this.dispatch(appActions.hideKeypad());
      inputRef.current.onenter && inputRef.current.onenter(e);
    } else {
      let prevValue = inputRef.current.value;
      e.target.value = prevValue + value;
      inputRef.current.onchange && inputRef.current.onchange(e);
    }
  }

  renderKeys(): ReactNodeArray {
    let keys = [];
    if (this.mode === KeypadModes.NUMBER) {
      keys = numberKeys;
    } else if (this.mode === KeypadModes.UPPER_LETTER) {
      keys = upperLetterKeys;
    } else if (this.mode === KeypadModes.LOWER_LETTER) {
      keys = lowerLetterKeys;
    }

    return keys.map((itm, idx) => {
      const keypadItem: ButtonProps = this.bindKeypadItem(itm, idx);
      const title = this.mode === KeypadModes.NUMBER ? itm : itm.substring(this.chooseIndex, this.chooseIndex + 1);
      const visible: boolean = this.visibleIndex === idx;

      return (itm === 'ABC' && this.mode === KeypadModes.NUMBER) ||
      (itm === '123' && this.mode === KeypadModes.UPPER_LETTER) || !visible ? (
        <Button key={itm} {...keypadItem}>{itm}</Button>
      ) : (
        <Tooltip key={itm} title={title} trigger="click" visible={visible}>
          <Button key={itm} {...keypadItem}>{itm}</Button>
        </Tooltip>
      );
    });
  }
}
