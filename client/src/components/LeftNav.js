import React, { Component } from 'react';
import './LeftNav.css'

import {Auth} from 'aws-amplify';
import {Link} from 'react-router-dom';
import { Navbar, Nav, NavItem, Glyphicon } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

export class  LeftNav extends Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout = async (event) => {
    await Auth.signOut();
    this.props.userHasAuthenticated(false);
    this.props.userIsAdmin(false);
  }

  render() {
    return(
      <div>
        <Navbar fluid className="side-bar">
          <Navbar.Header>
            <Navbar.Brand>
              <Link to='/dashboard'>
                <img id="leftNavLogo" alt="logo" src='./images/UTEFA_LOGO.png'/>
              </Link>
            </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <LinkContainer to='/dashboard'>
            <NavItem className="LeftNav-Item">
            <Glyphicon  className="left-nav-icon" glyph="home" /><p className="left-nav-text">Home</p>
            </NavItem>
          </LinkContainer>

          <LinkContainer to='/vote'>
            <NavItem className="LeftNav-Item"> 
            <Glyphicon className="left-nav-icon" glyph="inbox" /><p className="left-nav-text">Vote</p>
            </NavItem>
          </LinkContainer>

          {this.props.isAdmin &&  <LinkContainer to='/post'>
            <NavItem className="LeftNav-Item"> 
            <Glyphicon className="left-nav-icon" glyph="bullhorn" /><p className="left-nav-text">Post</p>
            </NavItem>
          </LinkContainer>}

          <LinkContainer to="/sessionmaterial">
            <NavItem className="LeftNav-Item">
            <Glyphicon className="left-nav-icon" glyph="folder-open" /><p className="left-nav-text">Materials</p>
            </NavItem>
          </LinkContainer>

          <NavItem className="LeftNav-Item" onClick={this.handleLogout}>
              <div >
              <Glyphicon className="left-nav-icon" glyph="log-out" /><p className="left-nav-text">Log Out</p>
              </div>
          </NavItem>
        </Nav>
        </Navbar>
      </div>


      // <div className="LeftNav">
      //   <div className="side-logo-container">
      //     <Link to='/dashboard'>
      //       <img id="leftNavLogo" alt="logo" src='./images/UTEFA_LOGO.png'/>
      //     </Link>
      //   </div>
      //   <div className="LeftNav-Container">
      //     <Link to='/dashboard'>
      //       <div className={window.location.pathname === "/dashboard" ? "active-tab LeftNav-Item":"LeftNav-Item"}>
      //         <p>Home</p>
      //       </div>
      //     </Link>
      //     <Link to='/vote'>
      //       <div className={window.location.pathname === "/vote" ? "active-tab LeftNav-Item":"LeftNav-Item"}>
      //         <p>Vote</p>
      //       </div>
      //     </Link>
      //     {this.props.isAdmin && <Link to="/post">
      //       <div className={window.location.pathname === "/post" ? "active-tab LeftNav-Item":"LeftNav-Item"}>
      //         <p>Post</p>
      //       </div>
      //     </Link>}
      //     <Link to="/sessionmaterial">
      //       <div className={window.location.pathname === "/sessionmaterial" ? "active-tab LeftNav-Item":"LeftNav-Item"}>
      //         <p>Materials</p>
      //       </div>
      //     </Link>
      //     <a href="/">
      //       <div className="LeftNav-Item" onClick={this.handleLogout}>
      //         <p>Log Out</p>
      //       </div>
      //     </a>
      //   </div>
      // </div>
    )
  }
}
