// "use strict";

/** Routes for authentication. */

const jsonschema = require("jsonschema");

const User = require("../models/user");
const express = require("express");
const router = new express.Router();
const { createToken } = require("../helpers/createToken");
const userSchema = require("../schemas/user.json");
const userAuthSchema = require("../schemas/userAuthSchema.json");
const userUpdateSchema = require("../schemas/userUpdateSchema.json");
const { BadRequestError } = require("../customError");
const { ensureLoggedIn } = require("../middleware/authorizations");

/** POST /users/login:  { username, password } => { token }
 * Returns JWT token which can be used to authenticate further requests.
 */

router.post("/login", async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, userAuthSchema);
    if (!validator.valid) {
      const errs = validator.errors.map((e) => e.stack);
      throw new BadRequestError(errs);
    }

    const { username, password } = req.body;
    const user = await User.authenticate(username, password);
    const token = createToken(user);
    return res.json({ token });
  } catch (err) {
    return next(err);
  }
});

/** POST /users/register:   { user } => { token }
 * user must include { username, password, first_name, last_name, email }
 * Returns JWT token which can be used to authenticate further requests.
 */

router.post("/register", async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, userSchema);
    if (!validator.valid) {
      const errs = validator.errors.map((e) => e.stack);
      throw new BadRequestError(errs);
    }

    const newUser = await User.register({ ...req.body });
    const token = createToken(newUser);
    return res.status(201).json({ token });
  } catch (err) {
    return next(err);
  }
});

// /** GET /users/[username] => { user }
//  * Returns { username, first_name, last_name, email }
//  * Authorization required: must be logged in
//  **/

router.get("/:username", ensureLoggedIn, async function (req, res, next) {
  try {
    const user = await User.get(req.params.username);
    return res.json({ user });
  } catch (err) {
    return next(err);
  }
});

// /** GET /users/ => [{ user },...]
//  * Returns [{ username, first_name, last_name, email },...]
//  * Authorization required: must be logged in
//  **/

router.get("/", ensureLoggedIn, async function (req, res, next) {
  try {
    const users = await User.getAll();
    return res.json({ users });
  } catch (err) {
    return next(err);
  }
});

router.patch("/", ensureLoggedIn, async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, userUpdateSchema);
    if (!validator.valid) {
      const errs = validator.errors.map((e) => e.stack);
      throw new BadRequestError(errs);
    }
    await User.update({ ...req.body });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
