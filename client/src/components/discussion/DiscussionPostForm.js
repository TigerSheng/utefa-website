import React, { Component } from "react";
import {
  Alert,
  FormGroup,
  FormControl,
  ControlLabel,
  Popover,
  OverlayTrigger
} from "react-bootstrap";

import {Button, Modal, ModalHeader} from "react-bootstrap";
import {Auth, API} from 'aws-amplify';
import LoaderButton from '../LoaderButton';
import { s3Upload } from "../../libs/awsLib";

const postPolicy = (
  <Popover id="post-policy">
    Discussion should have a title and some content.
  </Popover>
)

export class DiscussionPostForm extends Component {
  constructor(props){
    super(props)
    this.state = {
      isLoading: false,
      title: "",
      content: '',
      postSuccess: null,
    }
    this.file = null
  }

  validateForm() {
    return this.state.title.length > 0 && this.state.content.length > 0;
  }

  handleFileChange = event => {
    this.file = event.target.files[0];
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value,
      postSuccess: null
    });
  }

  handleSubmit = async event => {
    event.preventDefault();
    this.setState({isLoading: true});

    try {
      const attachment = this.file
            ? await s3Upload(this.file)
            : null;

      await this.sendDiscussion(
        this.state.title,
        this.state.content,
        attachment
      )
      this.file = null
    } catch (e) {
      console.log(e);
      this.setState({postSuccess: false})
    }
    this.setState({
      isLoading: false
    });
  }

  sendDiscussion(title, content, attachment){
    Auth.currentAuthenticatedUser().then(user => {
      API.post('api', '/discussion', {
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
          postSuccess: true
        })
        this.props.closeDiscussionCreator()
        window.location.reload()
        return
      })
    });
  }

  render() {
    return(      
      <Modal bsSize="large" show={this.props.discussionCreator}>
      <ModalHeader><Button bsStyle="danger" onClick={this.props.closeDiscussionCreator}>x</Button></ModalHeader>
      <div>
        {this.state.postSuccess
          && <Alert className="Alert" bsStyle='success'>
              Your have successfully posted an discussion.
            </Alert>
        }
        {this.state.postSuccess === false
          && <Alert className="Alert" bsStyle="danger">
              Something went wrong. Please try again,
            </Alert>
        }
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="title" bsSize="large">
            <ControlLabel>Title</ControlLabel>
            <FormControl
              autoFocus
              type="Text"
              onChange={this.handleChange}
              value={this.state.title}
              placeholder="Enter title"
            />
            <FormControl.Feedback />
          </FormGroup>
          <FormGroup controlId="content" bsSize="large">
            <ControlLabel>Content</ControlLabel>
            <FormControl componentClass="textarea"
            onChange={this.handleChange}
             placeholder="Place content here..."
             value={this.state.content}/>
            <FormControl.Feedback />
          </FormGroup>
          <FormGroup controlId="attachment" bsSize="large">
            <ControlLabel>File</ControlLabel>
            <FormControl
            type="file"
            onChange={this.handleFileChange}
            />
            <FormControl.Feedback />
          </FormGroup>
          {this.validateForm()
            ? <LoaderButton
              block
              bsSize="large"
              type="submit"
              isLoading={this.state.isLoading}
              text="Post"
              loadingText="Posting..."
              >
                Post
              </LoaderButton>
             : <OverlayTrigger
              trigger={['hover', 'focus']}
              placement='bottom'
              overlay={postPolicy}
              >
                <div style={{ display: 'inline-block', cursor: 'not-allowed',
                width: '100%' }}>
                  <LoaderButton
                    block
                    bsSize="large"
                    disabled={!this.validateForm()}
                    type="submit"
                    isLoading={this.state.isLoading}
                    text="Post"
                    loadingText="Posting..."
                    style={{ pointerEvents: 'none' }}
                  >
                    Post
                  </LoaderButton>
                </div>
              </OverlayTrigger>
            }
        </form>
      </div>
      </Modal>
    );
  }
}
