import React, { Component } from "react";
import {
  FormGroup,
  FormControl,
  ControlLabel
} from "react-bootstrap";
import LoaderButton from '../LoaderButton';
import "./AnnouncementPostForm.css";

export class AnnouncementPostForm extends Component {
  render() {
    return(
      <div>
      <form onSubmit={this.props.handleAnnouncementPostFormSubmit}>
        <FormGroup controlId="title" bsSize="large">
          <ControlLabel>Title</ControlLabel>
          <FormControl
            autoFocus
            type="Text"
            onChange={this.props.handleAnnouncementPostChange}
            value={this.props.title}
            placeholder="Enter title"
          />
          <FormControl.Feedback />
        </FormGroup>
        <FormGroup controlId="content" bsSize="large">
          <ControlLabel>Content</ControlLabel>
          <FormControl componentClass="textarea"
          onChange={this.props.handleAnnouncementPostChange}
           placeholder="Place content here..."
           value={this.props.content}/>
          <FormControl.Feedback />
        </FormGroup>
        <FormGroup controlId="attachment" bsSize="large">
          <ControlLabel>File</ControlLabel>
          <FormControl
          type="file"
          onChange={this.props.handleAnnouncementPostChange}
          value={this.props.attachment}/>
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
