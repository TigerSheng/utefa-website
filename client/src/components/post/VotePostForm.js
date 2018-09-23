import React, { Component } from "react";
import {
  Alert,
  FormGroup,
  FormControl,
  ControlLabel
} from "react-bootstrap";
import {Auth, API} from 'aws-amplify';
import LoaderButton from '../LoaderButton';
import "./VotePostForm.css";
import { s3Upload } from "../../libs/awsLib";

export class VotePostForm extends Component {
  constructor(props){
    super(props)
    this.state = {
      isLoading: false,
      ticker: "",
      stock: "",
      postSuccess: null
    }
    this.file = null
  }

  handleFileChange = event => {
    this.file = event.target.files[0];
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value,
      postSuccess: null
    });
  }

  // to post votes: POST at endpoint/votes/create
  handleSubmit = async event => {
    event.preventDefault();
    this.setState({isLoading: true});
    try{
      const attachment = this.file
            ? await s3Upload(this.file)
            : null;

      await this.sendVote(
        this.state.ticker,
        this.state.stock,
        attachment
      );
      this.file = null
    }catch(e){
      console.log(e)
      this.setState({postSuccess: false});
    }
    this.setState({isLoading: false});
  }

  sendVote(ticker, name, attachment) {
    API.post('api', '/votes/create', {
      header: {
        "Content-Type": "application/json"
      },
      body: {
        "ticker": ticker,
        "name": name,
        "attachment": attachment
      }
    }).then(response => {
      console.log(response);
      this.setState({
        stock: "",
        ticker: "",
        postSuccess: true
      })
      return
    })
  }

  render() {
    return(
      <div>
        {this.state.postSuccess
          && <Alert className="Alert" bsStyle='success'>
              Your have successfully posted a vote.
            </Alert>
        }
        {this.state.postSuccess === false
          && <Alert className="Alert" bsStyle="danger">
              Something went wrong. Please try again,
            </Alert>
        }
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="stock" bsSize="large">
            <ControlLabel>Stock Name</ControlLabel>
            <FormControl
              autoFocus
              type="Text"
              className= "stock-name-input"
              onChange={this.handleChange}
              value={this.state.stock}
              placeholder="EX. Apple Inc."
            />
            <FormControl.Feedback />
          </FormGroup>
          <FormGroup controlId="ticker" bsSize="large">
            <ControlLabel>Ticker</ControlLabel>
            <FormControl
              autoFocus
              type="Text"
              className="stock-ticker-input"
              onChange={this.handleChange}
              value={this.state.ticker}
              placeholder="EX. APPL"
            />
            <FormControl.Feedback />
          </FormGroup>
          <FormGroup controlId="pitchAttachment" bsSize="large">
            <ControlLabel>Presentation</ControlLabel>
            <FormControl
            type="file"
            onChange={this.handleFileChange}
            />
            <FormControl.Feedback />
          </FormGroup>
          <LoaderButton
            block
            bsSize="large"
            type="submit"
            isLoading={this.state.isLoading}
            text="Post"
            loadingText="Posting..."
          >
            Post
          </LoaderButton>
        </form>
      </div>
    );
  }
}
