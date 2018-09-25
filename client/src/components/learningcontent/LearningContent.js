import React, { Component } from 'react';
import {LeftNav} from '../LeftNav'
import './LearningContent.css'
import {LearningContentItem} from './LearningContentItem'
import ReactTable from "react-table";
import "react-table/react-table.css";
import {API, Storage} from 'aws-amplify'
import {Button} from "react-bootstrap";

export default class LearningContent extends Component {
  constructor(props){
    super(props);
    this.state={
      files:[]
    }
  }

  componentDidMount() {
    try{
      this.getContent().then(content => {
        let files = []
        for(let c of content) {
          let file = c
          // file.author = c.author
          // file.contentId = c.contentId
          // file.description = c.description
          // file.file = {}
          // file.file.name = c.file.name
          if(c.file.link){
            Storage.get(c.file.link).then(url =>{
              file.file.link = url
              file.postedAt = new Date(c.postedAt).toLocaleString()
              files.push(file)
              this.setState({files})
            }
            )
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

  render() {
    const data=this.state.files
    const columns = [{
      Header: 'File',
      accessor: 'file',
      className: "center",
      Cell: props => (
        <a href={props.value.link}>
          <u>{props.value.name}</u>
        </a>
      )
    },
    {Header: 'Description',
    accessor: 'description'
    },{
        Header: 'Date Posted',
        accessor: 'postedAt',
         className: "center"
      },{
        Header: 'Author',
        accessor: 'author',
         className: "center"
      },{
        header: 'Delete',
        id: 'delete-btn',
        sortable: false,
        filterable: false,
        Cell: props => <div className="delete-content-btn-container"><Button bsStyle="danger">Delete</Button></div>
        }]

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
