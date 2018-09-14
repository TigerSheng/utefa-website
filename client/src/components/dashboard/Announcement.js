import React, { Component } from 'react';
import './Announcement.css'

export class  Announcement extends Component {
  constructor(props) {
    super(props);
  }



  render(){
    return(
      <div className="announcement-container">
        <p className="announcement-title">{this.props.announcementData.title}</p>
        <p className="announcement-content">{this.props.announcementData.content}</p>
        <div className="announcement-creation-info">
          <p className="announcement-date">{this.props.announcementData.date} {this.props.announcementData.time}</p><p className="announcement-owner">By : {this.props.announcementData.owner}</p>
        </div>
      </div>

    );
  }

}
