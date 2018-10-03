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
          <div className="line"></div>
          <div className="key-g">
            <img src="css/key-g2.png"  alt="placeholder"/>
          </div>
          <div className="heading">Session Materials</div>
          <div className="decks">
            <div className="emphasis">
              <a className="emphasis" href="decks/01_UTEFA-Info-Session.pdf" target="_blank" title="01 - Info Session">01 - Info Session</a>
            </div>
            <div className="emphasis">
              <a className="emphasis" href="decks/02_UTEFA-Learning-Session-1.pdf" target="_blank" title="02 - Learning Session Part 1">02 - Learning Session Part 1</a>
            </div>
            <div className="emphasis">
              <a className="emphasis" href="decks/02_UTEFA-Learning-Session-1-Accounting-Solutions.pdf" target="_blank" title="02 - Learning Session 1: Accounting-Solutions">02 - Learning Session 1: Accounting-Solutions</a>
            </div>
            <div className="emphasis">
              <a className="emphasis" href="decks/03_UTEFA-Learning-Session-2.pdf" target="_blank" title="03 - Learning Session Part 2">03 - Learning Session Part 2</a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
