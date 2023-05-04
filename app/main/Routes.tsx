import * as React from 'react';
import { Route, Switch } from 'react-router';
import RoutePaths from '../enums/RoutePaths';
import NetService from '../standard/service/NetService';
import appInstance from '../common/appInstance';
import App from './App';
import Start from '../standard/components/Start';
import StartBusiness from '../standard/business/StartBusiness';

const customize = (() => {
  appInstance.netService = new NetService();

  return {
    start: () => <Start business={StartBusiness}/>
  };
})();

export default () => (
  <App>
    <Switch>
      <Route path={RoutePaths.START} exact component={customize.start}/>
    </Switch>
  </App>
);
