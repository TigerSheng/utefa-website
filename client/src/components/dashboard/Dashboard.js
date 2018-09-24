import React, { Component } from 'react';
import {LeftNav} from '../LeftNav'
import './Dashboard.css'
import AnnouncementBlock from './AnnouncementBlock'

export default class Dashboard extends Component {
  render(){
    return(
      <div>
        <LeftNav isAdmin={this.props.isAdmin}/>
        <div className="main-view">
          <AnnouncementBlock
          history={this.props.history}
          isAdmin={this.props.isAdmin}/>
        </div>
      </div>
    );
  }
}
