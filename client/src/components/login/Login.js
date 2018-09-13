import React, { Component } from "react";
import { HelpBlock, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Login.css";
import {NavBar} from '../NavBar';
import {Auth} from 'aws-amplify';
import LoaderButton from '../LoaderButton';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      isLoading: false,
      newPassword: "",
      confirmNewPassword: "",
      newUser: null
    };
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  validateChangePasswordForm() {
    return (
      this.state.newPassword.length > 0
      && this.state.confirmNewPassword.length > 0
      && this.state.newPassword === this.state.confirmNewPassword
    );
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = async event => {
    event.preventDefault();
    this.setState({isLoading: true});
    try {
      //log user in, check if first sign in
      //if first sign in force to change password
      await Auth.signIn(this.state.email, this.state.password)
        .then(user => {
          console.log(user);
          if(user.challengeName === "NEW_PASSWORD_REQUIRED"){
            this.setState({
              newUser: user,
              isLoading: false
            });
          }else{
            this.props.userHasAuthenticated(true);
            this.props.history.push('/');
          }
        });
    } catch (e) {
      alert(e.message);
      this.setState({isLoading: false});
    }
  }

  handleNewPasswordSubmit = async event => {
    event.preventDefault();
    this.setState({ isLoading: true });
    try{
      await Auth.completeNewPassword(
        this.state.newUser,
        this.state.newPassword,
        null
      ).then(() => {
          Auth.signIn(this.state.email, this.state.newPassword);
          this.props.userHasAuthenticated(true);
          this.props.history.push('/');
      });
    }catch(e){
      alert(e.message);
      this.setState({isLoading: false});
    }
  }

  renderLoginPage(){
    return(
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="email" bsSize="large">
            <ControlLabel>Email</ControlLabel>
            <FormControl
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
            <a href='/forgot-password'>
              <HelpBlock>Forgot?</HelpBlock>
            </a>
          </FormGroup>
          <LoaderButton
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
            isLoading={this.state.isLoading}
            text="Login"
            loadingText="Logging in..."
          >
            Login
          </LoaderButton>
        </form>
      </div>
    );
  }

  renderResetPassword(){
    return(
      <div className="Login">
        <p>Please change your password on your first sign-in.</p>
        <form onSubmit={this.handleNewPasswordSubmit}>
          <FormGroup controlId="newPassword" bsSize="large">
            <ControlLabel>New Password</ControlLabel>
            <FormControl
              autoFocus
              type="password"
              value={this.state.newPassword}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="confirmNewPassword" bsSize="large">
            <ControlLabel>Confirm New Password</ControlLabel>
            <FormControl
              autoFocus
              type="password"
              value={this.state.confirmNewPassword}
              onChange={this.handleChange}
            />
          </FormGroup>
          <LoaderButton
            block
            bsSize="large"
            disabled={!this.validateChangePasswordForm()}
            type="submit"
            isLoading={this.state.isLoading}
            text="Change Password"
            loadingText="Logging in..."
          >
            Change Password
          </LoaderButton>
        </form>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.state.newUser === null
          ? this.renderLoginPage()
          : this.renderResetPassword()}
      </div>
    );
  }
}
