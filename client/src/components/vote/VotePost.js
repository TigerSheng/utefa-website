import React, { Component } from 'react';
import './VotePost.css'
import {
  Button,
  ProgressBar,
  Modal
} from "react-bootstrap";
import {Storage, Auth, API} from 'aws-amplify'

var dateOptions = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric'};

//helper function
const _MS_PER_DAY = 1000 * 60 * 60 * 24;
// a and b are javascript Date objects
function dateDiffInDays(a, b) {
  // Discard the time and time-zone information.
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}

export class VotePost extends Component {
  constructor(props){
    super(props);
    this.file = null;
    this.state = {
      attachmentURL: null,
      voted: null,
      deleteMessage: false
    }
    this.voteYes = this.voteYes.bind(this);
    this.voteNo = this.voteNo.bind(this);
    this.handleDelete = this.handleDelete.bind(this)
  }

  async componentDidMount() {
    try{
      Auth.currentAuthenticatedUser().then(user => {
        if(this.props.votePostData.yes.includes(user.username)
          || this.props.votePostData.no.includes(user.username))
          this.setState({voted: true})
        else this.setState({voted: false})
      })
      let attachmentURL;
      if(this.props.votePostData.attachment){
        attachmentURL = await Storage.get(this.props.votePostData.attachment)
      }
      this.setState({
        attachmentURL
      })
    }catch(e){
      console.log(e)
      alert(e)
    }
  }

  //vote by PUT at endpoint/votes/vote/:voteId/:options/:userId
  //options yes for yes, no for no
  voteYes(){
    try{
      Auth.currentAuthenticatedUser().then(user => {
        API.put('api', '/votes/vote/' + this.props.votePostData.voteId + '/yes/'
        + user.username).then(response => {
          console.log(response)
          window.location.reload()
        })
      })
    }catch(e){
      console.log(e)
      alert(e)
    }
  }

  voteNo(){
    try{
      Auth.currentAuthenticatedUser().then(user => {
        API.put('api', '/votes/vote/' + this.props.votePostData.voteId + '/no/'
        + user.username).then(response => {
          console.log(response)
          window.location.reload()
        })
      })
    }catch(e){
      console.log(e)
      alert(e)
    }
  }

  handleDelete(e) {
    e.preventDefault();
    try {
      this.deleteVote();
    }catch(e){
      alert(e);
      console.log(e)
    }
  }

  openDeleteMessage = event => {
    this.setState({deleteMessage:true});
  }

  closeDeleteMessage = event => {
    this.setState({deleteMessage:false});
  }

  deleteVote() {
    try{
      if(this.props.votePostData.attachment)
        Storage.remove(this.props.votePostData.attachment)
      API.del('api','/votes/'+this.props.votePostData.voteId)
        .then(response => {
          console.log(response);
          return window.location.reload();
        })
    }catch(e){
      console.log(e)
      alert(e)
    }
  }

  renderVote(){
    const now = new Date(Date.now())
    const time = new Date(this.props.votePostData.time)
    // console.log(this.voted())

    if( this.state.voted || dateDiffInDays(time, now) > 2){
      return(
        <div className='vote-bar'>
          <ProgressBar className="no-margin-bottom" >
            <ProgressBar bsStyle="success" className="no-margin-bottom" now={100*(this.props.votePostData.yes.length )/(this.props.votePostData.yes.length+this.props.votePostData.no.length  )}label={100*(this.props.votePostData.yes.length )/(this.props.votePostData.yes.length+this.props.votePostData.no.length  )+`%`}  />
            <ProgressBar bsStyle="danger" className="no-margin-bottom" now={100*(this.props.votePostData.no.length )/(this.props.votePostData.yes.length+this.props.votePostData.no.length  )} label={100*(this.props.votePostData.no.length )/(this.props.votePostData.yes.length+this.props.votePostData.no.length  )+`%`} />
          </ProgressBar>
        </div>
      )
    }else{
      return(
        <div className= 'voting-yes-no-vote'>
          <Button bsStyle="success" className="vote-yes" onClick={this.voteYes}>Yes</Button> <Button bsStyle="danger" onClick={this.voteNo} className="vote-no">No</Button>
        </div>
      )
    }
  }

  render(){
    return(
      <div className="voting-container">
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

        <div className="voting-header">
          <p className="voting-stock-title">{this.props.votePostData.name} ({this.props.votePostData.ticker})</p>
          {this.props.isAdmin &&
          <p className="voting-delete">
            <Button bsSize="xsmall" bsStyle="danger" onClick={this.openDeleteMessage}>
              X
            </Button>
          </p>}
        </div>
        <div className="voting-body">
          <p className="voting-download-label">If you missed the presentation: <a href={this.state.attachmentURL}><u className="voting-download-link" >Click to download</u></a></p>
          {this.renderVote()}
        </div>
        <hr className="section-seperator"/>
        <div className="voting-footer">
         <p className="voting-date">
            {new Date(this.props.votePostData.time).toLocaleDateString("en-US", dateOptions)}
          </p>
        </div>
      </div>
    );
  }
}
