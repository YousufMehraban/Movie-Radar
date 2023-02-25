import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

// movieRadar class handles all CRUD operations to the URL

class movieRadarAPI {
  // we store token here for authentication
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    // we send the token via the header for authentication
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${movieRadarAPI.token}` };
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // // Individual API routes

  // /** Get details on a company by handle. */

  // static async getRecommendation(handle) {
  //   let res = await this.request(`companies/${handle}`);
  //   return res.company;
  // }

}

// for now, put token ("testuser" / "password" on class)
movieRadarAPI.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
    "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
    "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";
