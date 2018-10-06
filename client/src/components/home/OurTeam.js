import React, {Component} from 'react';
import {Profile} from './Profile';

const imgDir = "./images/";

const pictures = {
  stefan: imgDir + "Stefan.jpg",
  eric: imgDir + "Eric.jpg",
  yuri: imgDir + "Lawryshyn.jpg",
  tiger: imgDir + "Tiger.jpg",
  tom: imgDir + "Tom.jpg",
  ameer: imgDir + "Ameer.jpg"
};

const titles = {
  stefan: "President",
  ameer: "Head Analyst",
  eric: "VP External",
  michael: "VP Finance",
  tiger: "VP Operations",
  ita: "VP Interal",
  tom: "Head Economist",
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
          <div className="emphasis-b">Meet our team of executives for 2018-2019.</div>
          <div className="t-cont">
            <Profile src={pictures.stefan} title={titles.stefan}>
              Stefan Momic
            </Profile>
            <Profile src={pictures.ameer} title={titles.ameer}>Ameer Shaikh</Profile>
            <Profile src={pictures.eric} title={titles.eric}>
              Eric Boszin
            </Profile>
            <Profile title={titles.michael}>Michael Travis</Profile>
            <Profile src={pictures.tiger} title={titles.tiger}>
              Tiger Sheng
            </Profile>
            <Profile title={titles.ita}>Ita Zaporozhets</Profile>
            <Profile src={pictures.tom} title={titles.tom}>Tom Qi</Profile>
            <Profile src={pictures.yuri} title={titles.yuri}>
              Prof. Lawryshyn
            </Profile>
          </div>
        </div>
      </div>
    );
  }
}
