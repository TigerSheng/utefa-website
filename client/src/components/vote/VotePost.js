import React, { Component } from 'react';
import './VotePost.css'
import {
  Button,
  ProgressBar
} from "react-bootstrap";

export class  VotePost extends Component {
  render(){
    return(
      <div className="voting-container">
      <p className="voting-stock-title">{this.props.votePostData.stock} ({this.props.votePostData.ticker})</p>
      <p className="voting-download-label">If you missed the presentation: <a href={this.props.votePostData.downloadLink}><u className="voting-download-link" >Click to download</u></a></p>
      {(() => {
        if(!this.props.votePostData.votersYes.includes(this.props.votePostData.viewer)){
          return(
            <div className= 'voting-yes-no-vote'>
              <Button bsStyle="success" className="vote-yes" onClick={this.props.votePostData.voteYes}>Yes</Button> <Button bsStyle="danger" onClick={this.props.votePostData.voteNo} className="vote-no">No</Button>
            </div>
          )
        }else{
          return(
          <div className='vote-bar'>
          <ProgressBar>
            <ProgressBar bsStyle="success" now={100*(this.props.votePostData.votersYes.length )/(this.props.votePostData.votersYes.length+this.props.votePostData.votersNo.length  )}label={100*(this.props.votePostData.votersYes.length )/(this.props.votePostData.votersYes.length+this.props.votePostData.votersNo.length  )+`%`}  />
            <ProgressBar bsStyle="danger" now={100*(this.props.votePostData.votersNo.length )/(this.props.votePostData.votersYes.length+this.props.votePostData.votersNo.length  )} label={100*(this.props.votePostData.votersNo.length )/(this.props.votePostData.votersYes.length+this.props.votePostData.votersNo.length  )+`%`} />
          </ProgressBar>
          </div>
        )
        }
      })()

      }
      </div>

    );
  }

}
