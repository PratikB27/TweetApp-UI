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

class TweetBox extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    
    this.state = {
      username: "",
      //loginId: "",
      loading: false,
      message: "",
      user: AuthService.getCurrentUser()
    };
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
      var loginId = user;
      console.log(loginId);
      console.log(this.state.username);
      TweetDataService.postTweet(loginId,this.state.username).then(
        () => {
          
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
              <label className="post" >Want To Tweet Something?..</label>
             
              
              <textarea
                type="text"
                className="form-control"
                name="username"
                placeholder = "Enter Your Tweet Here.."
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

export default withRouter(TweetBox)