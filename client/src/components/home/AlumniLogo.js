import React, {Component} from 'react';

export class AlumniLogo extends Component {
  render() {
    return(
      <div className="alum-logo-cont">
        <img className="alum-logo" alt="alumni" src={this.props.src}/>
      </div>
    );
  }
}
