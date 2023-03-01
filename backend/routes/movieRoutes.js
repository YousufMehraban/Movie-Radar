// "use strict";

/** Routes for movie */

const jsonschema = require("jsonschema");
const express = require("express");
const MovieRadarAPI = require("../api");
const { BadRequestError } = require("../customError");
const { ensureLoggedIn } = require("../middleware/authorizations");
// const Recommendation = require("../models/recommendation");
// const recommendationSchema = require("../schemas/recommendation.json");

const router = new express.Router();

/** GET /  =>
 *   { movie: [ {
    "title",
    "poster",
    "user_rating",
    "year",
    "trailer",
    "genre_names"
    "imdb_id",
  }, ...] }
 * Authorization required: must be logged in
 */

router.get("/:id", ensureLoggedIn, async function (req, res, next) {
  try {
    const movie = await MovieRadarAPI.getDetails(req.params.id);
    return res.json({ movie });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
