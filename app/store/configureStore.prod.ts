import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createHashHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import createRootReducer from '../reducers';
import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage'; // LocalStorage 永久保存store
import storage from 'redux-persist/lib/storage/session'; // SessionStorage 临时保存store 结束进程后清空

const persistConfig = {
  key: 'root',
  storage
};

const history = createHashHistory();
const rootReducer = createRootReducer(history);
const router = routerMiddleware(history);
const enhancer = applyMiddleware(thunk, router);

function configureStore(initialState?: any) {
  const persistedReducer = persistReducer(persistConfig, rootReducer);
  const store = createStore(persistedReducer, initialState, enhancer);
  const persist = persistStore(store);

  return { store, persist };
}

const { store, persist } = configureStore();

export default { store, history, persist };
