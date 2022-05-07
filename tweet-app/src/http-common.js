import axios from "axios";
export default axios.create({
  baseURL: "http://localhost:8080/api/v1.0/tweets/",
  headers: {
    "Content-type": "application/json"
  }
});