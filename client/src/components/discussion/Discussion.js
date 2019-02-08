import React, { Component } from 'react';
import {LeftNav} from '../LeftNav'
import './Discussion.css'

import DiscussionBlock from './DiscussionBlock';

export default class Discussion extends Component {
  constructor(props){
    super(props);
    this.state = {
        isLoading: false,
    };
  } 

  render(){
    return(
      <div className="background">
        <LeftNav userIsAdmin={this.props.userIsAdmin} isAdmin={this.props.isAdmin} userHasAuthenticated={this.props.userHasAuthenticated}/>
          <div className="main-view">
          <DiscussionBlock
            history={this.props.history}
            isAdmin={this.props.isAdmin}/>
          </div>
      </div>
      
    );
  }
}
