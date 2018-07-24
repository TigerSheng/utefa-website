import React, {Component, Fragment} from 'react';
import { Link } from "react-router-dom";

export class NavBar extends Component {
  handleLogout(e) {
    this.props.userHasAuthenticated(false);
  }

  render () {
    return (
      <div className="animated fadeInLeft" id='cssmenu'>
        <ul>
          {this.props.isAuthenticated
            ? <li><Link to='/' onClick={this.handleLogout}>Log Out</Link></li>
            : <Fragment>
                <li><a className="" href='#about'><span>About</span></a></li>
                <li><a className="" href='#team'><span>Team</span></a></li>
                <li><a className="" href='#alumni'><span>Alumni</span></a></li>
                <li><Link to='/login'><span>Log In</span></Link></li>
              </Fragment>
          }
        </ul>
      </div>
    );
  }
}
