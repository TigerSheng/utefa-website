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
            <img id="leftNavLogo" alt="logo" src='./images/UTEFA_LOGO.png'/>
          </Link>
        </div>
        <div className="LeftNav-Container">
          <Link to='/dashboard'>
            <div className={window.location.pathname === "/dashboard" ? "active-tab LeftNav-Item":"LeftNav-Item"}>
              <p>Home</p>
            </div>
          </Link>
          <Link to='/vote'>
            <div className={window.location.pathname === "/vote" ? "active-tab LeftNav-Item":"LeftNav-Item"}>
              <p>Vote</p>
            </div>
          </Link>
          {this.props.isAdmin && <Link to="/post">
            <div className={window.location.pathname === "/post" ? "active-tab LeftNav-Item":"LeftNav-Item"}>
              <p>Post</p>
            </div>
          </Link>}
          <Link to="/sessionmaterial">
            <div className={window.location.pathname === "/learningcontent" ? "active-tab LeftNav-Item":"LeftNav-Item"}>
              <p>Materials</p>
            </div>
          </Link>
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
