import React, { Component } from 'react';
import './App.css';
import Routes from './Routes';
import {Auth} from 'aws-amplify';
import {withRouter} from 'react-router-dom';

const authReqPages = ['/dashboard','/post','/vote','/sessionmaterial'];
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      isAuthenticated: false,
      isAuthenticating: true,
      isAdmin: false
    };
  }

  async componentDidMount(){
    try{
      if (await Auth.currentSession()) {
        this.userHasAuthenticated(true);
        Auth.currentUserInfo().then(user => {
          if(user.attributes['custom:isAdmin'])
            this.userIsAdmin(true)
        })
        if(!authReqPages.includes(this.props.history.location.pathname)){
          this.props.history.push('/dashboard');
        }
      }else {
        this.userHasAuthenticated(false);
        this.props.history.push('/')
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

  userIsAdmin = isAdmin => {
    this.setState({
      isAdmin
    })
  }

  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated,
      isAdmin: this.state.isAdmin,
      userIsAdmin: this.userIsAdmin
    };

    return (
      !this.state.isAuthenticating &&
      <div>
        <Routes childProps={childProps}
        auth={this.state.isAuthenticated}
        isAdmin={this.state.isAdmin}/>
      </div>
    );
  }
}

export default withRouter(App);
