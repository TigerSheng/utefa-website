import React, { Component } from 'react';
import './Vote.css'
import {LeftNav} from './LeftNav'
import {VotePost} from './VotePost'


export default class Vote extends Component {
  constructor(props) {
    super(props);
    this.state={
      voteData:[{
        ticker:"APPL",
        stock:"Apple",
        votersYes:["john","mark","ada"],
        votersNo:["nada","joel"],
        viewer:"mark",
        pitch:null,
        downloadLink:"https:www.google.com",
        voteYes: this.voteYes,
        voteNo: this.voteNo,
        datePosted:Date.now()
      },{
        ticker:"GOOGL",
        stock:"Google",
        votersYes:["john"],
        viewer:"mark",
        votersNo:["nada","joel"],
        pitch:null,
        voteYes: this.voteYes,
        voteNo: this.voteNo,
        downloadLink:"https:www.google.com",
        datePosted:Date.now()
      }]
    }
  }

  voteYes = async event => {
    //potentially call the updateData function to refresh the data incase of changes (empty->not empty)
    alert('voted yes!')
  }
  voteNo = async event => {
    //potentially call the updateData function to refresh the data incase of changes (empty->not empty)
    alert('voted no!')
  }
  render(){
    return(
      <div>
      <LeftNav/>

      <div className="vote-view">
      {
        this.state.voteData.map((index, i) => {
          if(this.state.voteData[i] && this.state.voteData[i].stock !== "") {
            console.log(this.state.voteData[i])
            return(
              <div key={i}>
              <VotePost votePostData={this.state.voteData[i]}/>
              </div>
            )
          }else return(null);
        }
      )
      }
      </div>
      </div>
    );
  }

}
