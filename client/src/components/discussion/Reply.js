import React, { Component } from 'react';
import {Auth, API, Storage} from 'aws-amplify';

import {Button, Modal, FormControl} from "react-bootstrap";

export class  Reply extends Component {
  constructor(props){
    super(props);
  
    this.state = {
      deleted: false,
      editingMode: false,
      newComment: "",
      curComment: this.props.replyData.content
    }

    this.deleteComment = this.deleteComment.bind(this)
    this.editComment = this.editComment.bind(this)
    this.openCommentEditor = this.openCommentEditor.bind(this)
    this.closeCommentEditor = this.closeCommentEditor.bind(this)
    this.updateNewComment = this.updateNewComment.bind(this)
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
        })
    })
  }


  render(){
      return(
      !this.state.deleted?       
      <div>
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

        {this.state.curComment + "     "}
        {"author: " + this.props.replyData.author}
        <Button onClick={this.openCommentEditor} bsStyle="primary" bsSize="xsmall">Edit</Button>
        <Button onClick={this.deleteComment} bsStyle="danger" bsSize="xsmall">x</Button>
      </div> 
      
      : null
     );

  }
}
