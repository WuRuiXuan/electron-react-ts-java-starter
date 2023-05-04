import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createHashHistory } from 'history';
import { routerMiddleware, routerActions } from 'connected-react-router';
import { createLogger } from 'redux-logger';
import createRootReducer from '../reducers';
import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage'; // LocalStorage 永久保存store
import storage from 'redux-persist/lib/storage/session'; // SessionStorage 临时保存store 结束进程后清空

const history = createHashHistory();

const rootReducer = createRootReducer(history);

const persistConfig = {
  key: 'root',
  storage
};

const configureStore = (initialState?: any) => {
  // Redux Configuration
  const middleware = [];
  const enhancers = [];

  // Thunk Middleware
  middleware.push(thunk);

  // Logging Middleware
  const logger = createLogger({
    level: 'info',
    collapsed: true
  });

  // Skip redux logs in console during the tests
  if (process.env.NODE_ENV !== 'test') {
    middleware.push(logger);
  }

  // Router Middleware
  const router = routerMiddleware(history);
  middleware.push(router);

  // Redux DevTools Configuration
  const actionCreators = {
    ...routerActions
  };
  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Options: http://extension.remotedev.io/docs/API/Arguments.html
      actionCreators
    })
    : compose;
  /* eslint-enable no-underscore-dangle */

  // Apply Middleware & Compose Enhancers
  enhancers.push(applyMiddleware(...middleware));
  const enhancer = composeEnhancers(...enhancers);

  const persistedReducer = persistReducer(persistConfig, rootReducer);

  // Create Store
  const store = createStore(persistedReducer, initialState, enhancer);

  if ((module as any).hot) {
    (module as any).hot.accept('../reducers', () => {
      // This fetch the new state of the above reducers.
      const nextRootReducer = require('../reducers').default;
      store.replaceReducer(
        persistReducer(persistConfig, nextRootReducer)
      );
    });
  }

  const persist = persistStore(store);

  return { store, persist };
};

const { store, persist } = configureStore();

export default { store, history, persist };
