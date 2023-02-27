import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";
const API_NAME_URL =
  process.env.API_NAME_URL ||
  `https://api.watchmode.com/v1/search?search_field=name&search_value=${movie_name}`;
const API_SOURCE_URL =
  process.env.API_SOURCE_URL ||
  `https://api.watchmode.com/v1/title/${imdb_id}/sources`;
const API_DETAIL_URL =
  process.env.API_DETAIL_URL ||
  `https://api.watchmode.com/v1/title/${imdb_id}/details`;

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class DatabaseAPI {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${DatabaseAPI.token}` };
    const params = method === "get" ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  //** Register a new user */

  static async register(data) {
    let res = await this.request("users/register", data, "post");
    this.token = res.token;
    return res.token;
  }

  // ** Login a user */

  static async login(data) {
    let res = await this.request("users/login", data, "post");
    this.token = res.token;
    return res.token;
  }

  //** Get a user information */

  static async getUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  //** Update a user information */

  static async updateUser(username, data) {
    await this.request(`users/${username}`, data, "patch");
  }

  /** Get all movies from watch list. */

  static async getWatchList() {
    let res = await this.request("watchlist");
    return res.watchlists;
  }

  /** Get all movies from recommendation list. */

  static async getRecommendation() {
    let res = await this.request("recommendation");
    return res.recommendations;
  }


  static async getMovieName(movie_name){
    let res = await this.request()
  }


}

// for now, put token ("testuser" / "password" on class)
// DatabaseAPI.token =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
//   "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
//   "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

export default DatabaseAPI;
