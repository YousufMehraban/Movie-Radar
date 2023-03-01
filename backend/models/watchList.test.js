// "use strict";

const db = require("../db.js");
const WatchList = require("./watchList");
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

/**************** add a  movie to watchlist ***********************/

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
    let res = await WatchList.createAndAddToWatchList({ ...newWatch });
    expect(res).toEqual(newWatch);
    const found = await db.query(
      "SELECT * FROM watchlist WHERE movie_name = 'M1'"
    );
    expect(found.rows.release_year).toEqual(2023);
    expect(found.rows[poster]).toEqual("url");
  });
});

/**************** find all movies ***********************/

describe("findAll", function () {
  test("works", async function () {
    let res = await WatchList.findMyWatchlist();
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

/******************* remove a movie from watchlist list ********************/

describe("remove", function () {
  test("works", async function () {
    await WatchList.remove("Pathaan");
    const res = await db.query(
      "SELECT * FROM watchlist WHERE movie_name='Pathaan'"
    );
    expect(res.rows.length).toEqual(0);
  });
});
