import React, { Component } from "react";
import "./TweetBox.css"
import {withRouter} from "react-router-dom";
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import TweetDataService from "../services/TweetDataService";
import AuthService from "../services/auth.service";

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

class TweetUpdateBox extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    
    this.state = {
      uuid: this.props.match.params.uuid,
      username: "",
      loading: false,
      message: "",
      tweet: "",
      user: AuthService.getCurrentUser()
    };
  }

  componentDidMount() {
    
    TweetDataService.getTweetByUuid(this.state.uuid).then((res) => {
         let Tweet = res.data;
        this.setState({ tweet: Tweet.tweet });
    });
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({
      message: "",
      loading: true
    });
    this.form.validateAll();
    if (this.checkBtn.context._errors.length === 0) {
      const {user} = this.state;
      var loginId = user.userId;
      TweetDataService.updateATweet(loginId,this.state.uuid,this.state.username).then(
        () => {
          this.props.history.push(`/home`);
          window.location.reload();
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          this.setState({
            loading: false,
            message: resMessage
          });
        }
      );
    } else {
      this.setState({
        loading: false
      });
    }
  }
  render() {
    const {user} = this.state;

    return (
      
        <div className="tweetBox">
         
          <Form
            onSubmit={this.handleSubmit}
            ref={c => {
              this.form = c;
            }}
          >
            <div className="form-group">
              <label className="post" >Want To Update Tweet ?..</label>
              <label className="inputName"   htmlFor="username">@{user.userId}</label>
                
              <label className="previousTweet"><small>Original Tweet:</small><strong>"{this.state.tweet}"</strong></label>
              <textarea
                type="text"
                className="form-control"
                name="username"
                placeholder = "Enter Your Updated Tweet Here..."
                value={this.state.username}
                onChange={this.onChangeUsername}
                validations={[required]}
              />
            </div>
            
            
            <div className="form-group">
              <button
                className="btn btn-primary btn-block"
                disabled={this.state.loading}
              >
                {this.state.loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Tweet</span>
              </button>
            </div>
            {this.state.message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {this.state.message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={c => {
                this.checkBtn = c;
              }}
            />
          </Form>
        </div>
      
    );
  }
}

export default withRouter(TweetUpdateBox)