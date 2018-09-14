import React, { Component } from 'react';
import './LeftNav.css'

import {Auth} from 'aws-amplify';
import {Link} from 'react-router-dom';

export class  LeftNav extends Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout = async (event) => {
    await Auth.signOut();
    this.props.userHasAuthenticated(false);
  }


  render() {
    return(
      <div className="LeftNav">
      <div className="side-logo-container">
        <Link to='/dashboard'>
          <img id="leftNavLogo" className="animated fadeInLeft" src='./images/UTEFA_LOGO.png'/>
        </Link>
        </div>
        <div className="LeftNav-Container">
          <a href="/dashboard">
          <div className="LeftNav-Item">
            <p>Home</p>
          </div>
          </a>
          <a href="/">
          <div className="LeftNav-Item" onClick={this.handleLogout}>
            <p>Log Out</p>
          </div>
          </a>
        </div>
      </div>
    )
  }
}
