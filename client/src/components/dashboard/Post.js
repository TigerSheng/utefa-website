import React, { Component } from 'react';
import './Post.css'
import {Auth} from 'aws-amplify';
import {LeftNav} from './LeftNav'
import {AnnouncementPostForm} from './AnnouncementPostForm'

export default class  Post extends Component {
  constructor(props) {
    super(props);
    this.state={
      title: "",
      content: "",
      isLoading: false,
      attachment: ""
    }
  }

  handleAnnouncementPostChange = event => {
    this.setState({
      [event.target.id]: event.target.value
      });
  }


  handleAnnouncementPostFormSubmit = async event => {
    event.preventDefault();
    this.setState({isLoading: true});
    this.setState({
      title:this.state.title,
      content:this.state.content,
      attachment:this.state.attachment
    });

    console.log(this.state)
      this.setState({isLoading: false});
    }

  render() {
    const announcementPostFormProps = {
      title: this.state.title,
      content: this.state.content,
      isLoading: this.state.isLoading,
      attachment: this.state.attachment,
      handleAnnouncementPostFormSubmit:this.handleAnnouncementPostFormSubmit,
      handleAnnouncementPostChange:this.handleAnnouncementPostChange
    };
    return(
      <div>
      <LeftNav/>
      <div className="post-view">
      <div className="announcement-post-container">
        <AnnouncementPostForm {...announcementPostFormProps}/>
      </div>
      </div>
      </div>

    );
  }

}
