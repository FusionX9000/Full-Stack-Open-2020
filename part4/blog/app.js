const config = require("./utils/config");
const express = require("express");
const app = express();
const cors = require("cors");
const blogRouter = require("./controllers/blog");
const mongoose = require("mongoose");
const { unknownEndpoint, errorHandler } = require("./utils/middleware");

mongoose.connect(config.mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

app.use(cors());
app.use(express.json());
app.use("/api/blogs", blogRouter);
app.use(errorHandler);
app.use(unknownEndpoint);

module.exports = app;
