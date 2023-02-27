// "use strict";

const app = require("./app");
const { PORT } = require("./config");

const cors = require("cors");
app.use(
  cors({
    origin: `http://localhost:${PORT}`,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Origin",
      "X-Requested-With",
      "Accept",
      "x-client-key",
      "x-client-token",
      "x-client-secret",
      "Authorization",
    ],
    credentials: true,
  })
);

app.listen(PORT, function () {
  console.log(`Started on http://localhost:${PORT}`);
});
