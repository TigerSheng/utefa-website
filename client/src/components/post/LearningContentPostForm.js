import React, { Component } from "react";
import {
  Alert,
  FormGroup,
  FormControl,
  ControlLabel,
  Popover,
  OverlayTrigger,
  Checkbox
} from "react-bootstrap";
import {Auth, API} from 'aws-amplify'
import LoaderButton from '../LoaderButton';
import "./LearningContentPostForm.css";
import {s3Upload} from '../../libs/awsLib'

const postPolicy = (
  <Popover id="post-policy">
    New learning material should have a file name, a description
    and the associated attachment uploaded.
  </Popover>
)

export class LearningContentPostForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoading: false,
      name: '',
      description: '',
      postSuccess: null,
      attachment: false,
      isPublic: false
    }
    this.file = null
    this.handleCheck = this.handleCheck.bind(this)
  }

  validateForm() {
    return (
      this.state.name.length > 0 && this.state.description.length > 0
      && this.state.attachment
    )
  }

  handleFileChange = event => {
    this.file = event.target.files[0];
    if(this.file){
      this.setState({attachment: true})
    }else
      this.setState({attachment: false})
  }

  handleSubmit = async event => {
    event.preventDefault();
    this.setState({isLoading: true});

    try{
      const attachment = this.file
            ? await s3Upload(this.file)
            : null
      await this.sendContent(
        this.state.name,
        attachment,
        this.state.description,
        this.state.isPublic
      )
      this.file = null
      this.setState({attachment: false})
    }catch(e) {
      console.log(e);
      this.setState({postSuccess: false})
    }

    this.setState({ isLoading: false });
  }

  sendContent(name, attachment, description, isPublic){
    Auth.currentUserInfo().then(user => {
      API.post('api', '/learningcontent', {
        header: {
          "Content-Type": "application/json"
        },
        body: {
          "name": name,
          "attachment": attachment,
          "description": description,
          "author": user.attributes.name,
          "isPublic": isPublic
        }
      }).then(response => {
        console.log(response)
        this.setState({
          name: '',
          description: '',
          postSuccess: true
        })
      })
    })
  }

  handleCheck(event) {
    this.setState({
      isPublic: event.target.checked
    })
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value,
      postSuccess: null
    });
  }

  render() {
    console.log(this.state.isPublic)
    return(
      <div>
        {this.state.postSuccess
          && <Alert className="Alert" bsStyle='success'>
              Your have successfully posted learning materials.
            </Alert>
        }
        {this.state.postSuccess === false
          && <Alert className="Alert" bsStyle="danger">
              Something went wrong. Please try again,
            </Alert>
        }
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="name" bsSize="large">
            <ControlLabel>File Name</ControlLabel>
            <FormControl
              autoFocus
              type="Text"
              onChange={this.handleChange}
              value={this.state.name}
              placeholder="Enter file name"
            />
            <FormControl.Feedback />
          </FormGroup>
          <FormGroup controlId="description" bsSize="large">
            <ControlLabel>Description</ControlLabel>
            <FormControl componentClass="textarea"
              onChange={this.handleChange}
              placeholder="Enter file description"
              value={this.state.description}/>
            <FormControl.Feedback />
          </FormGroup>
          <Checkbox onChange={this.handleCheck}>Public Content</Checkbox>
          <FormGroup controlId="fileAttachment" bsSize="large">
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
              //disabled={!this.validateForm()}
              type="submit"
              isLoading={this.state.isLoading}
              text="Post"
              loadingText="Posting..."
              >
                Post
              </LoaderButton>
             : <OverlayTrigger
              trigger={['hover', 'focus']}
              placement='right'
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
    );
  }
}
