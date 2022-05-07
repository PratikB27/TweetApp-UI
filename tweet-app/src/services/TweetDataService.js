import axios from 'axios';

const API_URL = "http://localhost:8080/api/v1.0/tweets/";

const HOST_URL ="http://tweetAppLoadBalancer-710038735.us-east-1.elb.amazonaws.com/tweet";

class TweetService {
  getAllTweet() {
    return axios.get(HOST_URL + '/list/all');
  }

  getMyTweet(userId) {
    return axios.get(API_URL +'byUserId/' +userId);
  }

  getTweetByUuid(uuid) {
    return axios.get(API_URL + 'byUuid/' + uuid);
  }

  getUsers() {
    return axios.get(API_URL + 'users/all');
  }

  postTweet(userId,tweet) {

    return axios.post(HOST_URL,
      {
        userId,
        tweet
      },
      {
        headers: { 'Content-Type': 'application/json' }

      });

  }

  updateATweet(userId, tweetId,postdata) {
    return axios.put(API_URL + userId + '/update/' + tweetId, postdata, {headers: {'Content-Type': 'application/json'}});
  }

  likeATweet(tweetUserId,id) {
    return axios.put(HOST_URL  + '/like/' + id);
  }

  replyATweet(id, tweetUserId ,postdata) {
    return axios.post(API_URL + id + '/reply/' + tweetUserId, postdata, {headers: {'Content-Type': 'application/json'}});
  }

  deleteATweet(loginId,tweetId) {
    return axios.delete(API_URL + 'delete/' + tweetId);
  }
  
}
export default new TweetService();