import React, { Component } from 'react';
import {Auth, API, Storage} from 'aws-amplify';
import './Announcement.css'
import {Button, Modal} from "react-bootstrap";
var dateOptions = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric'};


export class  Announcement extends Component {
  constructor(props){
    super(props);
    this.file = null;
    this.myRef = React.createRef();

    this.state = {
      attachmentURL: null,
      deleteMessage: false,
      expanded: false,
      expandable: null,
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
      this.setState({expandable: this.myRef.current !== null ?
          (this.myRef.current.offsetHeight !== this.myRef.current.scrollHeight): false});

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
        API.del('api', '/notes/' + this.props.announcementData.noteId)
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

  expandText = event =>{
    console.log()
    if(this.state.expanded){
      this.setState({expanded:false})
    }
    else{
      this.setState({expanded:true})
    }
  }

  render(){
    return(
      <div onClick={this.expandText} className="announcement-container">
        <Modal bsSize="small"
        show={this.state.deleteMessage}>
          <Modal.Header className="delete-modal-title">
            <Modal.Title>Delete Post</Modal.Title>
          </Modal.Header>
          <Modal.Body className="delete-modal-text">Are you sure you want to delete this post?</Modal.Body>
          <Modal.Footer className="delete-modal-buttons">
            <Button onClick={this.handleDelete} bsStyle="danger">Delete</Button>
            <Button onClick={this.closeDeleteMessage}>Cancel</Button>
          </Modal.Footer>
        </Modal>


        <div className="announcement-header">
        <p className="announcement-title">
          {this.props.announcementData.title}
        </p>
          {this.props.isAdmin &&
          <p className="announcement-delete">
              <Button bsSize="xsmall" bsStyle="danger" onClick={this.openDeleteMessage}>
                X
            </Button>
          </p>}

        </div>

        <p ref={this.myRef} className={this.state.expanded ? "announcement-content-expanded" : "announcement-content"}>
          {this.props.announcementData.content}
        </p>
        <p className={this.state.expandable && !this.state.expanded ? "expand-sign" : "no-expand"}>...</p>

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
        <hr className="section-seperator"/>
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
