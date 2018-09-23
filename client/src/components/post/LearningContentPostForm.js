import React, { Component } from "react";
import {
  FormGroup,
  FormControl,
  ControlLabel
} from "react-bootstrap";
import LoaderButton from '../LoaderButton';
import "./LearningContentPostForm.css";

export class LearningContentPostForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoading: false,
      fileName: "",
      description: ''
    }
    this.file = null
  }

  handleFileChange = event => {
    this.file = event.target.files[0];
  }

  handleSubmit = async event => {
    event.preventDefault();
    this.setState({isLoading: true});
    this.setState({ isLoading: false });
  }
  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  render() {
    return(
      <div>
      <form onSubmit={this.handleSubmit}>
        <FormGroup controlId="fileName" bsSize="large">
          <ControlLabel>File Name</ControlLabel>
          <FormControl
            autoFocus
            type="Text"
            onChange={this.handleChange}
            value={this.state.fileName}
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
