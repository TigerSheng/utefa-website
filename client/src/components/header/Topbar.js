import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './Topbar.css'

export class Topbar extends Component {
  render() {
    return (<div id="top" className="top1">
    <div className="logo-container">
      <Link to='/'>
        <img id="logo" className="animated fadeInDown" src='./images/UTEFA_LOGO.png'/>
      </Link>
      </div>
    </div>);
  }
}
