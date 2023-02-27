// "use strict";

const db = require("../db");
const { BadRequestError, NotFoundError } = require("../customError");

/** All related methods for watch_list. */

class WatchList {
  /** Create watch_list list (from data), update db, return the list data.
   * data should be { movie_name, platform, poster, rating, release_year, imdb_id, user_id }
   * Returns { movie_name, platform, poster, rating, release_year, imdb_id, user_id  }
   * Throws BadRequestError if movie_name already exist in database.
   * */

  static async create({
    movie_name,
    platform,
    poster,
    rating,
    release_year,
    imdb_id,
    user_id,
  }) {
    let movieId = null;
    const movie_exists = await db.query(
      `SELECT id
           FROM movie
           WHERE movie_name = $1`,
      [movie_name]
    );

    if (movie_exists.rows[0]) movieId = movie_exists.rows[0].id;
    else {
      const newMovie = await db.query(
        `Insert into movie (movie_name, platform, poster, rating, release_year, imdb_id)
             values ($1, $2, $3, $4, $5, $6)
             RETURNING  id`,
        [movie_name, platform, poster, rating, release_year, imdb_id]
      );
      movieId = newMovie.rows[0].id;
    }

    const result = await db.query(
      `INSERT INTO watch_list
           ( movie_id user_id )
           VALUES ($1, $2) `,
      [movie_id, user_id]
    );
    const watch_list = result.rows[0];

    return watch_list;
  }

  /** Find all movie_names from watch_list.
   * Returns [{ movie_name, platform, poster, rating, release_year, imdb_id, user_id },...]
   * */

  static async findMyWatchlist(userId) {
    const watch_lists = await db.query(
      `SELECT m.movie_name, m.platform, m.poster, m.rating, m.release_year, m.imdb_id, w.user_id 
    FROM movie as m inner join watch_list as w on m.id=w.movie_id where w.user_id=$1`,
      [userId]
    );
    return watch_lists.rows;
  }

  /** Find a movie_names from watch_list.
   * Returns [{ movie_name }]
   * */
  static async remove(movie_name) {
    await db.query(
      `DELETE
           FROM watch_list as w inner join movie as m on m.id=w.movie_id
           WHERE m.movie_name = $1`
    );
  }
}

module.exports = WatchList;
