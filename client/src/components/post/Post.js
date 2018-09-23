import React, { Component } from 'react';
import './Post.css'
import {
  Alert,
  Tabs,
  Tab
} from 'react-bootstrap'
import {Auth, API} from 'aws-amplify';
import {LeftNav} from '../LeftNav'
import {AnnouncementPostForm} from './AnnouncementPostForm'
import {LearningContentPostForm} from './LearningContentPostForm'
import {VotePostForm} from './VotePostForm'
import { s3Upload } from "../../libs/awsLib";

export default class  Post extends Component {
  constructor(props) {
    super(props);
  }

  handleLearningContentFileChange = event => {
    this.file = event.target.files[0];
  }

  handleLearningContentPostFormSubmit = async event => {
    event.preventDefault();
    this.setState({isLoading: true});
    this.setState({ isLoading: false });
  }
  handleLearningContentPostChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  render() {
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
          <Tabs defaultActiveKey={1} id="post-forms">
            <Tab eventKey={1} title="Post Announcement">
              <div className="announcement-post-container">
                <AnnouncementPostForm/>
              </div>
            </Tab>
            <Tab eventKey={2} title="Post Vote">
              <div className="vote-post-container">
                <VotePostForm/>
              </div>
            </Tab>
            <Tab eventKey={3} title="Post Learning Material">
              <div className="learning-content-post-container">
                <LearningContentPostForm {...learningContentPostFormProps}/>
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
    );
  }

}
