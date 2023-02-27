"use strict";

/** Routes for watchList */

const jsonschema = require("jsonschema");
const express = require("express");

const { BadRequestError } = require("../customError");
const { ensureLoggedIn } = require("../middleware/authorizations");
const WatchList = require("../models/watchList");
const watchListSchema = require("../schemas/watchList.json");

const router = new express.Router();

/** POST / { watchlist } =>  { watchlist }
 * watchlist = {  
    "movie_name",
    "platform",
    "poster",
    "rating",
    "release_year",
    imdb_id,
    "user_id" 
  }
 *
 * Returns {  
    "movie_name",
    "platform",
    "poster",
    "rating",
    "release_year",
    imdb_id,
    "user_id" 
  }
 * Authorization required: must be logged in
 */

router.post("/", ensureLoggedIn, async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, watchListSchema);
    if (!validator.valid) {
      const errs = validator.errors.map((e) => e.stack);
      throw new BadRequestError(errs);
    }

    const watchlist = await WatchList.create(req.body);
    return res.status(201).json({ watchlist });
  } catch (err) {
    return next(err);
  }
});

/** GET /  =>
 *   { watchlist: [ {  
    "movie_name",
    "platform",
    "poster",
    "rating",
    "release_year",
    imdb_id,
    "user_id" 
  }, ...] }
 * Authorization required: must be logged in
 */

router.get("/", ensureLoggedIn, async function (req, res, next) {
  try {
    const watchlists = await WatchList.findAll();
    return res.json({ watchlists });
  } catch (err) {
    return next(err);
  }
});

/** GET /[name]  =>  { movie }
 *
 *  movie = {  
    "movie_name",
    "platform",
    "poster",
    "rating",
    "release_year",
    imdb_id,
    "user_id" 
  }
 *  movie is a single entry in watch list.
 * Authorization required: must be logged in.
 */

router.get("/:name", ensureLoggedIn, async function (req, res, next) {
  try {
    const movie = await WatchList.get(req.params.name);
    return res.json({ movie });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
