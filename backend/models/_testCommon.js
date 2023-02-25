const bcrypt = require("bcrypt");

const db = require("../db.js");
const { BCRYPT_WORK_FACTOR } = require("../config");

async function commonBeforeAll() {
  await db.query("DELETE FROM users");
  await db.query("DELETE FROM recommendation");
  await db.query("DELETE FROM watch_list");

  await db.query(
    `INSERT INTO users (username, password, first_name, last_name, email)
  VALUES ('testuser',
          $1,
          'Test',
          'User',
          'joel@joelburton.com'),
         ('testadmin',
          $2,
          'Test',
          'Admin!',
          'joel@joelburton.com')`,
    [
      await bcrypt.hash("password", BCRYPT_WORK_FACTOR),
      await bcrypt.hash("password", BCRYPT_WORK_FACTOR),
    ]
  );

  await db.query(`INSERT INTO watch_list (movie_name,
    platform,
    poster,
    actors,
    rating,
    release_year,
    user_id);
VALUES ('Pathaan', 'amazon prime', "https://m.media-amazon.com/images/M/MV5BM2QzM2JiNTMtYjU4Ny00MDZkLTk3MmUtYTRjMzVkZGJlNmYyXkEyXkFqcGdeQXVyMTUzNTgzNzM0._V1_SX300.jpg",
'Shah Rukh Khan', '6.6/10', 2023, 1)`);

  await db.query(`INSERT INTO recommendation (movie_name,
    platform,
    poster,
    actors,
    rating,
    release_year,
    user_id);
VALUES ('Pathaan', 'amazon prime', "https://m.media-amazon.com/images/M/MV5BM2QzM2JiNTMtYjU4Ny00MDZkLTk3MmUtYTRjMzVkZGJlNmYyXkEyXkFqcGdeQXVyMTUzNTgzNzM0._V1_SX300.jpg",
'Shah Rukh Khan', '6.6/10', 2023, 1)`);
}

async function commonBeforeEach() {
  await db.query("BEGIN");
}

async function commonAfterEach() {
  await db.query("ROLLBACK");
}

async function commonAfterAll() {
  await db.end();
}

module.exports = {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
};
