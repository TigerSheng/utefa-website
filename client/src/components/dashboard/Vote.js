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
        pitch:null,
        datePosted:Date.now()
      },{
        ticker:"GOOGL",
        stock:"Google",
        votersYes:["john"],
        votersNo:["nada","joel"],
        pitch:null,
        datePosted:Date.now()
      }]
    }
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
