import React, { Component } from 'react';
import './Vote.css'
import {API} from 'aws-amplify'
import {LeftNav} from '../LeftNav'
import {VotePost} from './VotePost'
import quickSort from './sort'
import ReactLoading from 'react-loading'
import Fade from 'react-reveal/Fade';


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
      quickSort(votes, 0, votes.length-1);
      votes.reverse();
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
      <div className="vote-background">
        <LeftNav isAdmin={this.props.isAdmin} userHasAuthenticated={this.props.userHasAuthenticated}/>
        <Fade big cascade>
        <div className="vote-view">
        {this.state.isLoading && <div className="loadingcontainer"><ReactLoading type={'spinningBubbles'} className="loader" color={'black'} /></div>}
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
        </Fade>
      </div>
    );
  }

}
