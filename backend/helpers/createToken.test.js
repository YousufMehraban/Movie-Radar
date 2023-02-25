const jwt = require("jsonwebtoken");
const { createToken } = require("./createToken");
const { SECRET_KEY } = require("../config");

describe("createToken", function () {
  test("works", function () {
    const token = createToken({ username: "test" });
    const payload = jwt.verify(token, SECRET_KEY);
    expect(payload).toEqual({
      iat: expect.any(Number),
      username: "test",
    });
  });

  test("fails: wrong secret key", function () {
    // given an incorrect secret key, jwt verification fails.
    const token = createToken({ username: "test" });
    const payload = jwt.verify(token, "wrong");
    expect(payload).toBeFalsy();
  });
});
