import React, {Component} from 'react';
import { Link } from "react-router-dom";
import './NavBar.css'

export class NavBar extends Component {
  render () {
    return (
      <div className="" id='cssmenu'>
        <ul>
          <li><a className="collapsed" href='/#top'><span>Home</span></a></li>
          <li><a className="collapsed" href='/#about'><span>About</span></a></li>
          <li><a className="collapsed" href='/#schedule'><span>Schedule</span></a></li>
          <li><a className="collapsed" href='/#decks'><span>Materials</span></a></li>
          <li><a className="collapsed" href='/#team'><span>Team</span></a></li>
          <li><a className="collapsed" href='/#alumni'><span>Alumni</span></a></li>
          <li><Link to='/login'>Log In</Link></li>
        </ul>
      </div>
    );
  }
}
