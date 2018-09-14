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
      userExist: null,
      userExistWarning: null,
      isConfirmationCodeValid: true,
      isValidNewPassword: null,
      invalidPasswordErrMsg: ""
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
      && this.state.password.length > 8
      && this.state.password === this.state.confirmPassword
    );
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value,
      userExistWarning: null,
      isConfirmationCodeValid: true,
      isValidNewPassword: null
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
      console.log(e);
      //handle user does not exist
      if(e.code === "UserNotFoundException"){
        this.setState({
          userExistWarning: "error"
        });
      }else{
        alert(e.message);
      }
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
      this.props.history.push('/dashboard');
    }catch(e){
      console.log(e);
      //catch confirmation code mismatch
      if(e.code === "CodeMismatchException"){
        this.setState({isConfirmationCodeValid: false});
      }
      //catch password not complying to policy
      else if(e.code === "InvalidPasswordException"){
        this.setState({
          isValidNewPassword: "warning",
          invalidPasswordErrMsg: e.message
        });
      }
      else{
        alert(e.message);
      }
      this.setState({ isLoading: false });
    }
  }

  //form with new password
  renderConfirmationForm() {
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

    return (
      <form onSubmit={this.handleConfirmationSubmit}>
        {!this.state.isConfirmationCodeValid
          ? <Alert className="Alert" bsStyle='danger'>
              Wrong confirmation code. Please try again.
            </Alert>
          : null}
        {this.state.isValidNewPassword !== null
          ? <Alert className="Alert" bsStyle="danger">
              {this.state.invalidPasswordErrMsg}
            </Alert>
          : null}
        <FormGroup controlId="confirmationCode" bsSize="large"
          validationState={this.state.isConfirmationCodeValid
          ? null : 'error'}>
          <ControlLabel>Confirmation Code</ControlLabel>
          <FormControl
            autoFocus
            type="tel"
            value={this.state.confirmationCode}
            onChange={this.handleChange}
          />
          <FormControl.Feedback />
          <HelpBlock>Please check your email for the code.</HelpBlock>
        </FormGroup>
        <FormGroup controlId="password" bsSize="large"
          validationState={this.state.isValidNewPassword}>
          <ControlLabel>New Password</ControlLabel>
          <OverlayTrigger
            trigger={['hover','focus']}
            placement='right'
            overlay={passwordPolicy}
            >
            <FormControl
              type="password"
              value={this.state.password}
              onChange={this.handleChange}
              placeholder="Enter new password"
            />
          </OverlayTrigger>
          <FormControl.Feedback />
        </FormGroup>
        <FormGroup controlId="confirmPassword" bsSize="large">
          <ControlLabel>Confirm New Password</ControlLabel>
          {this.validateConfirmationForm()
            ? <FormControl
              type="password"
              value={this.state.confirmPassword}
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
                  value={this.state.confirmPassword}
                  onChange={this.handleChange}
                />
              </OverlayTrigger>
          }
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

 //form with username
 renderForm() {
   return (
     <form onSubmit={this.handleSubmit}>
       {this.state.userExistWarning !== null
         ? <Alert className="Alert" bsStyle='danger'>
             No user is associated with that email address.
           </Alert>
         : null}
       <FormGroup controlId="email" bsSize="large"
         validationState={this.state.userExistWarning}>
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
