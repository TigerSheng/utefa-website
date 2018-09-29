import React, { Component } from 'react';
import {Auth, API, Storage} from 'aws-amplify';
import './Announcement.css'
import {Button, Glyphicon, Modal} from "react-bootstrap";
var dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};


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
      // this.setState({deleteMessage:true});
      // console.log(this.state);
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
      {/* <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>Modal title</Modal.Title>
          </Modal.Header>

          <Modal.Body>One fine body...</Modal.Body>

          <Modal.Footer>
            <Button>Close</Button>
            <Button bsStyle="primary">Save changes</Button>
          </Modal.Footer>
        </Modal.Dialog> */}


        <div className="announcement-banner">
          <p className="announcement-date">
                  {new Date(this.props.announcementData.postedAt).toLocaleString("en-US", dateOptions)}
          </p>
          {this.props.isAdmin &&
          <p className="announcement-delete">
              <Button bsSize="xsmall" bsStyle="danger" onClick={this.handleDelete}>
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

        <p className="announcement-owner">
          {this.props.announcementData.author}
        </p>
      </div>

    );
  }

}
