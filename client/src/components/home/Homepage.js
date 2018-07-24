import React, {Component} from 'react';

import {NavBar} from '../NavBar'
import {MainPane} from './MainPane';
import {AboutUs} from './AboutUs';
import {OurTeam} from './OurTeam';
import {OurAlumni} from './OurAlumni';
import {Footer} from './Footer';

export class Homepage extends Component {
  render(){
    return(
      <div>
        <NavBar
          isAuthenticated={this.props.isAuthenticated}
          userHasAuthenticated={this.props.userHasAuthenticated}
        />
        <MainPane />
        <div className="break"></div>
        <AboutUs />
        <div className="break"></div>
        <OurTeam />
        <div className="break"></div>
        <OurAlumni />
        <div className="break"></div>
        <Footer />
      </div>
    );
  }
}
