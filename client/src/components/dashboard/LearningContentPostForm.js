import React, { Component } from "react";
import {
  FormGroup,
  FormControl,
  ControlLabel
} from "react-bootstrap";
import LoaderButton from '../LoaderButton';
import "./LearningContentPostForm.css";

export class LearningContentPostForm extends Component {
  render() {
    return(
      <div>
      <form onSubmit={this.props.handleLearningContentPostFormSubmit}>
        <FormGroup controlId="fileName" bsSize="large">
          <ControlLabel>File Name</ControlLabel>
          <FormControl
            autoFocus
            type="Text"
            onChange={this.props.handleLearningContentPostChange}
            value={this.props.fileName}
            placeholder="Enter file name"
          />
          <FormControl.Feedback />
        </FormGroup>
        <FormGroup controlId="fileAttachment" bsSize="large">
          <ControlLabel>File</ControlLabel>
          <FormControl
          type="file"
          onChange={this.props.handleLearningContentFileChange}
          />
          <FormControl.Feedback />
        </FormGroup>
        <LoaderButton
          block
          bsSize="large"
          type="submit"
          isLoading={this.props.isLoading}
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
