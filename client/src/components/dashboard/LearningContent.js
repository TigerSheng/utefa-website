import React, { Component } from 'react';
import {LeftNav} from './LeftNav'
import './LearningContent.css'
import {LearningContentItem} from './LearningContentItem'

export default class LearningContent extends Component {
  constructor(props){
    super(props);
    this.state={
      files:[
        {fileName:"This is a file",
          file:"https://www.google.com"
        },
        {fileName:"Another File",
          file:"https://www.facebook.com"
        },
        {fileName:"This is a file",
          file:"https://www.youtube.com"
        }
      ]
    }
  }

  render(){
    return(
      <div>
        <LeftNav/>
        <div className="learning-content-view">
        {            this.state.files.map((index, i) => {
          return(
            <div key={i}>

          <LearningContentItem fileData = {this.state.files[i]}/>
            </div>
        )
        })

        }
        </div>
      </div>
    );
  }
}
