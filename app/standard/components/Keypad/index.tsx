import * as React from 'react';
import { Button } from 'antd';
import { ButtonProps } from '../../../common/baseInterfaces';
import KeypadListener from './KeypadListener';
import { useStoreState } from '../../../common/reduxHooks';
import { ReactNodeArray } from 'react';

let styles = require('./styles.scss');
let isSquare: boolean = window.innerWidth / window.innerHeight < 1.7;
if (isSquare) {
  styles = require('./stylesSquare.scss');
}

function mapState(store: any) {
  return {
    positionStyle: store.appReducer.positionStyle
  };
}

export default function Keypad() {
  const events = new KeypadListener();
  const commonKeys = ['清空', '后退', '确定'];
  const keys: ReactNodeArray = events.renderKeys();
  const { positionStyle }: { positionStyle: Object } = useStoreState(mapState);

  return (
    <div
      className={styles.keypad}
      style={positionStyle}>
      <div className={styles.left}>
        {keys}
      </div>
      <div className={styles.right}>
        {
          commonKeys.map((itm, idx) => {
            const keypadItem: ButtonProps = events.bindKeypadItem(itm, idx);
            return <Button key={itm} {...keypadItem}>{itm}</Button>;
          })
        }
      </div>
    </div>
  );
}
