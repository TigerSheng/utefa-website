import React, {Component} from 'react';
import './Decks.css'

export default class Decks extends Component {
  render(){
    return(
      <div className="decks-section wow fadeIn" data-wow-delay="0.4s" data-wow-offset="150" id="materials">
        <div className="border-w">
          <div className="line"></div>
          <div className="key-g">
            <img src="css/key-g2.png"  alt="placeholder"/>
          </div>
          <div className="heading">Session Materials</div>
          <div className="decks">
            <div className="emphasis">
            <a className="emphasis" href="https://s3.us-east-2.amazonaws.com/utefa-client/01_UTEFA Info-Session.pdf" rel="noopener noreferrer" target="_blank" title="01 - Info Session">Meeting 1 - Info Session</a>
            </div>
          </div>
          {/* <div className="decks">
            <div className="emphasis">
              <a className="emphasis" href="https://s3.us-east-2.amazonaws.com/utefa-client/01_UTEFA-Info-Session.pdf" rel="noopener noreferrer" target="_blank" title="01 - Info Session">01 - Info Session</a>
            </div>
          </div> */}
        </div>
      </div>
    )
  }
}
