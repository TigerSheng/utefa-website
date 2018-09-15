import React from "react";
import {
  Route,
  Redirect,
}from 'react-router-dom';

export default ({ component: C, props: cProps, ...rest }) => (
  <Route {...rest} render={props => (
    rest.auth
      ? <C {...props} {...cProps} />
      : <Redirect to="/login" />
  )} />
)
