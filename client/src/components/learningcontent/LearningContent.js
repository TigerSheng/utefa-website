import React, { Component } from 'react';
import {LeftNav} from '../LeftNav'
import './LearningContent.css'
import {LearningContentItem} from './LearningContentItem'
import ReactTable from "react-table";
import "react-table/react-table.css";
import {Button} from "react-bootstrap";

export default class LearningContent extends Component {
  constructor(props){
    super(props);
    this.state={
      files:[
        {description:"This is a file that leads to youtube.",
        file:{
          name:"youtube link",
          link:"https://www.youtube.com"
        },
          postedAt:new Date(Date.now()).toLocaleString(),
          author: "John Smith"

        },
        {description:"This is a file that leads to facebook.",
        file:{
          name:"facebook link",
          link:"https://www.facebook.com"
        },
          postedAt:new Date(Date.now()).toLocaleString(),
          author: "Williden Smith"
        },
        {description:"This is a file that leads to google.",
          file:{
            name:"google link",
            link:"https://www.google.com"
          },
          postedAt:new Date(Date.now()).toLocaleString(),
          author: "Willowith Smith"
        }
      ]
    }
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
