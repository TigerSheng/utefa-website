import React, { Component } from 'react';
import {LeftNav} from '../LeftNav'
import './Dashboard.css'
import AnnouncementBlock from './AnnouncementBlock'

export default class Dashboard extends Component {
  render(){
    return(
      <div  className="background">
        <LeftNav userIsAdmin={this.props.userIsAdmin} isAdmin={this.props.isAdmin} userHasAuthenticated={this.props.userHasAuthenticated}/>
          <div className="main-view">
            <AnnouncementBlock
            history={this.props.history}
            isAdmin={this.props.isAdmin}/>
          </div>
      </div>
    );
  }
}
