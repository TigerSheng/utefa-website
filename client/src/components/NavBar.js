import React, {Component} from 'react';
// import { Link } from "react-router-dom";
import { Navbar, Nav, NavItem } from "react-bootstrap";
import { AutoAffix } from "react-overlays"
import './NavBar.css'


export class NavBar extends Component {
  render () {
    return (
      // <div className="" id='cssmenu'>
      <div>
        <AutoAffix >
          <Navbar fluid collapseOnSelect className="menu-bar">
            <Navbar.Header>
              <Navbar.Toggle className="menu-hamburger"></Navbar.Toggle>
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav>
                <NavItem className="menu-item" href='/#top'>Home</NavItem>
                <NavItem className="menu-item" href='/#about'>About</NavItem>
                <NavItem className="menu-item" href='/#schedule'>Schedule</NavItem>
                <NavItem className="menu-item" href='/#materials'>Materials</NavItem>
                <NavItem className="menu-item" href='/#team'>Team</NavItem>
                <NavItem className="menu-item" href='/#alumni'>Alumni</NavItem>
                <NavItem className="menu-item" href='/login'>Log In</NavItem>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </AutoAffix>

        {/* <ul>
          <li><a className="collapsed" href='/#top'><span>Home</span></a></li>
          <li><a className="collapsed" href='/#about'><span>About</span></a></li>
          <li><a className="collapsed" href='/#schedule'><span>Schedule</span></a></li>
          <li><a className="collapsed" href='/#decks'><span>Materials</span></a></li>
          <li><a className="collapsed" href='/#team'><span>Team</span></a></li>
          <li><a className="collapsed" href='/#alumni'><span>Alumni</span></a></li>
          <li><Link to='/login'>Log In</Link></li>
        </ul> */}
      </div>
    );
  }
}
