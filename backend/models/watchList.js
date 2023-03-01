const db = require("../db");

/** All related methods for watchlist. */

class WatchList {
  /** Create watchlist (from data), update db, return the list data.
   * data should be { movie_name, poster, rating, release_year, imdb_id }
   * Returns { movie_name, poster, rating, release_year, imdb_id  }
   * Throws BadRequestError if movie_name already exist in database.
   * */

  static async createAndAddToWatchList({
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
      `INSERT INTO watchlist
           ( movie_id, user_id )
           VALUES ($1, $2) `,
      [movie_id, user_id]
    );
    const watchlist = result.rows[0];

    return watchlist;
  }

  /** Find all movie_names in watchlist.
   * Returns [{ movie_name, poster, rating, release_year, imdb_id, },...]
   * */

  static async findMyWatchlist(user_id) {
    const watchlists = await db.query(
      `SELECT m.id, m.movie_name, m.poster, m.rating, m.release_year, m.imdb_id, w.user_id 
    FROM movies as m inner join watchlist as w on m.id=w.movie_id where w.user_id=$1`,
      [user_id]
    );
    return watchlists.rows;
  }

  /** Delete a movie_id from watchlist.
   * Returns [{ }]
   * */
  static async removeFromWatchList(movie_id) {
    await db.query(
      `DELETE
           FROM watchlist WHERE movie_id=$1`,
      [movie_id]
    );
  }
}

module.exports = WatchList;
