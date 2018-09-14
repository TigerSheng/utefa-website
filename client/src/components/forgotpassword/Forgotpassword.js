import React, { Component } from "react";
import {
  HelpBlock,
  FormGroup,
  FormControl,
  ControlLabel
} from "react-bootstrap";
import {NavBar} from '../NavBar';
import {Auth} from 'aws-amplify';
import {Footer} from '../home/Footer';
import LoaderButton from '../LoaderButton';
import "./Forgotpassword.css"

export default class Forgotpassword extends Component {
  constructor(props){
    super(props);

    this.state = {
      email: "",
      password: "",
      isLoading: false,
      confirmationCode: "",
      confirmPassword:"",
      userExist: null
    };
  }

  validateForm() {
    return (
      this.state.email.length > 0
    );
  }

  validateConfirmationForm() {
    return (
      this.state.confirmationCode.length > 0
      && this.state.password.length > 0
      && this.state.password === this.state.confirmPassword
    );
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  //submit user email to start forget password process
  handleSubmit = async event => {
    event.preventDefault();

    this.setState({ isLoading: true });

    try{
      const userExist = await Auth.forgotPassword(
        this.state.email
      ).then(data => console.log(data));
      this.setState({
        userExist
      });
    }catch(e){
      alert(e.message);
    }

    this.setState({ isLoading: false });
  }

  //submit confirmation code and new password
  handleConfirmationSubmit = async event => {
    event.preventDefault();

    this.setState({ isLoading: true });

    try{
      await Auth.forgotPasswordSubmit(
        this.state.email,
        this.state.confirmationCode,
        this.state.password
      );
      await Auth.signIn(this.state.email,
        this.state.password
      );

      Auth.currentAuthenticatedUser()
        .then(user => console.log(user));
      this.props.userHasAuthenticated(true);
      this.props.history.push('/');
    }catch(e){
      alert(e.message);
      this.setState({ isLoading: false });
    }
  }

  renderConfirmationForm() {
   return (
     <form onSubmit={this.handleConfirmationSubmit}>
       <FormGroup controlId="confirmationCode" bsSize="large">
         <ControlLabel>Confirmation Code</ControlLabel>
         <FormControl
           autoFocus
           type="tel"
           value={this.state.confirmationCode}
           onChange={this.handleChange}
           placeholder="Enter confirmation code"

         />
         <HelpBlock>Please check your email for the code.</HelpBlock>
       </FormGroup>
       <FormGroup controlId="password" bsSize="large">
        <ControlLabel>New Password</ControlLabel>
        <FormControl
          type="password"
          value={this.state.password}

          placeholder="Enter new password"
          onChange={this.handleChange}
        />
      </FormGroup>
      <FormGroup controlId="confirmPassword" bsSize="large">
        <ControlLabel>Confirm New Password</ControlLabel>
        <FormControl
          value={this.state.confirmPassword}
          onChange={this.handleChange}
          type="password"

          placeholder="Re-enter new password"
        />
      </FormGroup>
      <LoaderButton
         block
         bsSize="large"
         disabled={!this.validateConfirmationForm()}
         type="submit"
         isLoading={this.state.isLoading}
         text="Change Password"
         loadingText="Changing Password…"
       />
     </form>
   );
 }

 renderForm() {
   return (
     <form onSubmit={this.handleSubmit}>
       <FormGroup controlId="email" bsSize="large">
         <ControlLabel>Email</ControlLabel>
         <FormControl
           autoFocus
           type="email"
           value={this.state.email}
           onChange={this.handleChange}

           placeholder="Enter email"
         />
       </FormGroup>
       <LoaderButton
         block
         bsSize="large"
         disabled={!this.validateForm()}
         type="submit"
         isLoading={this.state.isLoading}
         text="Forgot Password"
         loadingText="Retriving Information..."
       />
     </form>
   );
 }

 render() {
   return(
     <div>
     <NavBar/>
      <div className="Forgotpassword">
        {this.state.userExist === null
          ? this.renderForm()
          : this.renderConfirmationForm()}
      </div>
      <Footer/>
      </div>
   );
 }
}
