import React, { Component } from 'react';
import './App.css';
import Routes from './Routes';
import {Auth} from 'aws-amplify';
import {withRouter} from 'react-router-dom';

const authReqPages = ['/dashboard','/post','/vote','/learningcontent'];
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      isAuthenticated: false,
      isAuthenticating: true
    };
  }

  async componentDidMount(){
    try{
      if (await Auth.currentSession()) {
        this.userHasAuthenticated(true);
        if(!authReqPages.includes(this.props.history.location.pathname)){
          this.props.history.push('/dashboard');
        }
      }
    }
    catch(e) {
      if (e !== 'No current user') {
        alert(e);
      }
    }
    this.setState({ isAuthenticating: false });
  }

  userHasAuthenticated = authenticated => {
    this.setState({
      isAuthenticated: authenticated
    });
  }

  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated
    };

    return (
      !this.state.isAuthenticating &&
      <div>
        <Routes childProps={childProps} auth={this.state.isAuthenticated}/>
      </div>
    );
  }
}

export default withRouter(App);
