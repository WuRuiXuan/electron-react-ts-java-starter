import { createContext, useContext, useEffect, useRef, useState } from 'react';

const shallowEqual = require('shallowequal');

export const context = createContext(null);
export const Provider = context.Provider;

export function useDispatch() {
  const store = useContext(context);
  return store.dispatch;
}

interface MapState {
  (store: any): any,
}

export function useStoreState(mapState: MapState) {
  const store = useContext(context);

  const mapStateFn = () => mapState(store.getState());

  const [mappedState, setMappedState] = useState(() => mapStateFn());

  const [prevStore, setPrevStore] = useState(store);
  const [prevMapState, setPrevMapState] = useState(() => mapState);
  if (prevStore !== store || prevMapState !== mapState) {
    setPrevStore(store);
    setPrevMapState(() => mapState);
    setMappedState(mapStateFn());
  }

  const lastRenderedMappedState = useRef();
  useEffect(() => {
    lastRenderedMappedState.current = mappedState;
  });

  useEffect(
    () => {
      const checkForUpdates = () => {
        const newMappedState = mapStateFn();
        if (!shallowEqual(newMappedState, lastRenderedMappedState.current)) {
          setMappedState(newMappedState);
        }
      };

      checkForUpdates();

      const unsubscribe = store.subscribe(checkForUpdates);

      return unsubscribe;
    },
    [store, mapState]
  );
  return mappedState;
}
