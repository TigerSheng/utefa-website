import React, { Component } from 'react';
import {API} from 'aws-amplify';
import { DiscussionPost } from './DiscussionPost';

import './DiscussionBlock.css';

import {Button} from "react-bootstrap";
import ReactLoading from 'react-loading';
import Fade from 'react-reveal/Fade';

import quickSort from "../dashboard/sort";

var index = 5;

export default class DiscussionBlock extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading: false,
            posts:[],
            allPosts:[],
            moreToLoad:true
        };
        this.openDiscussionCreator = this.openDiscussionCreator.bind(this);
        this.closeDiscussionCreator = this.closeDiscussionCreator.bind(this)
        try{
          const posts = await this.updateData();
          quickSort(posts, 0, posts.length-1)
          posts.reverse();
          var MTL=true;
          if (posts.length<=index){
            MTL=false;
          }
          this.setState({
            posts:posts.slice(0,index),
            allPosts:posts,
            moreToLoad:MTL
          });
        }catch(e){
          console.log(e);
          alert(e.message);
        }
        this.setState({isLoading: false})
      }

    updateData(){
        const init = {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            }
        }
        return API.get('api', '/discussion', init)
    }

    loadMore=async event=>{
        index+=5;
        var MTL=true;
        if (this.state.allPosts.length<=index){
          MTL=false;
        }
        this.setState({
          posts:this.state.allPosts.slice(0,index),
          moreToLoad:MTL
        });
    }

    render(){
        return(
          <div>
            {this.state.isLoading
              ? <ReactLoading className="loader" type={'spinningBubbles'} color={'white'} />
              : <Fade big cascade><div>
                {
                  this.state.posts.map((index, i) => {
                    if(this.state.posts[i]) {
                      return(
                        <div key={i}>
                          <DiscussionPost
                            postData={this.state.posts[i]}
                            isAdmin={this.props.isAdmin}
                          />
                        </div>
                      )
                    }else return(null);
                  })
                }
                <div className={this.state.moreToLoad?"button-container":'hidden'}>
                  <Button onClick= {this.loadMore.bind(this)}>
                    Load More
                  </Button>
                </div>
                <div className="filler">
                </div>
              </div>
              </Fade>
            }
          </div>
        );
      }

}
