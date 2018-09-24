import React, {Component} from 'react';
import {
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import {Auth} from 'aws-amplify'
import AppliedRoute from './components/AppliedRoute'
import PrivateRoute from './components/PrivateRoute'
import {Homepage} from './components/home/Homepage';
import Login from './components/login/Login';
import NotFound from './components/NotFound';
import Forgotpassword from './components/forgotpassword/Forgotpassword';
import Dashboard from './components/dashboard/Dashboard';
import Post from './components/post/Post';
import Vote from './components/vote/Vote';
import LearningContent from './components/learningcontent/LearningContent';

export default class Routes extends Component {
  constructor(props){
    super(props)
    this.state = {
      isAdmin: false
    }
  }

  componentDidMount(){
    Auth.currentUserInfo().then(user => {
      this.setState({
        isAdmin: user.attributes['custom:isAdmin']
      })
    })
  }

  render(){
    return(
      <Switch>
        <AppliedRoute path='/' exact component={Homepage} props={this.props.childProps} />
        <AppliedRoute path='/login' exact component={Login} props={this.props.childProps} />
        <AppliedRoute path='/forgot-password' exact component={Forgotpassword}
        props={this.props.childProps} />
        <PrivateRoute path='/dashboard' exact component={Dashboard}
        props={this.props.childProps} auth={this.props.auth}/>
        {this.state.isAdmin
          ? <PrivateRoute path='/post' exact component={Post}
          props={this.props.childProps} auth={this.props.auth}/>
          : <Redirect to="/dashboard" />
        }
        <PrivateRoute path='/vote' exact component={Vote}
        props={this.props.childProps} auth={this.props.auth}/>
        <PrivateRoute path='/learningcontent' exact component={LearningContent}
        props={this.props.childProps} auth={this.props.auth}/>
        <Route component={NotFound} />
      </Switch>
    );
  }
}
