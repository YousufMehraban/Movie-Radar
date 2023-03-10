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
  static key = process.env.key || "ZtlXmDelS2TAVNvn5E9qIkqkJ77taWdsl2bNqUfJ";

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

    const url = `https://api.watchmode.com/v1/search/?apiKey=${this.key}&search_field=name&search_value=${endpoint}`;
    const headers = {};
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

    const url = `${WatchMode_API_URL}/${endpoint}/details/?apiKey=${this.key}`;
    const headers = {};
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

    const url = `${WatchMode_API_URL}/${endpoint}/sources/?apiKey=${this.key}`;
    const headers = {};
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
    await this.dbrequest(`users/${username}`, data, "patch");
  }

  /** Get all movies from watch list. */

  static async getWatchList(user_id) {
    let res = await this.dbRequest(`watchlist/${user_id}`);
    return res.watchlists;
  }

  /** Get all movies from recommendation list. */

  static async getRecommendation(user_id) {
    let res = await this.dbRequest(`recommendation/${+user_id}`);
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

  // static async getMovieDatials(movie_name) {
  //   let res = await this.nameRequest(movie_name);
  //   const imdb_id = res.title_results[0].imdb_id;
  //   if (imdb_id) {
  //     let res2 = await this.detailRequest(imdb_id);
  //     // res2 is an objects that has => title, year, imdb_id, user_rating, trailer, poster
  //     return res2;
  //   }
  // }

  // /** Get the movie imdb_id */

  // static async getMovieSources(movie_name) {
  //   let res = await this.nameRequest(movie_name);
  //   const imdb_id = res.title_results[0].imdb_id;
  //   if (imdb_id) {
  //     let res2 = await this.sourceRequest(imdb_id);
  //     // res2 is an array of objects, each object has => source_id, name, type, web_url, price
  //     return res2;
  //   }
  // }

  static async getIMDB(movie_name) {
    let res = await this.nameRequest(movie_name);
    const imdb_id = res.title_results[0].imdb_id;
    return imdb_id;
  }

  static async getSources(imdb_id) {
    let res = await this.sourceRequest(imdb_id);
    // res is an array of objects, each object has => source_id, name, type, web_url
    return res;
  }
  static async getDetails(imdb_id) {
    let res = await this.detailRequest(imdb_id);
    // res is an  object that has => id, title, year, poster, imdb_id, user_rating, trailer,
    return res;
  }
}

export default MovieRadarAPI;
