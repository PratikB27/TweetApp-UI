import { Component } from "react";
import LoginForm from "./LoginForm";
import AuthService from "../services/auth.service";

class LogoutComponent extends Component{

    componentDidMount() {
        AuthService.logout();
    }

    render(){
        return(
            <div>
               <LoginForm/>
            </div>
        )
    }
}
export default LogoutComponent;