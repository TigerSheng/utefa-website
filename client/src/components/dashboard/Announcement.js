import React, { Component } from 'react';
import './Announcement.css'

export class  Announcement extends Component {
  render(){
    return(
      <div className="announcement-container">
        <p className="announcement-title">
          {this.props.announcementData.title}
        </p>
        <p className="announcement-content">
          {this.props.announcementData.content}
        </p>
        <p className="announcement-attachment">
          {this.props.announcementData.attachment}
        </p>
        <div className="announcement-creation-info">
          <p className="announcement-date">
            {new Date(this.props.announcementData.postedAt).toLocaleString()}
          </p>
          <p className="announcement-owner">
            By : {this.props.announcementData.author}
          </p>
        </div>
      </div>

    );
  }

}
