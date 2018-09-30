import React, { Component } from 'react';
import {Auth, API, Storage} from 'aws-amplify';
import './Announcement.css'
import {Button, Glyphicon, Modal} from "react-bootstrap";
var dateOptions = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric'};


export class  Announcement extends Component {
  constructor(props){
    super(props);
    this.file = null;
    this.state = {
      attachmentURL: null,
      deleteMessage: false
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
      this.closeDeleteMessage();
    }catch(e){
      alert(e);
    }
  }

  openDeleteMessage = event => {
    this.setState({deleteMessage:true});
  }

  closeDeleteMessage = event => {
    this.setState({deleteMessage:false});
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
      <Modal bsSize="small" 
      show={this.state.deleteMessage}>
          <Modal.Header className="delete-modal-title">
            <Modal.Title>Delete Post?</Modal.Title>
          </Modal.Header> 

          <Modal.Footer className="delete-modal-buttons">
            <Button onClick={this.handleDelete} bsStyle="danger">Delete</Button>
            <Button onClick={this.closeDeleteMessage}>Cancel</Button>
          </Modal.Footer>
        </Modal>


        <div className="announcement-banner">
          {this.props.isAdmin &&
          <p className="announcement-delete">
              <Button bsSize="xsmall" bsStyle="danger" onClick={this.openDeleteMessage}>
                <Glyphicon glyph="remove-circle"/>
            </Button>
          </p>}

        </div>
        <p className="announcement-title">
          {this.props.announcementData.title}
        </p>
        <p className="announcement-content">
          {this.props.announcementData.content}
        </p>
        {this.props.announcementData.attachment &&
          <div className="announcement-attachments">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={this.state.attachmentURL}
            >
              <u>{this.formatFilename(this.props.announcementData.attachment)}</u>
            </a>
          </div>
        }
        <div className="announcement-footer">
         <p className="announcement-date">
                  {new Date(this.props.announcementData.postedAt).toLocaleDateString("en-US", dateOptions)}
          </p>
         <p className="announcement-owner">
            {this.props.announcementData.author}
          </p>
        </div>
      </div>

    );
  }

}
