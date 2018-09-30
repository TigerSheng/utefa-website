import React, {Component, Fragment} from 'react';
import { Link } from "react-router-dom";
import {Auth} from 'aws-amplify';

export class NavBar extends Component {
  constructor(props){
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout = async (event) => {
    await Auth.signOut();
    this.props.userHasAuthenticated(false);
  }

  render () {
    return (
      <div className="" id='cssmenu'>
        <ul>
          {this.props.isAuthenticated
            ?  <Fragment>
                <li><a className="" href='/'><span>Home</span></a></li>
                <li><a className="" href='/#about'><span>About</span></a></li>
                <li><a className="" href='/#schedule'><span>Schedule</span></a></li>
                <li><a className="" href='/#decks'><span>Materials</span></a></li>
                <li><a className="" href='/#team'><span>Team</span></a></li>
                <li><a className="" href='/#alumni'><span>Alumni</span></a></li>
                <li><Link to='/' onClick={this.handleLogout}>Log Out</Link></li>
              </Fragment>
            : <Fragment>
                <li><a className="" href='/#top'><span>Home</span></a></li>
                <li><a className="" href='/#about'><span>About</span></a></li>
                <li><a className="" href='/#schedule'><span>Schedule</span></a></li>
                <li><a className="" href='/#decks'><span>Materials</span></a></li>
                <li><a className="" href='/#team'><span>Team</span></a></li>
                <li><a className="" href='/#alumni'><span>Alumni</span></a></li>
                <li><Link to='/login'><span>Log In</span></Link></li>
              </Fragment>
          }
        </ul>
      </div>
    );
  }
}
