import React, {Component} from 'react';
import {AlumniLogo} from './AlumniLogo';

const imgDir = './images/';

const logos = [
  imgDir + 'AQR_Logo.jpg',
  imgDir + 'BAML.jpg',
  imgDir + 'BMO.png',
  imgDir + 'cibc.jpg',
  imgDir + 'cppib.png',
  imgDir + 'deloitte.png',
  imgDir + 'ebay.png',
  imgDir + 'facebook.png',
  imgDir + 'franco.png',
  imgDir + 'goldman.jpg',
  imgDir + 'ion.jpg',
  imgDir + 'mslogo.png',
  imgDir + 'otpp.png',
  imgDir + 'palantir.png',
  imgDir + 'rbccm.jpg'
];

export class OurAlumni extends Component {
  render() {
    const logoDivs = logos.map((logo, index) => {
      return <AlumniLogo key={index} src={logo}/>
    });

    return(
      <div className="wow fadeIn" data-wow-delay="0.4s" id="alumni">
        <div className="border-w">
          <div className="line"></div>
          <div className="key"><img alt="placeholder" src="css/key2.png"/></div>
          <div className="heading">Our Alumni</div>
          <div className="emphasis">
            Check out where our alumni can be found.
          </div>
          <div className="alumni-cont">
            {logoDivs}
          </div>
        </div>
      </div>
    );
  }
}
