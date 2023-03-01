// "use strict";

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
  const newWatch = {
    movie_name: "M1",
    poster: "url",
    rating: "10/10",
    release_year: 2023,
    imdb_id: "id1",
    user_id: 1,
  };

  test("works", async function () {
    let res = await Recommendation.createAndAddToRecommendation({
      ...newWatch,
    });
    expect(res).toEqual(newWatch);
    const found = await db.query(
      "SELECT * FROM recommendation WHERE movie_name = 'M1'"
    );
    expect(found.rows.release_year).toEqual(2023);
    expect(found.rows[poster]).toEqual("url");
  });
});

/**************** find all movies ***********************/

describe("findAll", function () {
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

/******************* remove a movie from recommendation list ********************/

describe("remove", function () {
  test("works", async function () {
    await Recommendation.remove("Pathaan");
    const res = await db.query(
      "SELECT * FROM recommendation WHERE movie_name='Pathaan'"
    );
    expect(res.rows.length).toEqual(0);
  });
});
