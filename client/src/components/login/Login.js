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
import "./Login.css";
import {NavBar} from '../NavBar';
import {Footer} from '../home/Footer';
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
      newUser: null,
      isCorrectPassword: null,
      isCorrectEmail: null,
      isValidNewPassword: null,
      invalidPasswordErrMsg: ""
    };
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length >= 8;
  }

  validateChangePasswordForm() {
    return (
      this.state.newPassword.length >= 8
      && this.state.confirmNewPassword.length >= 8
      && this.state.newPassword === this.state.confirmNewPassword
    );
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value,
      isCorrectEmail: null,
      isCorrectPassword: null,
      isValidNewPassword: null
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
            this.props.history.push('/dashboard');
          }
        });
    } catch (e) {
      console.log(e);
      //handle wrong credential error
      if(e.code === "NotAuthorizedException"){
        this.setState({
          isCorrectEmail: "warning",
          isCorrectPassword: "error"
        });
      }else{
        alert(e.message);
      }
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
          this.props.history.push('/dashboard');
      });
    }catch(e){
      console.log(e);
      //catch password not complying to policy
      if(e.code === "InvalidPasswordException"){
        this.setState({
          isValidNewPassword: "warning",
          invalidPasswordErrMsg: e.message
        });
      }else{
        alert(e.message);
      }
      this.setState({isLoading: false});
    }
  }

  //normal login page
  renderLoginPage() {
    return(
      <div className="Login">
        {this.state.isCorrectPassword !== null
          ? <Alert className="Alert" bsStyle='danger'>
              The email or password is incorrect.
            </Alert>
          : null}
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="email" bsSize="large"
            validationState={this.state.isCorrectEmail}>
            <ControlLabel>Email</ControlLabel>
            <FormControl
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
              placeholder="Enter email"
            />
            <FormControl.Feedback />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large"
            validationState={this.state.isCorrectPassword}>
            <ControlLabel>Password</ControlLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
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

  //first sign-in new password page
  renderResetPassword() {
    const passwordPolicy = (
      <Popover id="password-policy">
        Password has to be a minimum of 8 characters long
        and must include numbers, lowercase and uppercase letters.
      </Popover>
    );
    const passwordMatch = (
      <Popover id="password-match">
        Password should match the one above.
      </Popover>
    );

    return(
      <div className="Login">
        <Alert className="Alert" bsStyle="warning">
          Please change your password on your first sign-in.
        </Alert>
        {this.state.isValidNewPassword !== null
          ? <Alert className="Alert" bsStyle="danger">
              {this.state.invalidPasswordErrMsg}
            </Alert>
          : null}
        <form onSubmit={this.handleNewPasswordSubmit}>
          <FormGroup controlId="newPassword" bsSize="large"
            validationState={this.state.isValidNewPassword}>
            <ControlLabel>New Password</ControlLabel>
            <OverlayTrigger
              trigger={['hover','focus']}
              placement="right"
              overlay={passwordPolicy}
            >
              <FormControl
                autoFocus
                type="password"
                value={this.state.newPassword}
                onChange={this.handleChange}
                placeholder="Enter new password"
              />
            </OverlayTrigger>
            <FormControl.Feedback />
          </FormGroup>
          <FormGroup controlId="confirmNewPassword" bsSize="large">
            <ControlLabel>Confirm New Password</ControlLabel>
            {this.validateChangePasswordForm()
              ? <FormControl
                type="password"
                value={this.state.confirmNewPassword}
                onChange={this.handleChange}
                placeholder="Re-enter new password"
                />
              : <OverlayTrigger
                trigger={['hover', 'focus']}
                placement="right"
                overlay={passwordMatch}
                >
                  <FormControl
                    type="password"
                    value={this.state.confirmNewPassword}
                    onChange={this.handleChange}
                    placeholder="Re-enter new password"
                  />
                </OverlayTrigger>
              }
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
        <NavBar/>
        {this.state.newUser === null
          ? this.renderLoginPage()
          : this.renderResetPassword()}
        <Footer/>
      </div>
    );
  }
}
