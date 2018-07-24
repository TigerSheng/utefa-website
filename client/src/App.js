import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Routes from './Routes';

import {Topbar} from './components/header/Topbar'

class App extends Component {
  render() {
    return (
      <div>
        <Topbar />
        <Routes />
      </div>
    );
  }
}

export default App;
