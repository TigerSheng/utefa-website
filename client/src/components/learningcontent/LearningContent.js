import React, { Component } from 'react';
import {LeftNav} from '../LeftNav'
import './LearningContent.css'
import {LearningContentItem} from './LearningContentItem'
import ReactTable from "react-table";
import "react-table/react-table.css";
import {API, Storage} from 'aws-amplify'

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
          }else{
            file.postedAt = new Date(c.postedAt).toLocaleString()
            files.push(file)
            this.setState({files})

          }
          // else file.file.link = null

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
    }]

    return (
          <div>
            <LeftNav isAdmin={this.props.isAdmin}/>
             <div className="learning-content-view">
              <ReactTable
                data={this.state.files}
                columns={columns}
                defaultPageSize = {20}
              />
              </div>
          </div>
    )

  }
}
