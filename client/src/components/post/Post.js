import React, { Component } from 'react';
import './Post.css'
import {Auth, API} from 'aws-amplify';
import {LeftNav} from '../LeftNav'
import {AnnouncementPostForm} from './AnnouncementPostForm'
import {LearningContentPostForm} from './LearningContentPostForm'
import {VotePostForm} from './VotePostForm'
import { s3Upload } from "../../libs/awsLib";

export default class  Post extends Component {
  constructor(props) {
    super(props);
    this.state={
      title: "",
      content: "",
      isLoading: false,
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

  handleAnnouncementFileChange = event => {
    this.file = event.target.files[0];
  }

  handleLearningContentPostFormSubmit = async event => {
    event.preventDefault();
    this.setState({isLoading: true});

    // try {
    //   const attachment = this.file
    //         ? await s3Upload(this.file)
    //         : null;
    //
    //   await this.sendAnnouncement(
    //     this.state.title,
    //     this.state.content,
    //     attachment
    //   );
    // } catch (e) {
    //   alert(e);
    // }
    this.setState({ isLoading: false });
  }
  handleLearningContentPostChange = event => {
    this.setState({
      [event.target.id]: event.target.value
      });
  }

  handleLearningContentFileChange = event => {
    this.fileAttachment = event.target.files[0];
  }

  handleAnnouncementPostFormSubmit = async event => {
    event.preventDefault();
    this.setState({isLoading: true});

    try {
      const attachment = this.file
            ? await s3Upload(this.file)
            : null;

      await this.sendAnnouncement(
        this.state.title,
        this.state.content,
        attachment
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

  sendAnnouncement(title, content, attachment){
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
          "attachment": attachment,
          "pinned": false
        }
      }).then(response => {
        console.log(response);
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
      handleAnnouncementPostChange:this.handleAnnouncementPostChange,
      handleAnnouncementFileChange: this.handleAnnouncementFileChange
    };
    const votePostFormProps = {
      stock:this.state.stock,
      ticker:this.state.ticker,
      pitchAttachment:this.state.pitchAttachment,
      isLoading: this.state.isLoading,
      handleVotePostFormSubmit:this.handleVotePostFormSubmit,
      handleVotePostChange:this.handleVotePostFormChange
    };
    const learningContentPostFormProps = {
      fileName:this.fileName,
      fileAttachment: this.fileAttachment,
      description:this.description,
      handleLearningContentPostFormSubmit:this.handleLearningContentPostFormSubmit,
      handleLearningContentPostChange:this.handleLearningContentPostChange,
      handleLearningContentFileChange: this.handleLearningContentFileChange
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
          <div className="learning-content-post-container">
            <LearningContentPostForm {...learningContentPostFormProps}/>
          </div>
        </div>
      </div>
    );
  }

}
