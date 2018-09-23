import React, { Component } from 'react';
import './Vote.css'
import {Auth, API} from 'aws-amplify'
import {LeftNav} from '../LeftNav'
import {VotePost} from './VotePost'
import quickSort from './sort'


export default class Vote extends Component {
  constructor(props) {
    super(props);
    this.state={
      voteData:[]
    }
  }

  async componentDidMount() {
    try{
      const votes = await this.getVotes();
      console.log(votes)
      quickSort(votes, 0, votes.length-1);
      votes.reverse();
      console.log(votes)
      this.setState({
        voteData: votes
      })
    }catch(e){
      console.log(e)
      alert(e.message)
    }
  }

  getVotes(){
    return API.get('api', '/votes')
  }

  render(){
    return(
      <div>
        <LeftNav/>
        <div className="vote-view">
        {
          this.state.voteData.length !== 0 && this.state.voteData.map((index, i) => {
            if(this.state.voteData[i] && this.state.voteData[i].name !== "") {
              return(
                <div key={i}>
                  <VotePost votePostData={this.state.voteData[i]}/>
                </div>
              )
            }else return(null);
          })
        }
        </div>
      </div>
    );
  }

}
