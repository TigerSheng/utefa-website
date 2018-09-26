import React, { Component } from 'react';
import {LeftNav} from '../LeftNav'
import './LearningContent.css'
import ReactTable from "react-table";
import "react-table/react-table.css";
import {API, Storage} from 'aws-amplify';
import {Button} from "react-bootstrap";

export default class LearningContent extends Component {
  constructor(props){
    super(props);
    this.state={
      files:[{
        file:{
          name: 'Loading...',
          url: null
        }
      }]
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
                this.deleteContent(props.row._original)
              }}
            >
              Delete
            </Button>
          </div>
        )
      })
    }

    return (
      <div>
        <LeftNav isAdmin={this.props.isAdmin}/>
         <div className="learning-content-view">
          <ReactTable
            data={data}
            columns={columns}
            defaultPageSize = {20}
          />
          <p className="lc-tip">Tip: Hold shift when sorting to multi-sort</p>
          </div>
      </div>
    )
  }
}
