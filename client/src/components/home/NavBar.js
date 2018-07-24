import React, {Component} from 'react';
import { Link } from "react-router-dom";

export class NavBar extends Component {
  render () {
    return (
      <div className="animated fadeInLeft" id='cssmenu'>
        <ul>
          <li><a className="" href='#about'><span>About</span></a></li>
          <li><a className="" href='#team'><span>Team</span></a></li>
          <li><a className="" href='#alumni'><span>Alumni</span></a></li>
          <li><Link to='/login'><span>Log In</span></Link></li>
        </ul>
      </div>
    );
  }
}
