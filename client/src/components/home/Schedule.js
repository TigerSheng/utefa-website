import React, {Component} from 'react';
import './Schedule.css'

export default class Schedule extends Component {
  render() {
    return(
      <div className="schedule-main wow fadeIn" data-wow-delay="0.4s" data-wow-offset="150" id="schedule">
        <div className="border-w">
          <div className="line"></div>
          <div className="key"><img src="css/key2.png" /></div>
          <div className="heading">Schedule and Events</div>
            <div className="schedule">
              <img src="decks/Schedule.jpg"/>
            </div>
        </div>
      </div>
    )
  }
}
