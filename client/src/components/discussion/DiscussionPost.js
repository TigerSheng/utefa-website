import React, { Component } from 'react';
import {Auth, API, Storage} from 'aws-amplify';
import ReactLoading from 'react-loading';
import {Button, Modal, FormGroup, FormControl, FieldGroup } from "react-bootstrap";
import './DiscussionPost.css'

import {Reply} from './Reply';
import quickSort from "../dashboard/sort";

var dateOptions = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric'};

export class DiscussionPost extends Component {
    constructor(props){
        super(props);
        this.file = null;
        this.myRef = React.createRef();

        this.state = {
          attachmentURL: null,
          deletePostMessage: false,
          expanded: false,
          expandable: null,
          hovered: false,
          userEditable: null,
          userEditing: false,
          replies: [],
          newReplyValue: "",

          newAttachment: null,
          newContent: "",
          newTitle: ""
        }

        this.handleDelete = this.handleDelete.bind(this)
        this.handleHover = this.handleHover.bind(this)

        this.createReply = this.createReply.bind(this)
        this.handleReplyUpdate = this.handleReplyUpdate.bind(this)
        this.getNewReplyData = this.getNewReplyData.bind(this)

        this.editPost = this.editPost.bind(this)
        this.submitEditChanges = this.submitEditChanges.bind(this)

        this.cancelPostEdit = this.cancelPostEdit.bind(this)
        this.updateNewContent = this.updateNewContent.bind(this)
        this.updateNewTitle = this.updateNewTitle.bind(this)
      }

