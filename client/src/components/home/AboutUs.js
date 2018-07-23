import React, {Component} from 'react';

export class AboutUs extends Component {
  render() {
    return (
      <div className="wow fadeIn" data-wow-delay="0.4s" data-wow-offset="150" id="about">
        <div className="border-w">
          <div className="line"></div>
          <div className="key-g">
            <img src="css/key-g2.png" />
          </div>
          <div className="heading">About Us</div>
          <div className="emphasis">We are the only engineering finance association.
          </div>
          <div className="about-con">
            The University of Toronto Engineering Finance Association (UTEFA) is an educational organization that aims to provide students with extensive knowledge about the financial industry by engaging them in investing activities. Since our inception in 2009-2010 UTEFA has grown to more than 55 active and invested members. <br/><br/>
            <div className="mission_statement">
              <div className="mission">Our Mission</div>"
                Provide an opportunity for students to study and understand various sectors of the market through
                engaging in investing activities."
            </div>
            We believe the best way to learn, whether the student is an experienced investor or completely new to the stock market, is to take risks and to execute actual investments. As a club we study and invest in companies both from a quantitative and qualitative perspective.
          </div>
        </div>
      </div>
    );
  }
}
