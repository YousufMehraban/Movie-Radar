// "use strict";

const db = require("../db.js");
const { BadRequestError } = require("../customError");
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

/**************** add a  movie in watchList ***********************/

describe("create", function () {
  const newWatch = {
    movie_name: "M1",
    platform: "NetFlix",
    poster: "url",
    rating: "10/10",
    release_year: 2023,
    imdb_id: "id1",
    user_id: 1,
  };

  test("works", async function () {
    let res = await WatchList.create({ ...newWatch });
    expect(res).toEqual(newWatch);
    const found = await db.query(
      "SELECT * FROM watch_list WHERE movie_name = 'M1'"
    );
    expect(found.rows.platform).toEqual("NetFlix");
    expect(found.rows[poster]).toEqual("url");
  });

  test("bad request with duplicate data", async function () {
    try {
      await WatchList.create({ ...newWatch });
      await WatchList.create({ ...newWatch });
      fail();
    } catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy();
    }
  });
});

/**************** find all movie in watchList ***********************/

describe("findAll", function () {
  test("works", async function () {
    let res = await WatchList.findAll();
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

/******************* remove a movie from watchList list ********************/

describe("remove", function () {
  test("works", async function () {
    await WatchList.remove("Pathaan");
    const res = await db.query(
      "SELECT * FROM watch_list WHERE movie_name='Pathaan'"
    );
    expect(res.rows.length).toEqual(0);
  });

  test("not found if no such movie_name exist", async function () {
    try {
      await WatchList.remove("nope");
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});
