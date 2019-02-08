import React, { Component } from 'react';
import './Vote.css'
import {API} from 'aws-amplify'
import {LeftNav} from '../LeftNav'
import {VotePost} from './VotePost'
import quickSort from './sort'
import ReactLoading from 'react-loading'
import Fade from 'react-reveal/Fade';

//helper function
const _MS_PER_DAY = 1000 * 60 * 60 * 24;
// a and b are javascript Date objects
function dateDiffInDays(a, b) {
  // Discard the time and time-zone information.
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
  }

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
      const now = new Date(Date.now())
      var historicalVotes=[]
      var recentVotes=[]
      for(var i in votes){
        console.log(votes[i])
        if(dateDiffInDays(new Date(votes[i].time),now)>14){
          historicalVotes.push(votes[i])
        }else{
          recentVotes.push(votes[i])
        }
      }
      this.setState({
        voteData: votes,
        historicalVotes:historicalVotes,
        recentVotes:recentVotes,
        showAll:false
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
  toggleHistoricalVotes = async event => {
    //potentially call the updateData function to refresh the data incase of changes (empty->not empty)
    this.setState({
      showAll: !this.state.showAll
    });
  }


  render(){
    return(
      <div className="vote-background">
        <LeftNav userIsAdmin={this.props.userIsAdmin} isAdmin={this.props.isAdmin} userHasAuthenticated={this.props.userHasAuthenticated}/>
        <Fade big cascade>
        <div className="vote-view">
        {this.state.isLoading && <div className="loadingcontainer"><ReactLoading type={'spinningBubbles'} className="loader" color={'black'} /></div>}
        {this.state.recentVotes && this.state.recentVotes.length !== 0 && this.state.recentVotes.map((index, i) => {
            if(this.state.recentVotes[i] && this.state.recentVotes[i].name !== "") {
              return(
                <div key={i}>
                  <VotePost votePostData={this.state.recentVotes[i]}
                  isAdmin={this.props.isAdmin}/>
                </div>
              )
            }else return(null);
          })
        }
        {this.state.historicalVotes && this.state.historicalVotes.length !== 0 &&
        <div className="banner" onClick={this.toggleHistoricalVotes.bind(this)}>
         Voting History
       </div>
     }
        {this.state.historicalVotes && this.state.historicalVotes.length !== 0 &&

           this.state.historicalVotes.map((index, i) => {
            if(this.state.historicalVotes[i] && this.state.historicalVotes[i].name !== "") {
              return(
                <div className={this.state.showAll? "":"hide"} key={i}>
                  <VotePost votePostData={this.state.historicalVotes[i]}
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
