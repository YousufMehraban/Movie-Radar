// "use strict";

const express = require("express");
const cors = require("cors");

const { NotFoundError } = require("./customError");

const { authenticateJWT } = require("./middleware/authorizations");
const userRoutes = require("./routes/userRoutes");
const recommendationRoutes = require("./routes/recommendationRoutes");
const watchListRoutes = require("./routes/watchListRoutes");
const movieRoutes = require("./routes/movieRoutes");
const morgan = require("morgan");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));
app.use(authenticateJWT);

app.use("/users", userRoutes);
app.use("/recommendation", recommendationRoutes);
app.use("/watchlist", watchListRoutes);
app.use("/movie", movieRoutes);

/** Handle 404 errors -- this matches everything */
app.use(function (req, res, next) {
  return next(new NotFoundError());
});

/** Generic error handler; anything unhandled goes here. */
app.use(function (err, req, res, next) {
  if (process.env.NODE_ENV !== "test") console.error(err.stack);
  const status = err.status || 500;
  const message = err.message;

  return res.status(status).json({
    error: { message, status },
  });
});

module.exports = app;
