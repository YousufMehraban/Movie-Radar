// "use strict";

/** Routes for Watchlist */

const jsonschema = require("jsonschema");
const express = require("express");

const { BadRequestError } = require("../customError");
const { ensureLoggedIn } = require("../middleware/authorizations");
const Watchlist = require("../models/watchList");
const watchlistSchema = require("../schemas/watchList.json");
const movieSchema = require("../schemas/movieSchema.json");

const router = new express.Router();

/** POST / { watchlist } =>  { watchlist }
 * watchlist = {  
    "movie_name",
    "poster",
    "rating",
    "release_year",
    "imdb_id",
  }
 *
 * Returns {  
    "movie_name",
    "poster",
    "rating",
    "release_year",
    "imdb_id",
  }
 *
 * Authorization required: must be logged in
 */

router.post("/", ensureLoggedIn, async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, movieSchema);
    if (!validator.valid) {
      const errs = validator.errors.map((e) => e.stack);
      throw new BadRequestError(errs);
    }

    const watchList = await Watchlist.createAndAddToWatchList(req.body);
    return res.status(201).json({ watchList });
  } catch (err) {
    return next(err);
  }
});

/** GET /  =>
 *   { watchlist: [ {  
    "movie_name",
    "poster",
    "rating",
    "release_year",
    "imdb_id",
  }, ...] }
 * Authorization required: must be logged in
 */

router.get("/:user_id", ensureLoggedIn, async function (req, res, next) {
  try {
    const watchlists = await Watchlist.findMyWatchlist(req.params.user_id);
    return res.json({ watchlists });
  } catch (err) {
    return next(err);
  }
});

/** DELETE /[id]  =>  ''
 * Authorization required: must be logged in.
 */
router.delete("/:id", ensureLoggedIn, async function (req, res, next) {
  try {
    await Watchlist.removeFromWatchlist(req.params.id);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
