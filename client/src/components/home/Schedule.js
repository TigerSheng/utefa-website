import React, {Component} from 'react';
import './Schedule.css'
import Iframe from 'react-iframe'

export default class Schedule extends Component {
  render() {
    return(
      <div className="schedule-main wow fadeIn" data-wow-delay="0.4s" data-wow-offset="150" id="schedule">
        <div className="border-w">
          <div className="line"></div>
          <div className="key"><img src="css/key2.png" alt="placeholder"/></div>
          <div className="heading">Schedule and Events</div>
            <div className="schedule">
              <Iframe 
                url="https://calendar.google.com/calendar/b/3/embed?height=600&amp;wkst=1&amp;ctz=America%2FToronto&amp;src=dXRlZmEyMDE5QGdtYWlsLmNvbQ&amp;color=%2322AA99&amp;showCalendars=0&amp;showTz=1&amp;showTabs=1&amp;showPrint=0&amp;showDate=1&amp;showNav=0&amp;showTitle=0&amp;title=UTEFA%20Club%20Calendar"
                width="1200px"
                height="720px"
                display="initial"
                position="relative"/>
            </div>
        </div>
      </div>
    )
  }
}
