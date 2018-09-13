import React, { Component } from 'react';
import {Auth} from 'aws-amplify';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout = async (event) => {
    await Auth.signOut();
    this.props.userHasAuthenticated(false);
  }

  render(){
    return(
      <div>
        <a href='/' onClick={this.handleLogout}>Log Out</a>
      </div>
    );
  }
}
