// "use strict";

/** Routes for Recommendation */

const jsonschema = require("jsonschema");
const express = require("express");

const { BadRequestError } = require("../customError");
const { ensureLoggedIn } = require("../middleware/authorizations");
const Recommendation = require("../models/recommendation");
const recommendationSchema = require("../schemas/recommendation.json");
const movieSchema = require("../schemas/movieSchema.json");
const router = new express.Router();

/** POST / { recommendation } =>  { recommendation }
 * recommendation = {  
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

    const recommendation = await Recommendation.createAndAddToRecommendation(
      req.body
    );
    return res.status(201).json({ recommendation });
  } catch (err) {
    return next(err);
  }
});

/** GET /  =>
 *   { recommendation: [ {  
    "movie_name",
    "poster",
    "rating",
    "release_year",
    "imdb_id",
  }, ...] }
 * Authorization required: must be logged in
 */

router.get(`/:user_id`, ensureLoggedIn, async function (req, res, next) {
  try {
    const recommendations = await Recommendation.findMyRecommendation(
      req.params.user_id
    );
    return res.json({ recommendations });
  } catch (err) {
    return next(err);
  }
});

/** DELETE /[id]  =>  ''
 * Authorization required: must be logged in.
 */
router.delete("/:id", ensureLoggedIn, async function (req, res, next) {
  try {
    await Recommendation.removeFromRecommendation(req.params.id);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
