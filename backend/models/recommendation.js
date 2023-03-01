const db = require("../db");

/** All related methods for recommendation. */

class Recommendation {
  /** Create recommendation list (from data), update db, return the list data.
   * data should be { movie_name, poster, rating, release_year, imdb_id }
   * Returns { movie_name, poster, rating, release_year, imdb_id  }
   * Throws BadRequestError if movie_name already exist in database.
   * */

  static async createAndAddToRecommendation({
    movie_name,
    poster,
    rating,
    release_year,
    imdb_id,
    user_id,
  }) {
    let movie_id = null;
    const movie_exists = await db.query(
      `SELECT id
           FROM movies
           WHERE movie_name = $1`,
      [movie_name]
    );

    if (movie_exists.rows[0]) movie_id = movie_exists.rows[0].id;
    else {
      const newMovie = await db.query(
        `INSERT INTO movies (movie_name, poster, rating, release_year, imdb_id)
             VALUES ($1, $2, $3, $4, $5)
             RETURNING  id`,
        [movie_name, poster, rating, release_year, imdb_id]
      );
      movie_id = newMovie.rows[0].id;
    }

    const result = await db.query(
      `INSERT INTO recommendation
           ( movie_id, user_id )
           VALUES ($1, $2) `,
      [movie_id, user_id]
    );
    const recommendation = result.rows[0];

    return recommendation;
  }

  /** Find all movie_names in recommendation.
   * Returns [{ movie_name, poster, rating, release_year, imdb_id, },...]
   * */

  static async findMyRecommendation(user_id) {
    const recommendations = await db.query(
      `SELECT m.id, m.movie_name, m.poster, m.rating, m.release_year, m.imdb_id, r.user_id 
    FROM movies AS m INNER JOIN recommendation AS r on m.id=r.movie_id WHERE r.user_id=$1`,
      [user_id]
    );
    return recommendations.rows;
  }

  /** Delete a movie_id from recommendation.
   * Returns [{ }]
   * */
  static async removeFromRecommendation(movie_id) {
    await db.query(
      `DELETE
           FROM recommendation WHERE movie_id=$1`,
      [movie_id]
    );
  }
}

module.exports = Recommendation;
