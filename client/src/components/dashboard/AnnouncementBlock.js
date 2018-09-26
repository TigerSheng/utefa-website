import React, { Component } from 'react';
import {Auth, API} from 'aws-amplify';
import {Announcement} from './Announcement';
import './Dashboard.css';
import quickSort from "./sort"
var index = 5;
export default class AnnouncementBlock extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoading: false,
      announcements:[],
      allAnnouncements:[]
    };
  }

  async componentDidMount() {
    this.setState({isLoading: true})
    try{
      const announcements = await this.updateData();
      console.log(announcements);
      quickSort(announcements, 0, announcements.length-1)
      announcements.reverse();
      this.setState({
        announcements:announcements.slice(0,index),
        allAnnouncements:announcements,
        announcementsIsHidden: false
      });
    }catch(e){
      console.log(e);
      alert(e.message);
    }
    this.setState({isLoading: false})
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
    return API.get('api', '/notes', init)
  }

  loadMore=async event=>{
    index+=5;
    this.setState({
      announcements:this.state.allAnnouncements.slice(0,index),
      announcementsIsHidden: false
    });
  }
  render(){
    return(
      <div>
        <div className="banner" onClick={this.toggleAnnouncementView.bind(this)}>
          Announcements
        </div>
        {this.state.isLoading && <h1>Loading...</h1>}
        <div className={this.state.announcementsIsHidden ? 'hidden' : ''}>
          {
            this.state.announcements.map((index, i) => {
              if(this.state.announcements[i]) {
                return(
                  <div key={i}>
                    <Announcement
                      announcementData={this.state.announcements[i]}
                      isAdmin={this.props.isAdmin}
                    />
                  </div>
                )
              }else return(null);
            })
          }
          <div className="button-container">
            <button onClick= {this.loadMore.bind(this)}>
              Load More
            </button>
          </div>
        </div>
      </div>
    );
  }
}
