import { useState, useRef, useEffect, useReducer } from 'react';

/**
 * @description 强制重渲染
 */
export const useForceUpdate = () => {
  const [, forceUpdate] = useReducer(s => s + 1, 0);
  return forceUpdate;
};

/**
 * @description 针对多层嵌套的 state 合并更新可用
 * @param defaultState 默认一层及以上的对象
 */
export const useLegacyState = <T, >(defaultState: T) => {
  let [state, setState] = useState(defaultState);

  const setLegacyState = (nextState: Partial<T>) => {
    let newState = { ...state, ...nextState };
    setState(newState);
  };

  return [state, setLegacyState];
};

/**
 * @description 只在更新时运行的 effect
 * @param callback 执行的函数
 */
export const useOnlyUpdateEffect = (callback: () => void) => {
  let isUpdateRef = useRef(false);

  useEffect(() => {
    if (isUpdateRef.current) {
      callback && callback();
    }
    if (!isUpdateRef.current) {
      isUpdateRef.current = true;
    }
  });
};

/**
 * @description 获取上一轮的 props 或 state
 * @param value
 */
export const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};
