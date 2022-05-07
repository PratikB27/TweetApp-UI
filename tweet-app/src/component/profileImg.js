import React , { Component }  from "react";
import "./profileimg.css";
import Card from 'react-bootstrap/Card';
import AuthService from "../services/auth.service";

export default class Profile extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        user: AuthService.getCurrentUser()
      };
    }

    render(){
         const {user} = this.state;
         
          return(
              <div className="profile">
              <Card style={{ width: '8rem' }}>
              <Card.Img variant="top" src="https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_1280.png" />
              <Card.Body>
              <Card.Title><small>@{user.userId}</small></Card.Title>
              </Card.Body>
              </Card>
              </div>
          );
    
    }
}