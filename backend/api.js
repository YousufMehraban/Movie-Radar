const axios = require("axios");
const WatchMode_API_URL =
  process.env.WatchMode_API_URL || `https://api.watchmode.com/v1/title`;

class MovieRadarAPI {
  static key = process.env.key || "UcLcOtJkVYI1R2X6u1kAQIXTcbf2uitIqyoJixrs";

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
  static async getDetails(imdb_id) {
    let res = await this.detailRequest(imdb_id);
    // res is an  object that has => id, title, year, poster, imdb_id, user_rating, trailer,
    return res;
  }
}

module.exports = MovieRadarAPI;
