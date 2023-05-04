import * as React from 'react';
import { SelectInputProps } from '../../../common/baseInterfaces';
import { forwardRef, useEffect, useState } from 'react';
import './styles.scss';
import { useDispatch } from '../../../common/reduxHooks';
import appActions from '../../../actions/appActions';

const SelectInput = forwardRef((props: SelectInputProps, ref: any) => {
  const [dataList, setDataList] = useState([]);
  const [showDataList, setShowDataList] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    let value = props.value;
    if (value) {
      let regExp = new RegExp(value, 'i');
      let resultData = props.dataList.filter((itm, idx) => {
        return regExp.test(itm);
      });
      if (resultData.length > 20) {
        resultData = resultData.slice(0, 20);
      }
      setDataList(resultData);
    } else {
      setDataList([]);
    }
  }, [props.value]);

  useEffect(() => {
    setTimeout(() => {
      let ele: HTMLElement = ref.current.parentElement.lastElementChild as HTMLElement;
      ele.style.top = ref.current.getBoundingClientRect().height + 8 + 'px';
      setShowDataList(false);
    }, 200);
  }, [true]);

  return (
    <div className='selectInput'>
      <input
        value={props.value}
        onChange={props.onChange}
        onFocus={(e) => {
          setShowDataList(true);
          props.onFocus(e);
        }}
        onBlur={props.onBlur}
        onClick={props.onClick}
        ref={ref}
        disabled={props.disabled}/>
      <section className='selectContent'>
        {
          showDataList && dataList.map((itm, idx) => {
            const handleOnClick = (e: any) => {
              dispatch(appActions.hideKeypad());
              setShowDataList(false);
              e.target.value = itm;
              props.onSelect ? props.onSelect(e, props.dataList.indexOf(itm)) : props.onChange(e);
            };

            return (
              <p
                className='selectItem'
                key={itm + idx}
                onClick={handleOnClick}
              >{itm}</p>
            );
          })
        }
      </section>
    </div>
  );
});

export default SelectInput;
