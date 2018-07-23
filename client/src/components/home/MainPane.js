import React, {Component} from 'react';

export class MainPane extends Component {
  render() {
    return(
      <div className="main">
        <div className="animated fadeInLeft abb">University of Toronto<br/>Engineering Finance Association</div>
        <div className="animated fadeInRight slogan">Envision, Believe, Invest</div>
        <div className="animated fadeInUp learn"><a href="#about">Learn More</a></div>
      </div>
    );
  }
}
