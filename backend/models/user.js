"use strict";

const db = require("../db");
const bcrypt = require("bcrypt");
const { BCRYPT_WORK_FACTOR } = require("../config.js");
const {
  BadRequestError,
  UnauthorizedError,
  NotFoundError,
} = require("../customError");

/** All Related Methods For Users. */

class User {
  /** authenticate user with username, password.
   * Returns { username, first_name, last_name, email}
   * Throws UnauthorizedError if user not found or wrong password.
   **/
  static async authenticate(username, password) {
    // first find the user in the db.
    const result = await db.query(
      `SELECT username,
                  password,
                  first_name,
                  last_name,
                  email
           FROM users
           WHERE username = $1`,
      [username]
    );

    const user = result.rows[0];

    if (user) {
      // compare hashed password with the hash of the new password.
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid === true) {
        delete user.password;
        return user;
      }
    }

    throw new UnauthorizedError("Invalid username/password");
  }

  /** Register user with data.
   * Returns { username, firstName, lastName, email }
   * Throws BadRequestError on duplicates.
   **/
  static async register({ username, password, first_name, last_name, email }) {
    const duplicateCheck = await db.query(
      `SELECT username
           FROM users
           WHERE username = $1`,
      [username]
    );

    if (duplicateCheck.rows[0]) {
      throw new BadRequestError(`Duplicate username: ${username}`);
    }

    const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

    const result = await db.query(
      `INSERT INTO users
           (username,
            password,
            first_name,
            last_name,
            email)
           VALUES ($1, $2, $3, $4, $5)
           RETURNING username, first_name, last_name, email`,
      [username, hashedPassword, first_name, last_name, email]
    );

    const user = result.rows[0];

    return user;
  }

  /** find a user by username.
   * Returns { username, first_name, las_name, email }
   * Throws NotFoundError if username doesn't exist.
   **/
  static async get(username) {
    const userRes = await db.query(
      `SELECT username, first_name, last_name, email FROM users WHERE username = $1`,
      [username]
    );

    const user = userRes.rows[0];

    if (!user) throw new NotFoundError(`No user: ${username}`);
    return user;
  }

  /** find all user.
   * Returns [{ username, first_name, las_name, email },...]
   **/
  static async getAll() {
    const userRes = await db.query(
      `SELECT username, first_name, last_name, email FROM users`
    );

    const user = userRes.rows;

    return user;
  }
}

module.exports = User;
