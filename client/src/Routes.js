import React from 'react';
import {
  Route,
  Switch
} from 'react-router-dom';
import AppliedRoute from './components/AppliedRoute'
import PrivateRoute from './components/PrivateRoute'
import {Homepage} from './components/home/Homepage';
import Login from './components/login/Login';
import NotFound from './components/NotFound';
import Forgotpassword from './components/forgotpassword/Forgotpassword';
import Dashboard from './components/dashboard/Dashboard';
import Post from './components/dashboard/Post';
import Vote from './components/dashboard/Vote';

export default ({childProps, auth}) =>
  <Switch>
    <AppliedRoute path='/' exact component={Homepage} props={childProps} />
    <AppliedRoute path='/login' exact component={Login} props={childProps} />
    <AppliedRoute path='/forgot-password' exact component={Forgotpassword}
    props={childProps} />
    <PrivateRoute path='/dashboard' exact component={Dashboard}
    props={childProps} auth={auth}/>
    <PrivateRoute path='/post' exact component={Post}
    props={childProps} auth={auth}/>
    <PrivateRoute path='/vote' exact component={Vote}
    props={childProps} auth={auth}/>
    <Route component={NotFound} />
  </Switch>;
