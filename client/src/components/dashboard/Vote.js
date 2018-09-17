import React, { Component } from 'react';
import './Vote.css'
import {Auth} from 'aws-amplify';
import {LeftNav} from './LeftNav'


export default class Vote extends Component {
  constructor(props) {
    super(props);
  }


  render(){
    return(
      <div>
      <LeftNav/>
      <div className="vote-view">

      </div>
      </div>
    );
  }

}
