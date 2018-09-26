import React, {Component} from 'react';
import './Decks.css'

export default class Decks extends Component {
  constructor(props){
    super(props)
  }

  render(){
    return(
      <div className="decks-section wow fadeIn" data-wow-delay="0.4s" data-wow-offset="150" id="decks">
        <div className="border-w">
          <div className="line-g"></div>
          <div className="key"><img src="css/key2.png" /></div>
          <div className="heading">Session Materials</div>
          <div className="decks">
          </div>
        </div>
      </div>
    )
  }
}
