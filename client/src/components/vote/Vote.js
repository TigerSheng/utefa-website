import React, { Component } from 'react';
import './Vote.css'
import {Auth, API} from 'aws-amplify'
import {LeftNav} from '../LeftNav'
import {VotePost} from './VotePost'
import quickSort from './sort'
import ReactLoading from 'react-loading'


export default class Vote extends Component {
  constructor(props) {
    super(props);
    this.state={
      voteData:[],
      isLoading: false
    }
  }

  async componentDidMount() {
    this.setState({isLoading: true})
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
    this.setState({isLoading: false})
  }

  getVotes(){
    return API.get('api', '/votes')
  }

  render(){
    return(
      <div>
        <LeftNav isAdmin={this.props.isAdmin}/>
        <div className="vote-view">
        {this.state.isLoading && <ReactLoading type={'spin'} color={'black'} />}
        {
          this.state.voteData.length !== 0 && this.state.voteData.map((index, i) => {
            if(this.state.voteData[i] && this.state.voteData[i].name !== "") {
              return(
                <div key={i}>
                  <VotePost votePostData={this.state.voteData[i]}
                  isAdmin={this.props.isAdmin}/>
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
