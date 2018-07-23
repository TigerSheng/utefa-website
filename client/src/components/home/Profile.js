import React, {Component} from 'react';

export class Profile extends Component {
  render () {
    return(
      <div className="profile">
        <img className="profile-pic" alt="profile" src={this.props.src} />
        <div className="name">{this.props.children}</div>
        <div className="team-line"></div>
        <div className="title">{this.props.title}</div>
      </div>
    );
  }
}

Profile.defaultProps = { src: './images/profile-placeholder.jpg'};
