import React, { Component } from 'react';
import './VotePost.css'

export class  VotePost extends Component {
  render(){
    return(
      <div className="voting-container">
      <p className="voting-stock-title">{this.props.votePostData.stock} ({this.props.votePostData.ticker})</p>
      <div className={this.props.votePostData.votersYes.includes("mark") ? 'hidden' : 'voting-yes-no-vote'}>
        <button className="vote-yes">Yes</button> <button className="vote-no">No</button>
      </div>
      <div className={!this.props.votePostData.votersYes.includes("mark") ? 'hidden' : 'vote-bar'}>
      <div className="voters-yes" style={{width : 100*(this.props.votePostData.votersYes.length )/(this.props.votePostData.votersYes.length+this.props.votePostData.votersNo.length  )+ "%"}}>Yes ({Math.round(100*(this.props.votePostData.votersYes.length /(this.props.votePostData.votersYes.length+this.props.votePostData.votersNo.length  )))+ "%"})</div>
      <div className="voters-no" style={{width : 100*(this.props.votePostData.votersNo.length )/(this.props.votePostData.votersYes.length+this.props.votePostData.votersNo.length  )+ "%"}}>No ({Math.round(100*(this.props.votePostData.votersNo.length /(this.props.votePostData.votersYes.length+this.props.votePostData.votersNo.length  )))+ "%"})</div>
      </div>
      </div>

    );
  }

}
