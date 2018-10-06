import React, { Component } from "react";
import {
  HelpBlock,
  FormGroup,
  FormControl,
  ControlLabel,
  Alert
} from "react-bootstrap";
import LoaderButton from '../LoaderButton';
import "./Login.css";

export default class LoginForm extends Component {
  //normal login page
  render() {
    return(
      <div className="Login">
        {this.props.isCorrectPassword !== null
          ? <Alert className="Alert" bsStyle='danger'>
              The email or password is incorrect.
            </Alert>
          : null}
        {this.props.isCorrectEmail === "error"
          ? <Alert className="Alert" bsStyle='danger'>
              No user is associated with that email.
            </Alert>
          : null}
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
            <a href='/forgot-password'>
              <HelpBlock>Forgot password?</HelpBlock>
            </a>
          </FormGroup>
          <LoaderButton
            block
            bsSize="large"
            disabled={!this.props.validateForm()}
            type="submit"
            isLoading={this.props.isLoading}
            text="Login"
            loadingText="Logging in..."
          >
            Login
          </LoaderButton>
        </form>
      </div>
    );
  }
}
