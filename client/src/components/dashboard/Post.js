import React, { Component } from 'react';
import './Post.css'
import {Auth, API} from 'aws-amplify';
import {LeftNav} from './LeftNav'
import {AnnouncementPostForm} from './AnnouncementPostForm'
import {VotePostForm} from './VotePostForm'

export default class  Post extends Component {
  constructor(props) {
    super(props);
    this.state={
      title: "",
      content: "",
      isLoading: false,
      attachment: "",
      stock:"",
      ticker:"",
      pitchAttachment:""
    }
  }

  componentDidMount(){
    const a = Auth.currentAuthenticatedUser();
    console.log(a);
  }

  handleAnnouncementPostChange = event => {
    this.setState({
      [event.target.id]: event.target.value
      });
  }


  handleAnnouncementPostFormSubmit = async event => {
    event.preventDefault();
    this.setState({isLoading: true});

    try {
      await this.sendAnnouncement(
        this.state.title,
        this.state.content
      );
    } catch (e) {
      alert(e);
    }
    this.setState({ isLoading: false });
  }

  // note body: {
  //   userId: req.body.userId,
  //   title: req.body.title,
  //   author: req.body.author,
  //   content: req.body.content,
  //   attachment: req.body.attachment,
  //   pinned: req.body.pinned
  // }
  sendAnnouncement(title, content){
    Auth.currentAuthenticatedUser().then(user => {
      API.post('notes', '/notes', {
        header: {
          "Content-Type": "application/json"
        },
        body: {
          "userId": user.username,
          "title": title,
          "author": user.attributes.name,
          "content": content,
          "attachment": null,
          "pinned": false
        }
      }).then(response => {
        console.log(response);
        return
      })
      .catch(error => {
        console.log(error)
        return
      })
    });
  }

  handleVotePostFormChange = event => {
    this.setState({
      [event.target.id]: event.target.value
      });
  }


  handleVotePostFormSubmit = async event => {
    event.preventDefault();
    this.setState({isLoading: true});
    this.setState({
      stock:this.state.stock,
      ticker:this.state.ticker,
      pitchAttachment:this.state.pitchAttachment
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
    const votePostFormProps = {
      stock:this.state.stock,
      ticker:this.state.ticker,
      pitchAttachment:this.state.pitchAttachment,
      isLoading: this.state.isLoading,
      handleVotePostFormSubmit:this.handleVotePostFormSubmit,
      handleVotePostChange:this.handleVotePostFormChange
    };
    return(
      <div>
      <LeftNav/>
      <div className="post-view">
      <div className="announcement-post-container">
        <AnnouncementPostForm {...announcementPostFormProps}/>
      </div>
      <div className="vote-post-container">
        <VotePostForm {...votePostFormProps}/>
      </div>
      </div>
      </div>

    );
  }

}
