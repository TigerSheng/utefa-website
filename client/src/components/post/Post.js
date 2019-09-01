import React, { Component } from 'react';
import './Post.css'
import {
  Tabs,
  Tab
} from 'react-bootstrap'
import {LeftNav} from '../LeftNav'
import {AnnouncementPostForm} from './AnnouncementPostForm'
import {LearningContentPostForm} from './LearningContentPostForm'
import {VotePostForm} from './VotePostForm'

export default class  Post extends Component {
  render() {
    return(
      <div>
        <LeftNav userIsAdmin={this.props.userIsAdmin} isAdmin={this.props.isAdmin} userHasAuthenticated={this.props.userHasAuthenticated}/>
        <div className="background">
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
            <Tab eventKey={3} title="Post Material">
              <div className="learning-content-post-container">
                <LearningContentPostForm/>
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
      </div>
    );
  }

}
