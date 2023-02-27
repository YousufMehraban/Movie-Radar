import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";
const API_NAME_URL =
  process.env.API_NAME_URL ||
  `https://api.watchmode.com/v1/search?search_field=name&search_value=`;
const WatchMode_API_URL =
  process.env.WatchMode_API_URL || `https://api.watchmode.com/v1/title`;

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class MovieRadarAPI {
  // the token for interactive with the API will be stored here.
  static token;
  static key = process.env.key || "UcLcOtJkVYI1R2X6u1kAQIXTcbf2uitIqyoJixrs";

  static async dbRequest(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${this.token}` };
    const params = method === "get" ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  static async nameRequest(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, method);

    const url = `${API_NAME_URL}${endpoint}`;
    const headers = { apiKey: this.key };
    const params = method === "get" ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("nameAPI Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  static async detailRequest(endpoint, data = {}, method = "get") {
    console.debug("detailAPI Call:", endpoint, method);

    const url = `${WatchMode_API_URL}/${endpoint}/details`;
    const headers = { apiKey: this.key };
    const params = method === "get" ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("detailAPI Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }
  static async sourceRequest(endpoint, data = {}, method = "get") {
    console.debug("sourceAPI Call:", endpoint, method);

    const url = `${WatchMode_API_URL}/${endpoint}/sources`;
    const headers = { apiKey: this.key };
    const params = method === "get" ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("sourceAPI Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }
  //** Register a new user */

  static async register(data) {
    let res = await this.dbRequest("users/register", data, "post");
    this.token = res.token;
    return res.token;
  }

  // ** Login a user */

  static async login(data) {
    let res = await this.dbRequest("users/login", data, "post");
    this.token = res.token;
    return res.token;
  }

  //** Get a user information */

  static async getUser(username) {
    let res = await this.dbRequest(`users/${username}`);
    return res.user;
  }

  //** Update a user information */

  static async updateUser(username, data) {
    await this.request(`users/${username}`, data, "patch");
  }

  /** Get all movies from watch list. */

  static async getWatchList() {
    let res = await this.dbRequest("watchlist");
    return res.watchlists;
  }

  /** Get all movies from recommendation list. */

  static async getRecommendation() {
    let res = await this.dbRequest("recommendation");
    return res.recommendations;
  }

  /** Post a movie to recommendation list. */

  static async addToRecommendation(data) {
    let res = await this.dbRequest("recommendation", data, "post");
    return res.recommendations;
  }

  /** Post a movie to recommendation list. */

  static async addToWatchList(data) {
    let res = await this.dbRequest("watchlist", data, "post");
    return res.watchlists;
  }

  /** Get the movie imdb_id */

  static async getMovieDatials(movie_name) {
    let res = await this.nameRequest(movie_name);
    const imdb_id = res.title_results[0].imdb_id;
    if (imdb_id) {
      let res2 = await this.detailRequest(imdb_id);
      // res2 is an objects that has => title, year, imdb_id, user_rating, trailer, poster
      return res2;
    }
  }

  /** Get the movie imdb_id */

  static async getMovieSources(movie_name) {
    let res = await this.nameRequest(movie_name);
    const imdb_id = res.title_results[0].imdb_id;
    if (imdb_id) {
      let res2 = await this.sourceRequest(imdb_id);
      // res2 is an array of objects, each object has => source_id, name, type, web_url
      return res2;
    }
  }
}

export default MovieRadarAPI;
