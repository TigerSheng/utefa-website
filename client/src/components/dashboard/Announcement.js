import React, { Component } from 'react';
import {Storage} from 'aws-amplify';
import './Announcement.css'

export class  Announcement extends Component {
  constructor(props){
    super(props);
    this.file = null;
    this.state = {
      attachmentURL: null
    }
  }

  async componentDidMount() {
    try{
      let attachmentURL;
      if(this.props.announcementData.attachment){
        attachmentURL = await Storage.get(this.props.announcementData.attachment);
      }
      console.log(attachmentURL)
      this.setState({
        attachmentURL
      });
    }catch(e){
      alert(e);
      console.log(e);
    }
  }

  formatFilename(str) {
    return str.replace(/^\w+-/, "");
  }

  render(){
    return(
      <div className="announcement-container">
        <p className="announcement-title">
          {this.props.announcementData.title}
        </p>
        <p className="announcement-content">
          {this.props.announcementData.content}
        </p>
        {this.props.announcementData.attachment &&
          <div>
            <p>Attachment</p>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={this.state.attachmentURL}
            >
              {this.formatFilename(this.props.announcementData.attachment)}
            </a>
          </div>
        }
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
