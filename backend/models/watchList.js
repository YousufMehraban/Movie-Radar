"use strict";

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
    const duplicateCheck = await db.query(
      `SELECT movie_name
           FROM watch_list
           WHERE movie_name = $1`,
      [movie_name]
    );

    if (duplicateCheck.rows[0])
      throw new BadRequestError(`Duplicate movie_name: ${movie_name}`);

    const result = await db.query(
      `INSERT INTO watch_list
           ( movie_name, platform, poster, rating, release_year, imdb_id, user_id )
           VALUES ($1, $2, $3, $4, $5, $6, $7)
           RETURNING  movie_name, platform, poster, rating, release_year, imdb_id, user_id `,
      [movie_name, platform, poster, rating, release_year, imdb_id, user_id]
    );
    const watch_list = result.rows[0];

    return watch_list;
  }

  /** Find all movie_names from watch_list.
   * Returns [{ movie_name, platform, poster, rating, release_year, imdb_id, user_id },...]
   * */

  static async findAll() {
    const watch_lists =
      await db.query(`SELECT movie_name, platform, poster, rating, release_year, imdb_id, user_id 
    FROM watch_list`);
    return watch_lists.rows;
  }

  /** Find a movie_names from watch_list.
   * Returns [{ movie_name }]
   * */
  static async remove(movie_name) {
    const result = await db.query(
      `DELETE
           FROM watch_list
           WHERE movie_name = $1
           RETURNING movie_name`,
      [movie_name]
    );
    const movie = result.rows[0];

    if (!movie) throw new NotFoundError(`Movie_name not found: ${movie}`);
  }
}

module.exports = WatchList;
