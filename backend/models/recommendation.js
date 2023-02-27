"use strict";

const db = require("../db");
const { BadRequestError, NotFoundError } = require("../customError");

/** All related methods for recommendation list. */

class Recommendation {
  /** Create recommendation list (from data), update db, return recommendation list data.
   * recommendation = { movie_name, platform, poster, rating, release_year,imdb_id, user_id }
   * Returns { movie_name, platform, poster, rating, release_year,imdb_id, user_id  }
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
           FROM recommendation
           WHERE movie_name = $1`,
      [movie_name]
    );

    if (duplicateCheck.rows[0])
      throw new BadRequestError(`Duplicate movie_name: ${movie_name}`);

    const result = await db.query(
      `INSERT INTO recommendation
           ( movie_name, platform, poster, rating, release_year, imdb_id, user_id )
           VALUES ($1, $2, $3, $4, $5, $6, $7)
           RETURNING  movie_name, platform, poster, rating, release_year, imdb_id, user_id `,
      [movie_name, platform, poster, rating, release_year, imdb_id, user_id]
    );
    const recommendation = result.rows[0];

    return recommendation;
  }

  /** Find all movies in recommendation.
   * Returns [{ movie_name, platform, poster, rating, release_year, imdb_id, user_id },...]
   * */

  static async findAll() {
    const recommendations =
      await db.query(`SELECT movie_name, platform, poster, rating, release_year, imdb_id, user_id 
    FROM recommendation`);
    return recommendations.rows;
  }

  /** Find a movie in recommendation.
   * Returns { movie_name, platform, poster, rating, release_year,imdb_id, user_id }
   * */

  static async find(movie_name) {
    const movie = await db.query(
      `SELECT movie_name, platform, poster, rating, release_year, imdb_id, user_id 
    FROM recommendation WHERE movie_name = $1`,
      [movie_name]
    );
    if (!movie) {
      throw new NotFoundError(`Movie_name not found: ${movie}`);
    }

    return movie.rows[0];
  }

  // ** remove a movie from the recommendation list.
  static async remove(movie_name) {
    const result = await db.query(
      `DELETE
           FROM recommendation
           WHERE movie_name = $1
           RETURNING movie_name`,
      [movie_name]
    );
    const movie = result.rows[0];

    if (!movie) throw new NotFoundError(`Movie_name not found: ${movie}`);
  }
}

module.exports = Recommendation;
