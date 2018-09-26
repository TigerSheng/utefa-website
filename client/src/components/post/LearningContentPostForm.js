import React, { Component } from "react";
import {
  Alert,
  FormGroup,
  FormControl,
  ControlLabel
} from "react-bootstrap";
import {Auth, API} from 'aws-amplify'
import LoaderButton from '../LoaderButton';
import "./LearningContentPostForm.css";
import {s3Upload} from '../../libs/awsLib'

export class LearningContentPostForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoading: false,
      name: '',
      description: '',
      postSuccess: null
    }
    this.file = null
  }

  handleFileChange = event => {
    this.file = event.target.files[0];
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
        this.state.description
      )
      this.file = null
    }catch(e) {
      console.log(e);
      this.setState({postSuccess: false})
    }

    this.setState({ isLoading: false });
  }

  sendContent(name, attachment, description){
    Auth.currentUserInfo().then(user => {
      API.post('api', '/learningcontent', {
        header: {
          "Content-Type": "application/json"
        },
        body: {
          "name": name,
          "attachment": attachment,
          "description": description,
          "author": user.attributes.name
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

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value,
      postSuccess: null
    });
  }

  render() {
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
          <FormGroup controlId="fileAttachment" bsSize="large">
            <ControlLabel>File</ControlLabel>
            <FormControl
            type="file"
            onChange={this.handleFileChange}
            />
            <FormControl.Feedback />
          </FormGroup>
          <LoaderButton
            block
            bsSize="large"
            type="submit"
            isLoading={this.state.isLoading}
            text="Post"
            loadingText="Posting..."
          >
            Post
          </LoaderButton>
        </form>
      </div>
    );
  }
}
