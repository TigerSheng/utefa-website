import React, { Component } from 'react';
import {API} from 'aws-amplify';
import {Announcement} from './Announcement';
import './Dashboard.css';

export default class AnnouncementBlock extends Component {
  constructor(props){
    super(props);
    this.state = {
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
    };
  }

  async componentDidMount() {
    // this.setState({
    //   announcementsIsHidden:false,
    //   announcementData: [
    //     {
    //       title:"this is the title",
    //       date:"2018-09-12",
    //       time:"12:30 PM",
    //       content:"this will be all the content that you could ever want and more. I wonder what the limt will be.",
    //       owner:"Amr Mahmoud"
    //     },
    //     {
    //       title:"this is the other title",
    //       date:"2018-09-02",
    //       time:"11:30 PM",
    //       content:"this will be all the content that you could ever want and more. I wonder what the limt will be.",
    //       owner:"John Mahmoud"
    //     },
    //     {
    //       title:"this is the other title",
    //       date:"2018-09-02",
    //       time:"11:30 PM",
    //       content:"this will be all the content that you could ever want and more. I wonder what the limt will be.",
    //       owner:"John Mahmoud"
    //     }
    //   ]
    // });


    try{
      window.LOG_LEVEL = 'DEBUG'
      const init = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        }
      }
      const notes = await API.get('notes', '/notes', init);
      console.log(notes);
      this.setState({
        announcementData: notes,
        announcementsIsHidden: false
      });
    }catch(e){
      console.log(e);
      alert(e.message);
    }
  }

  toggleAnnouncementView = async event => {
    //potentially call the updateData function to refresh the data incase of changes (empty->not empty)
    this.setState({
      announcementsIsHidden: !this.state.announcementsIsHidden
    });
  }

  render(){
    return(
      <div>
        <div className="banner" onClick={this.toggleAnnouncementView.bind(this)}>Announcements</div>
        <div className={this.state.announcementsIsHidden ? 'hidden' : ''}>
          {
            this.state.announcementData.map((index, i) => {
              if(this.state.announcementData[i]
                && this.state.announcementData[i].owner !== "") {
                return(
                  <div key={i}>
                    <Announcement announcementData={this.state.announcementData[i]}/>
                  </div>
                )
              }else return(null);
            })
          }
          <div className="button-container">
            <button onClick= {this.updateData}>Load More</button>
          </div>
        </div>
      </div>
    );
  }
}
