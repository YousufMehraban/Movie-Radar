"use strict";

const { BadRequestError, UnauthorizedError } = require("../customError");
const db = require("../db.js");
const User = require("./user.js");
const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/**************** authenticate user ***********************/

describe("authenticate", function () {
  test("works", async function () {
    const user = await User.authenticate("testuser", "password");
    expect(user).toEqual({
      username: "testuser",
      first_name: "Test",
      last_name: "User",
      email: "joel@joelburton.com",
    });
  });

  test("unauth if no such user", async function () {
    try {
      await User.authenticate("nope", "password");
      fail();
    } catch (err) {
      expect(err instanceof UnauthorizedError).toBeTruthy();
    }
  });

  test("unauth if wrong password", async function () {
    try {
      await User.authenticate("testuser", "wrong");
      fail();
    } catch (err) {
      expect(err instanceof UnauthorizedError).toBeTruthy();
    }
  });
});

/**************** register a user ***********************/

describe("register", function () {
  const newUser = {
    username: "new",
    first_name: "Test",
    last_name: "Tester",
    email: "test@test.com",
  };

  test("works", async function () {
    let user = await User.register({
      ...newUser,
      password: "password",
    });
    expect(user).toEqual(newUser);
    const found = await db.query("SELECT * FROM users WHERE username = 'new'");
    expect(found.rows.length).toEqual(1);
    expect(found.rows[0].password.startsWith("$2b$")).toEqual(true);
  });

  test("bad request with dup data", async function () {
    try {
      await User.register({
        ...newUser,
        password: "password",
      });
      await User.register({
        ...newUser,
        password: "password",
      });
      fail();
    } catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy();
    }
  });
});

/****************** find a user *********************/

describe("get", function () {
  test("works", async function () {
    let user = await User.get("testuser");
    expect(user).toEqual({
      username: "testuser",
      first_name: "Test",
      last_name: "User",
      email: "joel@joelburton.com",
    });
  });

  test("not found if no such user", async function () {
    try {
      await User.get("nope");
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});
