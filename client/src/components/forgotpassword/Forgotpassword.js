import React, { Component } from "react";
import {NavBar} from '../NavBar';
import {Auth} from 'aws-amplify';
import {Footer} from '../home/Footer';
import EmailForm from './EmailForm';
import NewPasswordForm from './NewPasswordForm';

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

    this.validateForm = this.validateForm.bind(this);
    this.validateConfirmationForm = this.validateConfirmationForm.bind(this);
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

 render() {
   const emailFormProps = {
     email: this.state.email,
     isLoading: this.state.isLoading,
     userExistWarning: this.state.userExistWarning,
     handleSubmit: this.handleSubmit,
     handleChange: this.handleChange,
     validateForm: this.validateForm
   };
   const pwFormProps = {
     handleConfirmationSubmit: this.handleConfirmationSubmit,
     isConfirmationCodeValid: this.state.isConfirmationCodeValid,
     isValidNewPassword: this.state.isValidNewPassword,
     invalidPasswordErrMsg: this.state.invalidPasswordErrMsg,
     confirmationCode: this.state.confirmationCode,
     handleChange: this.handleChange,
     password: this.state.password,
     validateConfirmationForm: this.validateConfirmationForm,
     confirmPassword: this.state.confirmPassword,
     isLoading: this.state.isLoading
   };

   return(
     <div>
     <NavBar/>
      <div className="Forgotpassword">
        {this.state.userExist === null
          ? <EmailForm {...emailFormProps}/>
          : <NewPasswordForm {...pwFormProps}/>}
      </div>
      <Footer/>
      </div>
   );
 }
}
