import React, { Component } from 'react';
import {LeftNav} from '../LeftNav'
import './LearningContent.css'
import ReactTable from "react-table";
import "react-table/react-table.css";
import {API, Storage} from 'aws-amplify';
import {Button, Modal} from "react-bootstrap";

export default class LearningContent extends Component {
  constructor(props){
    super(props);
    this.state={
      // files:[{
      //   file:{
      //     name: 'Loading...',
      //     url: null,
      //     deleteMessage: false,
      //     contentToDelete: ""
      //   }
      // }]
      files: []
    }
  }

  componentDidMount() {
    try{
      this.getContent().then(content => {
        let files = []
        for(let c of content) {
          let file = c
          if(c.file.link){
            Storage.get(c.file.link).then(url =>{
              file.file.url = url
              file.postedAt = new Date(c.postedAt).toLocaleString()
              files.push(file)
              this.setState({files})
            })
          }
        }
      });
    }catch(e){
      console.log(e)
      alert(e.message)
    }
  }

  getContent(){
    return API.get('api', '/learningcontent')
  }

  deleteContent(content) {
    try{
      if(content.file.link)
        Storage.remove(content.file.link)
      API.del('api', '/learningcontent/'+content.contentId)
      .then(response => {
        console.log(response);
        return window.location.reload();
      })
    }catch(e){
      console.log(e)
      alert(e)
    }
  }

  openDeleteMessage = content => {
    this.setState({
      deleteMessage:true,
      contentToDelete: content
    });
  }

  closeDeleteMessage = event => {
    this.setState({
      deleteMessage:false,
      contentToDelete: ""
    });
  }

  render() {
    const data = this.state.files
    let columns = [{
      Header: 'File',
      accessor: 'file',
      className: "center",
      Cell: props => (
        <a href={props.value.url}>
          <u>{props.value.name}</u>
        </a>
      )
    },
    {
      Header: 'Description',
      accessor: 'description'
    },
    {
      Header: 'Date Posted',
      accessor: 'postedAt',
      className: "center"
    },
    {
      Header: 'Author',
      accessor: 'author',
      className: "center"
    }]

    if(this.props.isAdmin){
      columns.push({
        header: 'Delete',
        id: 'delete-btn',
        sortable: false,
        filterable: false,
        Cell: props =>  (
          props.row._original.file.name !== 'Loading...' &&
          <div className="delete-content-btn-container">
            <Button bsStyle="danger"
              onClick={() => {
                this.openDeleteMessage(props.row._original)
              }}
            >
              Delete
            </Button>
          </div>
        )
      })
    }

    return (
      <div className="background">
        <Modal bsSize="small"
        show={this.state.deleteMessage}>
          <Modal.Header className="delete-modal-title">
            <Modal.Title>Delete Post</Modal.Title>
          </Modal.Header>
          <Modal.Body className="delete-modal-text">Are you sure you want to delete this post?</Modal.Body>
          <Modal.Footer className="delete-modal-buttons">
            <Button onClick={() =>
              {this.deleteContent(this.state.contentToDelete)}}
              bsStyle="danger">Delete
            </Button>
            <Button onClick={this.closeDeleteMessage}>Cancel</Button>
          </Modal.Footer>
        </Modal>
        <LeftNav userIsAdmin={this.props.userIsAdmin} isAdmin={this.props.isAdmin} userHasAuthenticated={this.props.userHasAuthenticated} />
         <div className="learning-content-view">
          <ReactTable
            data={data}
            columns={columns}
            defaultSorted={[
           {
             id: "postedAt",
             desc: false
           }
         ]}
            defaultPageSize = {20}
          />
          <p className="lc-tip">Tip: Hold shift when sorting to multi-sort</p>
          </div>
      </div>
    )
  }
}
