import React, { Component } from 'react';
import {API} from 'aws-amplify';
import {Announcement} from './Announcement';
import './Dashboard.css';

export default class AnnouncementBlock extends Component {
  constructor(props){
    super(props);
    this.state = {
      announcements:[
      ]
    };
  }

  async componentDidMount() {
    try{

      const announcements = await this.updateData();
      console.log(announcements);
      this.setState({
        announcements,
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

  updateData(){
    const init = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      }
    }
    return API.get('notes', '/notes', init)
  }

  render(){
    return(
      <div>
        <div className="banner" onClick={this.toggleAnnouncementView.bind(this)}>
          Announcements
        </div>
        <div className={this.state.announcementsIsHidden ? 'hidden' : ''}>
          {
            this.state.announcements.map((index, i) => {
              if(this.state.announcements[i]) {
                return(
                  <div key={i}>
                    <Announcement announcementData={this.state.announcements[i]}/>
                  </div>
                )
              }else return(null);
            })
          }
          <div className="button-container">
            <button onClick= {this.updateData}>
              Load More
            </button>
          </div>
        </div>
      </div>
    );
  }
}