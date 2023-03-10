const bcrypt = require("bcrypt");

const db = require("../db.js");
const { BCRYPT_WORK_FACTOR } = require("../config");

async function commonBeforeAll() {
  await db.query("DELETE FROM users");
  await db.query("DELETE FROM movies");
  await db.query("DELETE FROM recommendation");
  await db.query("DELETE FROM watchlist");

  await db.query(
    `INSERT INTO users (username, password, first_name, last_name, email) VALUES ('testuser', $1, 'Test', 'User', 'joel@joelburton.com'), ('testadmin', $2, 'Test', 'Admin!', 'joel@joelburton.com')`,
    [
      await bcrypt.hash("password", BCRYPT_WORK_FACTOR),
      await bcrypt.hash("password", BCRYPT_WORK_FACTOR),
    ]
  );

  await db.query(`INSERT INTO movies (movie_name, poster, rating, release_year, imdb_id) VALUES ('Pathaan', "https://m.media-amazon.com/images/M/MV5BM2QzM2JiNTMtYjU4Ny00MDZkLTk3MmUtYTRjMzVkZGJlNmYyXkEyXkFqcGdeQXVyMTUzNTgzNzM0._V1_SX300.jpg",
'6.6/10', 2023, tt12844910)`);

  await db.query(`INSERT INTO watchlist (movie_id, user_id) VALUES (1,1)`);
  await db.query(`INSERT INTO recommendation (movie_id, user_id) VALUES (1,1)`);
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
