import React, { Component } from "react";
import {NavBar} from '../NavBar';
import {Footer} from '../home/Footer';
import {Auth} from 'aws-amplify';
import LoginForm from './LoginForm';
import ResetPasswordForm from './ResetPasswordForm';

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
      this.validateChangePasswordForm = this.validateChangePasswordForm.bind(this);
      this.validateForm = this.validateForm.bind(this);
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
      //handle user does not exist
      if(e.code === "UserNotFoundException"){
        this.setState({isCorrectEmail: "error"});
      }
      //handle wrong credential error
      else if(e.code === "NotAuthorizedException"){
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



  render() {
    const loginFormProps = {
      isCorrectPassword: this.state.isCorrectPassword,
      isCorrectEmail: this.state.isCorrectEmail,
      handleSubmit: this.handleSubmit,
      email: this.state.email,
      password: this.state.password,
      validateForm: this.validateForm,
      isLoading: this.state.isLoading,
      handleChange: this.handleChange
    };

    const resetFormProps = {
      isValidNewPassword: this.state.isValidNewPassword,
      invalidPasswordErrMsg: this.state.invalidPasswordErrMsg,
      handleNewPasswordSubmit: this.handleNewPasswordSubmit,
      newPassword: this.state.newPassword,
      handleChange: this.handleChange,
      validateChangePasswordForm: this.validateChangePasswordForm,
      confirmNewPassword: this.state.confirmNewPassword,
      isLoading: this.state.isLoading
    };

    return (
      <div>
        <NavBar/>
        {this.state.newUser === null
          ? <LoginForm {...loginFormProps}/>
          : <ResetPasswordForm {...resetFormProps}/>}
        <Footer/>
      </div>
    );
  }
}
