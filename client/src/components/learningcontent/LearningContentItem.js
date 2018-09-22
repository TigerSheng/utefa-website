import React, { Component } from 'react';
import './LearningContentItem.css'

export class  LearningContentItem extends Component {
  formatFilename(str) {
    return str.replace(/^\w+-/, "");
  }

  render(){
    return(
      <div className="learning-content-item">
      <a className="file-name">{this.props.fileData.fileName}</a>
      <a href= {this.props.fileData.file} className="file-attachment">filleeeee</a>
      </div>

    );
  }

}
// <div className="voting-container">
// <p className="voting-stock-title">{this.props.LearningContentItemData.stock} ({this.props.LearningContentItemData.ticker})</p>
// <p className="voting-download-label">If you missed the presentation: <a href={this.props.LearningContentItemData.downloadLink}><u className="voting-download-link" >Click to download</u></a></p>
// {(() => {
//   if(!this.props.LearningContentItemData.votersYes.includes(this.props.LearningContentItemData.viewer)){
//     return(
//       <div className= 'voting-yes-no-vote'>
//         <Button bsStyle="success" className="vote-yes" onClick={this.props.LearningContentItemData.voteYes}>Yes</Button> <Button bsStyle="danger" onClick={this.props.LearningContentItemData.voteNo} className="vote-no">No</Button>
//       </div>
//     )
//   }else{
//     return(
//     <div className='vote-bar'>
//     <ProgressBar>
//       <ProgressBar bsStyle="success" now={100*(this.props.LearningContentItemData.votersYes.length )/(this.props.LearningContentItemData.votersYes.length+this.props.LearningContentItemData.votersNo.length  )}label={100*(this.props.LearningContentItemData.votersYes.length )/(this.props.LearningContentItemData.votersYes.length+this.props.LearningContentItemData.votersNo.length  )+`%`}  />
//       <ProgressBar bsStyle="danger" now={100*(this.props.LearningContentItemData.votersNo.length )/(this.props.LearningContentItemData.votersYes.length+this.props.LearningContentItemData.votersNo.length  )} label={100*(this.props.LearningContentItemData.votersNo.length )/(this.props.LearningContentItemData.votersYes.length+this.props.LearningContentItemData.votersNo.length  )+`%`} />
//     </ProgressBar>
//     </div>
//   )
//   }
// })()
//
// }
// </div>
