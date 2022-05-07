import React, { Component } from "react";
import "./common.css";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
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
const email = value => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};
const vusername = value => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};
const vpassword = value => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};
export default class Register extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeFirstname = this.onChangeFirstname.bind(this);
    this.onChangeLastname = this.onChangeLastname.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this);
    this.onChangeContactNo = this.onChangeContactNo.bind(this);
    this.onChangeResetAns = this.onChangeResetAns.bind(this);
    this.state = {
      firstName: "",
      lastName:"",
      loginId: "",
      password: "",
      confirmPassword: "",
      emailId:"",
      contactNo: "",
      resetAns : "",
      successful: false,
      message: ""
    };
  }
  onChangeFirstname(e) {
    this.setState({
      firstName: e.target.value
    });
  }
  onChangeLastname(e) {
    this.setState({
      lastName: e.target.value
    });
  }
  onChangeUsername(e) {
    this.setState({
      loginId: e.target.value
    });
  }
  onChangeEmail(e) {
    this.setState({
      emailId: e.target.value
    });
  }
  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }
  onChangeConfirmPassword(e) {
    this.setState({
      confirmPassword: e.target.value
    });
  }
  onChangeContactNo(e) {
    this.setState({
      contactNo: e.target.value
    });
  }
  onChangeResetAns(e) {
    this.setState({
      resetAns: e.target.value
    });
  }
  handleRegister(e) {
    e.preventDefault();
    this.setState({
      message: "",
      successful: false
    });
    this.form.validateAll();
    if (this.checkBtn.context._errors.length === 0) {
      AuthService.register(
        this.state.firstName,
        this.state.lastName,
        this.state.loginId,
        this.state.password,
        this.state.confirmPassword,
        this.state.emailId,
        this.state.contactNo,
        this.state.resetAns
      ).then(
        response => {
          this.setState({
            message: response.data.message,
            successful: true,
            
          });
            
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          this.setState({
            successful: false,
            message: resMessage
          });
        }
      );
    }
  }
  render() {
    return (
      
        <div className="registerForm">
        
          <Form
            onSubmit={this.handleRegister}
            ref={c => {
              this.form = c;
            }}
          >
            {!this.state.successful && (
              <div>
                   <div className="form-group">
                  <label htmlFor="username">Firstname</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="firstName"
                    value={this.state.firstName}
                    onChange={this.onChangeFirstname}
                    validations={[required, vusername]}
                   />
                   </div>
                   <div className="form-group">
                   <label htmlFor="username">Lastname</label>
                   <Input
                    type="text"
                    className="form-control"
                    name="lastName"
                    value={this.state.lastName}
                    onChange={this.onChangeLastname}
                    validations={[required, vusername]}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="loginId"
                    value={this.state.loginId}
                    onChange={this.onChangeUsername}
                    validations={[required, vusername]}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="emailId">Email</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="emailId"
                    value={this.state.emailId}
                    onChange={this.onChangeEmail}
                    validations={[required, email]}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <Input
                    type="password"
                    className="form-control"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChangePassword}
                    validations={[required, vpassword]}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="confirmpassword">Confirm Password</label>
                  <Input
                    type="password"
                    className="form-control"
                    name="ConfirmPassword"
                    value={this.state.confirmPassword}
                    onChange={this.onChangeConfirmPassword}
                    validations={[required, vpassword]}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="username">Contact No.</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="contactNo"
                    value={this.state.contactNo}
                    onChange={this.onChangeContactNo}
                    validations={[required]}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="username">ResetAns</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="resetAns"
                    value={this.state.resetAns}
                    onChange={this.onChangeResetAns}
                    validations={[required]}
                  />
                </div>
                <div className="form-group">
                  <button className="btn btn-primary btn-block">Sign Up</button>
                </div>
              </div>
            )}
            {this.state.message && (
              <div className="form-group">
                <div
                  className={
                    this.state.successful
                      ? "alert alert-success"
                      : "alert alert-danger"
                  }
                  role="alert"
                >
                  {this.state.message}
                  <p className="signLog text-right">
                    To Continue..<a href="/">Login</a>
                </p>
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