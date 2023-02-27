// "use strict";

const { BadRequestError } = require("../customError");
const db = require("../db.js");
const Recommendation = require("./recommendation.js");
const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/**************** add a  movie to recommendation ***********************/

describe("create", function () {
  const newRec = {
    movie_name: "M1",
    platform: "NetFlix",
    poster: "url",
    rating: "10/10",
    release_year: 2023,
    imdb_id: "id1",
    user_id: 1,
  };

  test("works", async function () {
    let res = await Recommendation.create({ ...newRec });
    expect(res).toEqual(newRec);
    const found = await db.query(
      "SELECT * FROM recommendation WHERE movie_name = 'M1'"
    );
    expect(found.rows.platform).toEqual("NetFlix");
    expect(found.rows[poster]).toEqual("url");
  });

  test("bad request with duplicate data", async function () {
    try {
      await Recommendation.create({ ...newRec });
      await Recommendation.create({ ...newRec });
      fail();
    } catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy();
    }
  });
});

/**************** find all movies ***********************/

describe("findAll", function () {
  test("works", async function () {
    let res = await Recommendation.findAll();
    expect(res).toEqual({
      movie_name: "Pathaan",
      platform: "amazon prime",
      poster:
        "https://m.media-amazon.com/images/M/MV5BM2QzM2JiNTMtYjU4Ny00MDZkLTk3MmUtYTRjMzVkZGJlNmYyXkEyXkFqcGdeQXVyMTUzNTgzNzM0._V1_SX300.jpg",
      rating: "6.6/10",
      release_year: 2023,
      imdb_id: "tt12844910",
      user_id: 1,
    });
  });
});

/******************* remove a movie from recommendation list ********************/

describe("remove", function () {
  test("works", async function () {
    await Recommendation.remove("Pathaan");
    const res = await db.query(
      "SELECT * FROM recommendation WHERE movie_name='Pathaan'"
    );
    expect(res.rows.length).toEqual(0);
  });

  test("not found if no such movie_name exist", async function () {
    try {
      await Recommendation.remove("nope");
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});
