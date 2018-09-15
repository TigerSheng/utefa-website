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
import LoaderButton from '../LoaderButton';
import "./Forgotpassword.css";

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

export default class NewPasswordForm extends Component {
  constructor(props){
    super(props);
  }

  //form with new password
  render() {
    return (
      <form onSubmit={this.props.handleConfirmationSubmit}>
        {!this.props.isConfirmationCodeValid
          ? <Alert className="Alert" bsStyle='danger'>
              Wrong confirmation code. Please try again.
            </Alert>
          : null}
        {this.props.isValidNewPassword !== null
          ? <Alert className="Alert" bsStyle="danger">
              {this.props.invalidPasswordErrMsg}
            </Alert>
          : null}
        <FormGroup controlId="confirmationCode" bsSize="large"
          validationState={this.props.isConfirmationCodeValid
          ? null : 'error'}>
          <ControlLabel>Confirmation Code</ControlLabel>
          <FormControl
            autoFocus
            type="tel"
            value={this.props.confirmationCode}
            onChange={this.props.handleChange}
          />
          <FormControl.Feedback />
          <HelpBlock>Please check your email for the code.</HelpBlock>
        </FormGroup>
        <FormGroup controlId="password" bsSize="large"
          validationState={this.props.isValidNewPassword}>
          <ControlLabel>New Password</ControlLabel>
          <OverlayTrigger
            trigger={['hover','focus']}
            placement='right'
            overlay={passwordPolicy}
            >
            <FormControl
              type="password"
              value={this.props.password}
              onChange={this.props.handleChange}
              placeholder="Enter new password"
            />
          </OverlayTrigger>
          <FormControl.Feedback />
        </FormGroup>
        <FormGroup controlId="confirmPassword" bsSize="large">
          <ControlLabel>Confirm New Password</ControlLabel>
          {this.props.validateConfirmationForm()
            ? <FormControl
              type="password"
              value={this.props.confirmPassword}
              onChange={this.props.handleChange}
              placeholder="Re-enter new password"
            />
            : <OverlayTrigger
              trigger={['hover', 'focus']}
              placement="right"
              overlay={passwordMatch}
              >
                <FormControl
                  type="password"
                  value={this.props.confirmPassword}
                  onChange={this.props.handleChange}
                />
              </OverlayTrigger>
          }
        </FormGroup>
        <LoaderButton
          block
          bsSize="large"
          disabled={!this.props.validateConfirmationForm()}
          type="submit"
          isLoading={this.props.isLoading}
          text="Change Password"
          loadingText="Changing Password…"
        />
      </form>
    );
  }
}
