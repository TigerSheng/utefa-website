import React from 'react';
import {Route, Switch} from 'react-router-dom';
import AppliedRoute from './components/AppliedRoute'
import {Homepage} from './components/home/Homepage';
import Login from './components/login/Login';
import NotFound from './components/NotFound';

export default ({childProps}) =>
  <Switch>
    <AppliedRoute path='/' exact component={Homepage} props={childProps} />
    <AppliedRoute path='/login' exact component={Login} props={childProps} />
    <Route component={NotFound} />
  </Switch>;
