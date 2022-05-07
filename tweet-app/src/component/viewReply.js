import React, { Component } from 'react'
import TweetDataService from "../services/TweetDataService";
import "./ViewTweets.css";
import { AiFillLike ,AiOutlineFieldTime } from "react-icons/ai";
import Button from 'react-bootstrap/Button';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import AuthService from "../services/auth.service";
import {withRouter} from "react-router-dom";
import moment from 'moment';

class viewReply extends Component {

    constructor(props) {
        super(props)
        this.onChangeReply = this.onChangeReply.bind(this);

        this.state = {
            TweetloginId:this.props.match.params.Tweetloginid,
            TweetUuid:this.props.match.params.Tweetuuid,
            tweeet: "",
            replyTweet:[],
            reply: "",
            user: AuthService.getCurrentUser()
        }

        this.deleteTweet = this.deleteTweet.bind(this);

    }

    componentDidMount() {
        TweetDataService.getTweetByUuid(this.state.TweetUuid).then((res) => {
            console.log(res.data.reply);
            console.log(res.data);
           this.setState({ tweeet: res.data , replyTweet:res.data.reply});
       });
       
    }

    updateTweet(Tweetloginid,uuid){
        const {user} = this.state;
        var loginId = user.loginId;
        if(Tweetloginid === loginId){
        this.props.history.push(`/update/${uuid}`);
        window.location.reload();
        }
        else{
            alert(" U Cannot Update Others Tweet...Press  OK and Continue Tweet..Thank You!!");
        }
    }

    likeTweet(uuid){
        TweetDataService.likeATweet("shivaaps", uuid).then(
         () => {
           
            this.componentDidMount();
         });
        
     }

     replyTweet(uuid) {
        const {user} = this.state;
        var loginId = user.userId;
        TweetDataService.replyATweet(loginId, uuid, this.state.reply).then(
            () => {
              
                this.componentDidMount();
            });
    }

    onChangeReply(e) {
        this.setState({
          reply:e.target.value
        });
      }


      deleteTweet(Tweetloginid,uuid) {
        const {user} = this.state;
        var loginId = user.loginId;
        console.log(Tweetloginid);
        if (Tweetloginid === loginId) {
            TweetDataService.deleteATweet(loginId, uuid).then((res) => {
                this.setState({
                    Tweet: this.state.Tweet.filter(Tweet =>
                        Tweet.uuid !== uuid)
                });
            });
        }
        else{
            alert(" U Cannot Delete Others Tweet...Press  OK and Continue Tweet..Thank You!!");
        }
    }


    render() {

        if(this.state.replyTweet === null){
            alert("no comments available..Press OK !! to Continue..");
            this.props.history.push(`/home`);
            window.location.reload();
        }

        return (
            
                <div className="row">
                    <table className = "table table-striped ">
                        <tbody className="myTweetbody">
                            {
                                
                                        <tr key={this.state.tweeet.uuid}>
                                            <td> @{this.state.tweeet.userId} </td>
                                            <td> {this.state.tweeet.tweet} <br></br><Button onClick={ () => this.likeTweet(this.state.tweeet.uuid)} variant="outline-info"><AiFillLike/></Button> {this.state.tweeet.like} <br></br><AiOutlineFieldTime/> <span>{moment(this.state.tweeet.timestamp).fromNow()}</span></td>
                                            
                                            <td>
                                            <div>
                                                <Form>
                                                    <Input type="textbox" className="replybox" name={this.state.tweeet.uuid} placeholder="commnet here.." onChange={this.onChangeReply} value={this.state[this.state.tweeet.uuid] || ""}></Input>
                                                    <Button onClick={() => this.replyTweet(this.state.tweeet.tweetId)}>Reply</Button>
                                                </Form>
                                                
                                            </div>
                                            </td>
                                            <td>
                                                
                                            </td>
                                        </tr> 
  
                            }
                           
                            {
                            this.state.replyTweet.map(
                                replyTweet =>
                                    <tr key={replyTweet.uuid}>
                                        <td></td>
                                        <td> <strong>@{replyTweet.userId}</strong> </td>
                                        <td> {replyTweet.tweet} <br></br><AiOutlineFieldTime /> <span>{moment(replyTweet.timestamp).fromNow()}</span></td>                                       
                                       
                                    </tr>
                            )
                        }
                         

                        </tbody>
                    </table>

                </div>
        )
    }
}

export default withRouter(viewReply)