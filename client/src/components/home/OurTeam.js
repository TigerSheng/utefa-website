import React, {Component} from 'react';
import {Profile} from './Profile';
import "./OurTeam.css";
const imgDir = "./images/";

const pictures = {
  yuri: imgDir + "Lawryshyn.jpg",
  tiger: imgDir + "Tiger.jpg",
  talal: imgDir + "Talal.jpg",
  matthew: imgDir + "Matthew.jpg",
  matteo: imgDir + "Matteo.jpg",
};

const titles = {
  tiger: "President",
  michael: "VP Finance",
  matteo: "VP Operations",
  diana: "VP Communications",
  julian: "VP Technology",
  talal: "Head Economist",
  matthew: "Head Analyst",
  yuri: "Advisor"
};

export class OurTeam extends Component {
  render(){
    return(
      <div className="wow fadeIn" data-wow-delay="0.4s"  id="team">
        <div className="border-g">
          <div className="line-g"></div>
          <div className="key3"><img alt='placeholder' src="css/key3.png"/></div>
          <div className="heading-w">Our Team</div>
          <div className="emphasis-b">Meet our team of executives for 2019-2020</div>
          <div className="t-cont">
            <Profile src={pictures.yuri} title={titles.yuri}>Prof. Lawryshyn</Profile>
            <Profile src={pictures.tiger} title={titles.tiger}>Tiger Sheng</Profile>
            <Profile src={pictures.talal} title={titles.talal}>Talal Fahoum</Profile>
            <Profile src={pictures.matthew} title={titles.matthew}>Matthew Byra</Profile>
            <Profile src={pictures.matteo} title={titles.matteo}> Matteo Ciserani</Profile>
            <Profile title={titles.michael}>Michael Travis</Profile>
            <Profile title={titles.diana}>Diana Escoboza</Profile>
            <Profile title={titles.julian}>Julian Zhang</Profile>
          </div>
        </div>
      </div>
    );
  }
}
