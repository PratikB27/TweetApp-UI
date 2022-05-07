import axios from "axios";

const API_URL = "http://localhost:8080/api/v1.0/tweets/";
class AuthService {
  login(emailId,password) {
    return axios
      .post(API_URL + "login", {
        password,
        emailId
      })
      .then(response => {
        if (response.data) {
          localStorage.setItem("user",response.data);
        }
        return response.data;
      });
  }
  
  register(firstName, lastName, password,emailId, dob,contactNumber,loginId,resetAnswer) {
    return axios.post(API_URL + "register", {
      firstName,
      lastName,
      password,
      emailId,
      dob,
      contactNumber,
      loginId,
      resetAnswer
    });
  }

  getCurrentUser() {
    return(localStorage.getItem('user'));

  }

  logout() {
    localStorage.removeItem("user");
  }

}
export default new AuthService();