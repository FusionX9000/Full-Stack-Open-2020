const config = require("./utils/config");
const express = require("express");
require("express-async-errors");
const app = express();
const cors = require("cors");
const blogRouter = require("./controllers/blog");
const mongoose = require("mongoose");
const {
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
} = require("./utils/middleware");
const usersRouter = require("./controllers/user");
const loginRouter = require("./controllers/login");

mongoose.connect(config.mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

app.use(cors());
app.use(express.json());
app.use(tokenExtractor);
app.use("/api/blogs", blogRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
app.use(errorHandler);
app.use(unknownEndpoint);

module.exports = app;
