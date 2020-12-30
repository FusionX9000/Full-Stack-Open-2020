const config = require("./utils/config");
const express = require("express");
const app = express();
require("express-async-errors");
const cors = require("cors");
const logger = require("./utils/logger");
const notesRouter = require("./controllers/notes");
const middleware = require("./utils/middleware");
const mongoose = require("mongoose");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");

const url = config.MONGODB_URI;
logger.info("connecting to", url);

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((result) => logger.info("connected to MongoDB"))
  .catch((error) => logger.info("error connecting to MongoDB", error.message));

app.use(express.json());
app.use(cors());
app.use(express.static("build"));
app.use(middleware.requestLogger);

if (process.env.NODE_ENV === "test") {
  const testingRouter = require("./controllers/testing");
  app.use("/api/testing", testingRouter);
}

app.get("/", (request, response) => {
  response.send("<h1>Hello World</h1>");
});

app.use("/api/notes", notesRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
