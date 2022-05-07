import './App.css';
import React from "react";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer"
import TweetBox from "./component/TweetBox";
import LoginForm from "./component/LoginForm";
import ProfileImg from "./component/profileImg";
import ViewMyTweet from "./component/viewMyTweet";
import SearchUsersTweet from "./component/searchUsersTweet";
import ViewwAllTweets from "./component/viewAllTweets";
import RegisterForm from "./component/RegisterForm";
import UpdateTweeet from "./component/updateTweet";
import ViewUsers from "./component/viewUsers";
import ViewReplyTweet from "./component/viewReply";
import LogoutPage from "./component/Logout";
import ForgotPassPage from "./component/forgotPage";
import { Switch, Route } from "react-router-dom";
import ProtectedRoute from "./component/protectedRoute";

const Home = () => {
  return (
    <>
      <Navbar />
      <div class="container">
            <div id="st-box">
                <ProfileImg/>
            </div>
              
            <div id="nd-box">
                <ViewMyTweet/>
            </div>
      
        </div>
      <Footer/>
    </>
  );
};

const UpdateTweet = () => {
  return (
    <>
      <Navbar />
      <div class="container">
            <div id="st-box">
                <ProfileImg/>
            </div>
              
            <div id="nd-box">
                <UpdateTweeet/>
            </div>
              
        </div>
      <Footer/>
    </>
  );
};

const ViewAllTweets = () => {
  return (
    <>
      <Navbar />
      <div class="container">
            <div id="st-box">
                <ProfileImg/>
                <TweetBox/>
            </div>
              
            <div id="nd-box">
                <ViewwAllTweets/>
            </div>
              
            
        </div>
      <Footer/>
    </>
  );
};

const ViewAllUsers = () => {
  return (
    <>
      <Navbar />
      <div class="container">
            <div id="st-box">
                <ProfileImg/>
            </div>
              
            <div id="nd-box">
                <ViewUsers/>
            </div>
              
        </div>
      <Footer/>
    </>
  );
};

const SearchUserTweet = () => {
  return (
    <>
      <Navbar />
      <div class="container">
              
            <div id="nd-box">
                 <SearchUsersTweet/>
            </div>
              
        </div>
      <Footer/>
    </>
  );
};

const ReplyViewTweet = () => {
  return (
    <>
      <Navbar />
      <div class="container">
            <div id="st-box">
                <ProfileImg/>
            </div>

            <div id="nd-box">
                <ViewReplyTweet/>
            </div>

        </div>
      <Footer/>
    </>
  );
};

const Login = () => {
  return (
    <>
      <div className="loginsection">
        <LoginForm />
      </div>
    </>
  );
};

const Logout = () => {
  return (
    <>
      <div className="loginsection">
        <LogoutPage />
      </div>
    </>
  );
};

const ForgotPass = () => {
  return (
    <>
      <div className="loginsection">
        <ForgotPassPage />
      </div>
    </>
  );
};

const Register = () => {
  return (
    <>
      <div className="registersection">
        <RegisterForm/>
      </div>
    </>
  );
};

const App = () => {
  return (
    <Switch>
      <Route exact path="/">
      <Login />
      </Route>
      <Route exact path="/signUp">
      <Register /> 
      </Route>
      <Route exact path="/home">
      <ViewAllTweets />
      </Route>
      <Route exact path="/viewMyTweet">
      <Home />
      </Route>
      <Route exact path="/AllUsers">
      <ViewAllUsers />
      </Route>
      <Route exact path="/logout">
      <Logout />
      </Route>
      <Route exact path="/forgotPass">
      <ForgotPass />
      </Route>
      <Route exact path="/update/:uuid">
      <UpdateTweet />
      </Route>
      <Route exact path="/search/:loginId">
      <SearchUserTweet />
      </Route>
      <Route exact path="/view/:Tweetuuid/:Tweetloginid">
      <ReplyViewTweet/>
      </Route>
    </Switch>
  );
};

export default App;