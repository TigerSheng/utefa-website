import React, { Component } from 'react';
import {Auth} from 'aws-amplify';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

  handleLogout = async (event) => {
    await Auth.signOut();
    this.props.userHasAuthenticated(false);
  }

  render(){
    return(
      <div>
        <a href='/' onCLick={this.handleLogout}>Log Out</a>
      </div>
    );
  }
}
