import React, { Component } from 'react'
import TweetDataService from "../services/TweetDataService";
import "./ViewTweets.css";
import { AiFillLike ,AiOutlineFieldTime } from "react-icons/ai";
import Button from 'react-bootstrap/Button';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import AuthService from "../services/auth.service";
import {withRouter} from "react-router-dom";

class SearchUserComponent extends Component {

    constructor(props) {
        super(props)
        this.onChangeReply = this.onChangeReply.bind(this);

        this.state = {
            loginId:this.props.match.params.loginId,
            Tweet: [],
            reply: "",
            user: AuthService.getCurrentUser()
        }

        this.deleteTweet = this.deleteTweet.bind(this);

    }

    componentDidMount() {
        TweetDataService.getMyTweet(this.state.loginId).then((res) => {
            this.setState({ Tweet: res.data });
            console.log(this.state.Tweet);
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
        const {user} = this.state;
        var loginId = user.loginId;
        TweetDataService.likeATweet(loginId, uuid).then(
         () => {
           
            this.componentDidMount();
         });
        
     }

     replyTweet(uuid) {
        const {user} = this.state;
        var loginId = user.loginId;
        TweetDataService.replyTweet(loginId, uuid, this.state.reply).then(
            () => {
              
                this.componentDidMount();
            });
    }

    replyViewTweet(Tweetloginid,Tweetuuid){
        this.props.history.push(`/view/${Tweetuuid}/${Tweetloginid}`);
        window.location.reload();
    
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
        return (
            
                <div className="row">
                    <table className = "table table-striped ">
                        <tbody className="myTweetbody">
                            {
                                this.state.Tweet.map(
                                    Tweet =>
                                        <tr key={Tweet.uuid}>
                                            <td> @{Tweet.loginId} </td>
                                            <td> {Tweet.tweet} <br></br><Button onClick={ () => this.likeTweet(Tweet.uuid)} variant="outline-info"><AiFillLike/></Button> {Tweet.like} <br></br><AiOutlineFieldTime/> {Tweet.timestamp}</td>
                                            <td>
                                            <div>
                                                <Form>
                                                    <Input type="textbox" className="replybox" name={Tweet.uuid} placeholder="commnet here.." onChange={this.onChangeReply} value={this.state[Tweet.uuid] || ""}></Input>
                                                    <Button onClick={() => this.replyTweet(Tweet.uuid)}>Reply</Button>
                                                </Form>
                                            </div>
                                            </td>
                                            <td>
                                                <button onClick={ () => this.updateTweet(Tweet.uuid)} className="btn btn-info">Update </button>
                                                <button style={{ marginLeft: "10px" }} onClick= {() => this.deleteTweet(Tweet.loginId,Tweet.uuid)} className="btn btn-danger">Delete </button>
                                                <button style={{ marginLeft: "10px" }} onClick={ () => this.replyViewTweet(Tweet.loginId,Tweet.uuid)} className="btn btn-info">View Replies </button>
                                        </td>
                                        </tr>    
                                )
                            }
                            
                        </tbody>
                    </table>

                </div>
        )
    }
}

export default withRouter(SearchUserComponent)