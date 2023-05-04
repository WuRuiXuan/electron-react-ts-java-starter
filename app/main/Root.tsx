import * as React from 'react';
import Routes from './Routes';
import { Provider } from '../common/reduxHooks';
import { Router } from 'react-router';
import { hot } from 'react-hot-loader';
import { PersistGate } from 'redux-persist/integration/react';

const { store, history, persist } = require('../store/configureStore');

function Root() {
  return (
    <Provider value={store}>
      <PersistGate loading={null} persistor={persist}>
        <Router history={history}>
          <Routes/>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default hot(module)(Root);
