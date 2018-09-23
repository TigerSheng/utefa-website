import React, { Component } from "react";
import {
  FormGroup,
  FormControl,
  ControlLabel
} from "react-bootstrap";
import LoaderButton from '../LoaderButton';
import "./VotePostForm.css";

export class VotePostForm extends Component {
  render() {
    return(
      <div>
      <form onSubmit={this.props.handleVotePostFormSubmit}>
        <FormGroup controlId="stock" bsSize="large">
          <ControlLabel>Stock Name</ControlLabel>
          <FormControl
            autoFocus
            type="Text"
            className= "stock-name-input"
            onChange={this.props.handleVotePostChange}
            value={this.props.stock}
            placeholder="EX. Apple Inc."
          />
          <FormControl.Feedback />
        </FormGroup>
        <FormGroup controlId="ticker" bsSize="large">
          <ControlLabel>Ticker</ControlLabel>
          <FormControl
            autoFocus
            type="Text"
            className="stock-ticker-input"
            onChange={this.props.handleVotePostChange}
            value={this.props.ticker}
            placeholder="EX. APPL"
          />
          <FormControl.Feedback />
        </FormGroup>
        <FormGroup controlId="pitchAttachment" bsSize="large">
          <ControlLabel>Presentation</ControlLabel>
          <FormControl
          type="file"
          onChange={this.props.handleVotePostChange}
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
