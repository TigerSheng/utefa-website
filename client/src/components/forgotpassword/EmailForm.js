import React, { Component } from 'react';
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

//form with username
export default class EmailForm extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
        {this.props.userExistWarning !== null
          ? <Alert className="Alert" bsStyle='danger'>
              No user is associated with that email address.
            </Alert>
          : null}
        <FormGroup controlId="email" bsSize="large"
          validationState={this.props.userExistWarning}>
          <ControlLabel>Email</ControlLabel>
          <FormControl
            autoFocus
            type="email"
            value={this.props.email}
            onChange={this.props.handleChange}

            placeholder="Enter email"
          />
          <FormControl.Feedback />
        </FormGroup>
        <LoaderButton
          block
          bsSize="large"
          disabled={!this.props.validateForm()}
          type="submit"
          isLoading={this.props.isLoading}
          text="Forgot Password"
          loadingText="Retriving Information..."
        />
      </form>
    );
  }
}
