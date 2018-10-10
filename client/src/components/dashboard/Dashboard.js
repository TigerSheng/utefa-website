import React, { Component } from 'react';
import {LeftNav} from '../LeftNav'
import './Dashboard.css'
import AnnouncementBlock from './AnnouncementBlock'

export default class Dashboard extends Component {
  render(){
    return(
      <div  className="background">
<<<<<<< HEAD
        <LeftNav userIsAdmin={this.props.userIsAdmin} isAdmin={this.props.isAdmin} userHasAuthenticated={this.props.userHasAuthenticated}/>
=======
        <LeftNav isAdmin={this.props.isAdmin} userHasAuthenticated={this.props.userHasAuthenticated}/>
>>>>>>> Converted LeftNav bar to react-bootstrap Navbar
          <div className="main-view">
            <AnnouncementBlock
            history={this.props.history}
            isAdmin={this.props.isAdmin}/>
          </div>
      </div>
    );
  }
}
