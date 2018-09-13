import React, {Component} from 'react';
import "./Footer.css";

export class Footer extends Component {
  render() {
    return(
      <div className="footer">
        <div className="bot-nav">
          <a href="/">Home</a>|
          <a href="/#about">About</a>|
          <a href="/#team">Team</a>|
          <a href="/#alumni">Alumni</a>|
          <a href="mailto:utefa@ecf.utoronto.ca">Email Us</a>
        </div>
        <div className="copy">© 2018 UTEFA</div>
      </div>
    );
  }
}
