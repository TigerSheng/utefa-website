import React from 'react';
import {Route, Switch} from 'react-router-dom';
import {Homepage} from './components/home/Homepage';
import Login from './components/login/Login';
import NotFound from './components/NotFound';

export default () =>
  <Switch>
    <Route path='/' exact component={Homepage} />
    <Route path='/login' exact component={Login} />
    <Route component={NotFound} />
  </Switch>;
