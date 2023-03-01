// "use strict";

const request = require("supertest");

const app = require("../app");
const Recommendation = require("../models/recommendation");

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

/****************** POST /recommendation ******************** */

describe("POST /recommendation", function () {
  test("works", async function () {
    const newWatch = {
      movie_name: "M1",
      poster: "url",
      rating: "10/10",
      release_year: 2023,
      imdb_id: "id1",
    };
    const resp = await request(app)
      .post("/recommendation")
      .send({ ...newWatch });
    expect(resp.body).toEqual(newWatch);
  });
});

/****************** GET /recommendation ******************** */

describe("GET /recommendation", function () {
  test("works", async function () {
    let res = await Recommendation.findMyRecommendation();
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
