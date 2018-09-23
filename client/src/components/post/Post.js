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
    this.state = {
      isLoading: false,
      postAnnouncementSuccess: null,
      postVoteSuccess: null,
      title:'',
      content: '',
      ticker:'',
      stock: ''
    }
    this.file = null
  }
  componentDidMount(){
    const a = Auth.currentAuthenticatedUser();
    console.log(a);
  }

  handleAnnouncementPostChange = event => {
    this.setState({
      [event.target.id]: event.target.value,
      postAnnouncementSuccess: null
    });
  }

  handleFileChange = event => {
    this.file = event.target.files[0];
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
      )
    } catch (e) {
      console.log(e);
      this.setState({postAnnouncementSuccess: false})
    }
    this.setState({
      isLoading: false
    });
  }

  /* note body: {
    userId: req.body.userId,
    title: req.body.title,
    author: req.body.author,
    content: req.body.content,
    attachment: req.body.attachment,
     pinned: req.body.pinned
    } */

  sendAnnouncement(title, content, attachment){
    Auth.currentAuthenticatedUser().then(user => {
      API.post('api', '/notes', {
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
        this.setState({
          title: "",
          content: "",
          attachment: "",
          postAnnouncementSuccess: true
        })
        return
      })
    });
  }

  handleVotePostFormChange = event => {
    this.setState({
      [event.target.id]: event.target.value,
      postVoteSuccess: null
    });
  }

  // to post votes: POST at endpoint/votes/create
  handleVotePostFormSubmit = async event => {
    event.preventDefault();
    this.setState({isLoading: true});
    try{
      const attachment = this.file
            ? await s3Upload(this.file)
            : null;

      await this.sendVote(
        this.state.ticker,
        this.state.stock,
        attachment
      );
    }catch(e){
      console.log(e)
      this.setState({postVoteSuccess: false});
    }
    this.setState({isLoading: false});
  }

  sendVote(ticker, name, attachment) {
    API.post('api', '/votes/create', {
      header: {
        "Content-Type": "application/json"
      },
      body: {
        "ticker": ticker,
        "name": name,
        "attachment": attachment
      }
    }).then(response => {
      console.log(response);
      this.setState({
        stock: "",
        ticker: "",
        postvoteSuccess: true
      })
      return
    })
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
    const announcementPostFormProps = {
      title: this.state.title,
      content: this.state.content,
      isLoading: this.state.isLoading,
      attachment: this.state.attachment,
      handleAnnouncementPostFormSubmit:this.handleAnnouncementPostFormSubmit,
      handleAnnouncementPostChange:this.handleAnnouncementPostChange,
      handleAnnouncementFileChange: this.handleFileChange
    };
    const votePostFormProps = {
      stock:this.state.stock,
      ticker:this.state.ticker,
      pitchAttachment:this.state.pitchAttachment,
      isLoading: this.state.isLoading,
      handleVotePostFormSubmit:this.handleVotePostFormSubmit,
      handleVotePostChange:this.handleVotePostFormChange,
      handleVoteFileChange:this.handleFileChange
    };
    const learningContentPostFormProps = {
      fileName:this.fileName,
      fileAttachment: this.fileAttachment,
      description:this.description,
      handleLearningContentPostFormSubmit:this.handleLearningContentPostFormSubmit,
      handleLearningContentPostChange:this.handleLearningContentPostChange,
      handleLearningContentFileChange: this.handleFileChange
    };

    return(
      <div>
        <LeftNav/>
        <div className="post-view">
          <Tabs defaultActiveKey={1} id="post-forms">
            <Tab eventKey={1} title="Post Announcement">
              <div className="announcement-post-container">
                {this.state.postAnnouncementSuccess
                  && <Alert className="Alert" bsStyle='success'>
                      Your have successfully posted an announcement.
                    </Alert>
                }
                {this.state.postAnnouncementSuccess === false
                  && <Alert className="Alert" bsStyle="danger">
                      Something went wrong. Please try again,
                    </Alert>
                }
                <AnnouncementPostForm {...announcementPostFormProps}/>
              </div>
            </Tab>
            <Tab eventKey={2} title="Post Vote">
              <div className="vote-post-container">
                {this.state.postVoteSuccess
                  && <Alert className="Alert" bsStyle='success'>
                      Your have successfully posted a vote.
                    </Alert>
                }
                {this.state.postVoteSuccess === false
                  && <Alert className="Alert" bsStyle="danger">
                      Something went wrong. Please try again,
                    </Alert>
                }
                <VotePostForm {...votePostFormProps}/>
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
