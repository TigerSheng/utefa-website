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
import LoaderButton from '../LoaderButton';

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

export default class ResetPasswordForm extends Component {
  constructor(props){
    super(props);
  }

  //first sign-in new password page
  render() {
    return(
      <div className="Login">
        <Alert className="Alert" bsStyle="warning">
          Please change your password on your first sign-in.
        </Alert>
        {this.props.isValidNewPassword !== null
          ? <Alert className="Alert" bsStyle="danger">
              {this.props.invalidPasswordErrMsg}
            </Alert>
          : null}
        <form onSubmit={this.props.handleNewPasswordSubmit}>
          <FormGroup controlId="newPassword" bsSize="large"
            validationState={this.props.isValidNewPassword}>
            <ControlLabel>New Password</ControlLabel>
            <OverlayTrigger
              trigger={['hover','focus']}
              placement="right"
              overlay={passwordPolicy}
            >
              <FormControl
                autoFocus
                type="password"
                value={this.props.newPassword}
                onChange={this.props.handleChange}
                placeholder="Enter new password"
              />
            </OverlayTrigger>
            <FormControl.Feedback />
          </FormGroup>
          <FormGroup controlId="confirmNewPassword" bsSize="large">
            <ControlLabel>Confirm New Password</ControlLabel>
            {this.props.validateChangePasswordForm()
              ? <FormControl
                type="password"
                value={this.props.confirmNewPassword}
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
                    value={this.props.confirmNewPassword}
                    onChange={this.props.handleChange}
                    placeholder="Re-enter new password"
                  />
                </OverlayTrigger>
              }
          </FormGroup>
          <LoaderButton
            block
            bsSize="large"
            disabled={!this.props.validateChangePasswordForm()}
            type="submit"
            isLoading={this.props.isLoading}
            text="Change Password"
            loadingText="Logging in..."
          >
            Change Password
          </LoaderButton>
        </form>
      </div>
    );
  }
}
