import React, { Component } from 'react';
import {Auth, API} from 'aws-amplify';
import './Reply.css';

import {Button, Modal, FormControl} from "react-bootstrap";

var dateOptions = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric'};

export class Reply extends Component {
  constructor(props){
    super(props);

    this.state = {
      deleted: false,
      editingMode: false,
      newComment: "",
      curComment: this.props.replyData.content,
      userEditableComment: false,
      deleteWindow: false
    }

    this.deleteComment = this.deleteComment.bind(this)
    this.editComment = this.editComment.bind(this)
    this.openCommentEditor = this.openCommentEditor.bind(this)
    this.closeCommentEditor = this.closeCommentEditor.bind(this)
    this.updateNewComment = this.updateNewComment.bind(this)
    this.openDeleteWindow = this.openDeleteWindow.bind(this)
    this.closeDeleteWindow = this.closeDeleteWindow.bind(this)
  }

  componentDidMount(){
    Auth.currentAuthenticatedUser().then(user =>{
      var curUser = this.props.replyData.userId === user.username;
      this.setState({userEditableComment: (curUser || this.props.isAdmin)});
  });
  }

  openCommentEditor(){
    this.setState({editingMode: true})
  }

  closeCommentEditor(){
    this.setState({editingMode: false})
    this.setState({newComment: ""})
  }


  updateNewComment(e){
    this.setState({newComment: e.target.value})
  }


  editComment(){
    try{
      const init = {
        header: {
          "Content-Type": "application/json"
        },
        body: {
          "content": this.state.newComment
        },
        'queryStringParameters': {
            'replyId': this.props.replyData.replyId,
            'discussionId': this.props.replyData.discussionId
          }
        }
      Auth.currentAuthenticatedUser().then(user => {
        API.put('api', '/reply/' + this.props.replyData.replyId, init)
        .then(response => {
          this.setState({curComment: this.state.newComment})
          this.closeCommentEditor()
        })
      })
    }catch(e){
      console.log(e)
      alert(e)
    }
  }




  deleteComment(){
    const init = {
      'queryStringParameters': {
          'replyId': this.props.replyData.replyId,
          'discussionId': this.props.replyData.discussionId
        }
      }
    Auth.currentAuthenticatedUser().then(user => {
        API.del('api', '/reply/' + this.props.replyData.replyId, init)
        .then(response => {
          this.setState({deleted:true});
          this.closeDeleteWindow();
        })
    })
  }

  openDeleteWindow(){
    this.setState({deleteWindow: true})
  }

  closeDeleteWindow(){
    this.setState({deleteWindow: false})
  }


  render(){

      return(
      !this.state.deleted?
      <div className="replyalign outer">
      <div className="reply-container">
        <Modal bsSize="small"
        show={this.state.editingMode}>
          <Modal.Header className="edit-modal-title">
            <Modal.Title>Edit Comment</Modal.Title>
          </Modal.Header>
          <Modal.Body className="edit-modal-text">
          <FormControl componentClass="textarea" defaultValue={this.props.replyData.content} onChange={this.updateNewComment}/>
          </Modal.Body>
          <Modal.Footer className="edit-modal-buttons">
          <Button onClick={this.editComment} bsStyle="primary">Confirm</Button>
          <Button onClick={this.closeCommentEditor} bsStyle="danger">Cancel</Button>
          </Modal.Footer>
        </Modal>

        <Modal bsSize="small"
        show={this.state.deleteWindow}>
          <Modal.Header className="edit-modal-title">
            <Modal.Title>Delete Comment?</Modal.Title>
          </Modal.Header>
          <Modal.Footer className="edit-modal-buttons">
          <Button onClick={this.deleteComment} bsStyle="primary">Confirm</Button>
          <Button onClick={this.closeDeleteWindow} bsStyle="danger">Cancel</Button>
          </Modal.Footer>
        </Modal>

        <p className="reply-text">{this.state.curComment}</p>
        <hr className="section-seperator"/>
        <div className="post-footer">
        <p className="post-date">
                  {new Date(this.props.replyData.postedAt).toLocaleDateString("en-US", dateOptions)}
          </p>
        <p className="post-owner">
            {this.props.replyData.author}
          </p>
        </div>
      </div>
      {this.state.userEditableComment &&
      <div className="btn-container middle">
      <Button onClick={this.openCommentEditor} bsStyle="primary" bsSize="xsmall">Edit</Button>
      <Button onClick={this.openDeleteWindow} bsStyle="danger" bsSize="xsmall">X</Button>
      </div>}
      </div>

      : null
     );

  }
}
