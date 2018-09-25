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

  async componentDidMount() {
    try{
      const content = await this.getContent();
      console.log(content)
      const files = content.map(c => {
        let attachmentURL
        if(c.file.link){
          attachmentURL = Storage.get(c.file.link)
        }
        c.file.link = attachmentURL
        c.postedAt = new Date(c.postedAt).toLocaleString()
        return c
      })
      console.log(files)
      this.setState({files})
    }catch(e){
      console.log(e)
      alert(e.message)
    }
  }

  getContent(){
    return API.get('api', '/learningcontent')
  }

  render() {
      const data = this.state.files

      const columns = [{
        Header: 'File',
        accessor: 'file',
         className: "center",
        Cell: props => <a href={props.value.link}><u>{props.value.name}</u></a>
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
