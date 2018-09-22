import React, { Component } from 'react';
import {LeftNav} from '../LeftNav'
import './Dashboard.css'
import AnnouncementBlock from './AnnouncementBlock'

export default class Dashboard extends Component {
  render(){
    return(
      <div>
        <LeftNav/>
        <div className="main-view">
          <AnnouncementBlock />
        </div>
      </div>
    );
  }
}
