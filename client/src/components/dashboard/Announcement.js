import React, { Component } from 'react';
import {Auth, API, Storage} from 'aws-amplify';
import './Announcement.css'

export class  Announcement extends Component {
  constructor(props){
    super(props);
    this.file = null;
    this.state = {
      attachmentURL: null
    }
    this.handleDelete = this.handleDelete.bind(this)
  }

  async componentDidMount() {
    try{
      let attachmentURL;
      if(this.props.announcementData.attachment){
        attachmentURL = await Storage.get(this.props.announcementData.attachment);
      }
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

  handleDelete = event => {
    event.preventDefault()
    try {
      this.deleteAnnouncement();
    }catch(e){
      alert(e);
    }
  }

  deleteAnnouncement(){
    try{
      if(this.props.announcementData.attachment)
        Storage.remove(this.props.announcementData.attachment)
      Auth.currentAuthenticatedUser().then(user => {
        API.del('api', '/notes/' + user.username + "/" + this.props.announcementData.noteId)
          .then(response => {
            console.log(response);
            return window.location.reload();
          })
      })
    }catch(e){
      console.log(e)
      alert(e)
    }
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
        {this.props.isAdmin && <div className="announcement-delete">
          <a onClick={this.handleDelete}>
            Delete Post
          </a>
        </div>}
      </div>

    );
  }

}