    updateReplyData(){
        const init = {
        'queryStringParameters': {
            'postId': this.props.postData.discussionId
          },
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            }
        }
        return API.get('api', '/reply', init)
    }

    updateNewContent(e){
      this.setState({newContent: e.target.value})
    }

    updateNewTitle(e){
      this.setState({newTitle: e.target.value})
    }

    editPost(){
      this.setState({userEditing: true})
    }

    cancelPostEdit(){
      this.setState({newContent: "", newAttachment: null, newTitle: "", userEditing: false})
    }

    handleFileChange = event => {
      this.file = event.target.files[0];
    }

    submitEditChanges(){
      const init = {
        header: {
          "Content-Type": "application/json"
        },
        body: {
          "content": this.state.newContent,
          "attachment": this.state.newAttachment,
          "title": this.state.newTitle
        },
        }
      Auth.currentAuthenticatedUser().then(user => {
        API.put('api', '/discussion/' + this.props.postData.discussionId, init)
        .then(response => {
          this.cancelPostEdit()
          window.location.reload()
        })
      })
    }

    async getNewReplyData(){
      const replies = await this.updateReplyData();
            quickSort(replies, 0, replies.length-1)
            this.setState({
                replies:replies,
              });
    }

    async componentDidMount() {
        this.setState({isLoading: true})
        try{
            this.setState({expandable: this.myRef.current !== null ?
                    (this.myRef.current.offsetHeight !== this.myRef.current.scrollHeight): false});

            Auth.currentAuthenticatedUser().then(user =>{
                var curUser = this.props.postData.username === user.username;
                this.setState({userEditable: (curUser | this.props.isAdmin)});
            });

            let attachmentURL;
            if(this.props.postData.attachment){
            attachmentURL = await Storage.get(this.props.postData.attachment);
            }
            this.setState({
            attachmentURL
            });

            await this.getNewReplyData()

        }catch(e){
            alert(e);
            console.log(e);
        }
        this.setState({isLoading: false})
    }

    formatFilename(str) {
        return str.replace(/^\w+-/, "");
    }

    handleDelete = event => {
        event.preventDefault()

        try {
          this.deletePost();
          this.closeDeleteMessage();
        }catch(e){
          alert(e);
        }
    }

    handleReplyUpdate(e){
      this.setState({newReplyValue: e.target.value})
    }

    createReply(){
      Auth.currentAuthenticatedUser().then(user => {
        API.post('api', '/reply', {
          header: {
            "Content-Type": "application/json"
          },
          body: {
            "userId": user.username,
            "discussionId": this.props.postData.discussionId,
            "author": user.attributes.name,
            "content": this.state.newReplyValue
          }
        }).then(response => {
          this.getNewReplyData()
          this.setState({newReplyValue: ""})
          return
        })
      });
    }

    handleHover() {
        if(this.state.expandable){
          this.setState(prevState => ({ hovered: !prevState.hovered }))
        }
    }

    openDeleteMessage = event => {
        this.setState({deleteMessage:true});
    }

    closeDeleteMessage = event => {
        this.setState({deleteMessage:false});
    }

    deletePost(){
        try{
          if(this.props.postData.attachment)
            Storage.remove(this.props.postData.attachment)

          Auth.currentAuthenticatedUser().then(user => {
            this.state.replies.map((index, i) => {
              const deleteReplyParams = {
                'queryStringParameters': {
                    'replyId': this.state.replies[i].replyId,
                    'discussionId': this.props.postData.discussionId
                  }
                }
                API.del('api', '/reply/' + this.state.replies[i].replyId, deleteReplyParams)
            })

            API.del('api', '/discussion/' + this.props.postData.discussionId)
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
        if(this.state.expanded){
          this.setState({expanded:false})
        }
        else{
          this.setState({expanded:true})
        }
      }

      render(){
        const hoverable = this.state.hovered ? "post-container-hovered" : "post-container";
        return(
          <div onClick={this.expandText} className={hoverable} onMouseEnter={this.handleHover} onMouseLeave={this.handleHover}>
            <Modal bsSize="small"
            show={this.state.deleteMessage}>
              <Modal.Header className="delete-modal-title">
                <Modal.Title>Delete Post</Modal.Title>
              </Modal.Header>
              <Modal.Body className="delete-modal-text">Are you sure you want to delete this post? (All post replies will be deleted as well)</Modal.Body>
              <Modal.Footer className="delete-modal-buttons">
                <Button onClick={this.handleDelete} bsStyle="danger">Delete</Button>
                <Button onClick={this.closeDeleteMessage}>Cancel</Button>
              </Modal.Footer>
            </Modal>
            <div className="post-header">
            {this.state.userEditing ?
              <FormControl type="text" defaultValue={this.props.postData.title}  onChange={this.updateNewTitle}/> :
              <p className="post-title">
                {this.props.postData.title}
              </p>}
            {this.state.userEditable && !this.state.userEditing &&
              <p><Button bsSize="xsmall" bsStyle="primary" onClick={this.editPost}>Edit</Button>
                <Button bsSize="xsmall" bsStyle="danger" onClick={this.openDeleteMessage}>X</Button></p>}
            </div>
            {!this.state.userEditing?
            <div>
             <p ref={this.myRef} className={this.state.expanded ? "post-content-expanded" : "post-content"}>
               {this.props.postData.content}
             </p>
             <p className={this.state.expandable && !this.state.expanded ? "expand-sign" : "no-expand"}>...</p>
            </div>:

            <div>
              <FormControl componentClass="textarea" defaultValue={this.props.postData.content}  onChange={this.updateNewContent}/>
            </div>}

            {this.state.userEditing &&
            <FormControl
            type="file"
            onChange={this.handleFileChange}
            />}

            {this.state.userEditing &&
              <p>
                <Button bsSize="medium" bsStyle="primary" onClick={this.submitEditChanges}>Confirm</Button>
                <Button bsSize="medium" bsStyle="primary" onClick={this.cancelPostEdit}>Cancel</Button>
              </p>
            }

            {!this.state.userEditing &&
              <div>
              {this.props.postData.attachment &&
                <div className="post-attachments">
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={this.state.attachmentURL}
                  >
                    <u>{this.formatFilename(this.props.postData.attachment)}</u>
                  </a>
                </div>
              }
              <hr className="section-seperator"/>
              <div className="reply-section">
              {this.state.isLoading
                ? <ReactLoading className="loader" type={'spinningBubbles'} color={'white'} />
                : <div>
                  {
                    this.state.replies.map((index, i) => {
                      if(this.state.replies[i]) {
                        return(
                          <div className="reply-full" key={i}>
                            <Reply
                              replyData={this.state.replies[i]}
                              isAdmin={this.props.isAdmin}
                            />
                          </div>
                        )
                      }else return(null);
                    })
                  }
                </div>
              }
              </div>
              <div className="form r-form">
              <form>
              <FormGroup  controlId="formControlsTextarea">
              <FormControl componentClass="textarea" placeholder="Enter reply here..." value={this.state.newReplyValue} onChange={this.handleReplyUpdate} />
              </FormGroup>

              <Button className={"btn-success"} disabled={this.state.newReplyValue === ""} onClick={this.createReply}>Reply</Button>
              </form>
              </div>
              <hr className="section-seperator"/>
              <div className="post-footer">
              <p className="post-date">
                        {new Date(this.props.postData.postedAt).toLocaleDateString("en-US", dateOptions)}
                </p>
              <p className="post-owner">
                  {this.props.postData.author}
                </p>
              </div>
            </div>}
          </div>
        );
      }

}
