import React, { Component } from 'react'
import TweetDataService from "../services/TweetDataService";
import "./ViewTweets.css";

class ViewUsersComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            User: []
        }

    }

    componentDidMount() {
        TweetDataService.getUsers().then((res) => {
            this.setState({ User: res.data });
        });
    }



    render() {
        return (
            <div>
                <div className="row">
                    <table className="table table-striped">

                    <thead>
                                <tr>
                                    <th> Name</th>
                                    <th> UserName</th>
                                    <th> Email Id</th>
                                    
                                </tr>
                    </thead>

                        <tbody>
                        {
                                    this.state.User.map(
                                        User => 
                                        <tr key = {User.id}>
                                             <td> {User.firstName}{User.lastName}</td>
                                             <td> {User.loginId} </td>   
                                             <td> {User.emailId}</td>
                                             
                                        </tr>
                                    )
                                }
                        </tbody>
                    </table>

                </div>


            </div>
        )
    }
}

export default ViewUsersComponent