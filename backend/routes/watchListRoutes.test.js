// "use strict";

const request = require("supertest");

const app = require("../app");
const WatchList = require("../models/watchList");

const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
} = require("../models/_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/****************** POST /watchlist ******************** */

describe("POST /watchlist", function () {
  test("works", async function () {
    const newWatch = {
      movie_name: "M1",
      poster: "url",
      rating: "10/10",
      release_year: 2023,
      imdb_id: "id1",
    };
    const resp = await request(app)
      .post("/watchlist")
      .send({ ...newWatch });
    expect(resp.body).toEqual(newWatch);
  });
});

/****************** GET /watchlist ******************** */

describe("GET /watchlist", function () {
  test("works", async function () {
    let res = await WatchList.findAll();
    expect(res).toEqual({
      movie_name: "Pathaan",
      poster:
        "https://m.media-amazon.com/images/M/MV5BM2QzM2JiNTMtYjU4Ny00MDZkLTk3MmUtYTRjMzVkZGJlNmYyXkEyXkFqcGdeQXVyMTUzNTgzNzM0._V1_SX300.jpg",
      rating: "6.6/10",
      release_year: 2023,
      imdb_id: "tt12844910",
    });
  });
});
