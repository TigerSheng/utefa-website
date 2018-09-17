import React, { Component } from "react";
import {
  HelpBlock,
  FormGroup,
  FormControl,
  ControlLabel,
  Alert,
  Popover,
  OverlayTrigger
} from "react-bootstrap";
import LoaderButton from '../LoaderButton';
import "./VotePostForm.css";

export class VotePostForm extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return(
      <div>
      <form onSubmit={this.props.handleVotePostFormSubmit}>
        <FormGroup controlId="stock" bsSize="large">
          <ControlLabel>Stock Name</ControlLabel>
          <FormControl
            autoFocus
            type="Text"
            onChange={this.props.handleVotePostChange}
            value={this.props.stock}
            placeholder="Ex. Apple Inc."
          />
          <FormControl.Feedback />
        </FormGroup>
        <FormGroup controlId="ticker" bsSize="large">
          <ControlLabel>Ticker</ControlLabel>
          <FormControl
            autoFocus
            type="Text"
            onChange={this.props.handleVotePostChange}
            value={this.props.ticker}
            placeholder="Ex. APPL"
          />
          <FormControl.Feedback />
        </FormGroup>
        <FormGroup controlId="pitchAttachment" bsSize="large">
          <ControlLabel>Presentation</ControlLabel>
          <FormControl
          type="file"
          onChange={this.props.handleVotePostChange}
          value={this.props.pitchAttachment}/>
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
