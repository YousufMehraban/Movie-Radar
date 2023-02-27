// "use strict";

/** Routes for Recommendation */

const jsonschema = require("jsonschema");
const express = require("express");

const { BadRequestError } = require("../customError");
const { ensureLoggedIn } = require("../middleware/authorizations");
const Recommendation = require("../models/recommendation");
const recommendationSchema = require("../schemas/recommendation.json");

const router = new express.Router();

/** POST / { recommendation } =>  { recommendation }
 * recommendation = {  
    "movie_name",
    "platform",
    "poster",
    "rating",
    "release_year",
    "imdb_id",
    "user_id" 
  }
 *
 * Returns {  
    "movie_name",
    "platform",
    "poster",
    "rating",
    "release_year",
    "imdb_id",
    "user_id" 
  }
 *
 * Authorization required: must be logged in
 */

router.post("/", ensureLoggedIn, async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, recommendationSchema);
    if (!validator.valid) {
      const errs = validator.errors.map((e) => e.stack);
      throw new BadRequestError(errs);
    }

    const recommendation = await Recommendation.create(req.body);
    return res.status(201).json({ recommendation });
  } catch (err) {
    return next(err);
  }
});

/** GET /  =>
 *   { recommendation: [ {  
    "movie_name",
    "platform",
    "poster",
    "rating",
    "release_year",
    "imdb_id",
    "user_id" 
  }, ...] }
 * Authorization required: must be logged in
 */

router.get("/", ensureLoggedIn, async function (req, res, next) {
  try {
    const recommendations = await Recommendation.findAll();
    return res.json({ recommendations });
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
    "imdb_id",
    "user_id" 
  }
 *  movie is a single entry in recommendation list
 * Authorization required: must be logged in.
 */

router.get("/:name", ensureLoggedIn, async function (req, res, next) {
  try {
    const movie = await Recommendation.get(req.params.name);
    return res.json({ movie });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
