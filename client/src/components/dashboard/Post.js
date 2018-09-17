import React, { Component } from 'react';
import './Post.css'
import {Auth} from 'aws-amplify';
import {LeftNav} from './LeftNav'

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

export default class  Post extends Component {
  constructor(props) {
    super(props);
  }



  render(){
    return(
      <div>
      <LeftNav/>
      <div className="post-view">
      <div className="announcement-post-container">
      <form onSubmit={this.props.handleSubmit}>
        <FormGroup controlId="email" bsSize="large"
          validationState={this.props.isCorrectEmail}>
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
        <FormGroup controlId="password" bsSize="large"
          validationState={this.props.isCorrectPassword}>
          <ControlLabel>Password</ControlLabel>
          <FormControl
            value={this.props.password}
            onChange={this.props.handleChange}
            type="password"
            placeholder="Enter password"
          />
          <FormControl.Feedback />
        </FormGroup>
        <LoaderButton
          block
          bsSize="large"
          type="submit"
          isLoading={this.props.isLoading}
          text="Login"
          loadingText="Logging in..."
        >
          Login
        </LoaderButton>
      </form>
      </div>
      </div>
      </div>

    );
  }

}
