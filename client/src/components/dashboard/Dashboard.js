import React, { Component } from 'react';
import {Auth} from 'aws-amplify';
import {LeftNav} from './LeftNav'
import './Dashboard.css'
import {Announcement} from './Announcement'

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state={

      announcementData:[
        {
          title:"this is the title",
          date:"2018-09-12",
          time:"12:30 PM",
          content:"this will be all the content that you could ever want and more. I wonder what the limt will be.",
          owner:"Amr Mahmoud"
        },
        {
          title:"this is the other title",
          date:"2018-09-02",
          time:"11:30 PM",
          content:"this will be all the content that you could ever want and more. I wonder what the limt will be.",
          owner:"John Mahmoud"
        }
    ]
    }
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout = async (event) => {
    await Auth.signOut();
    this.props.userHasAuthenticated(false);
  }


  render(){
    return(
      <div>
      <LeftNav/>
      <div className="main-view">
      {
            this.state.announcementData.map((index, i) => {
              if(this.state.announcementData[i] && this.state.announcementData[i].owner != "") {
              return(
                <div key={i}>
                <Announcement announcementData={this.state.announcementData[i]}/>
                </div>
              )
            }

            }
          )
          }
          <button>Load More</button>
      </div>
      </div>

    );
  }
}
