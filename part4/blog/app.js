require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const config = require("./utils/config");
const blogRouter = require("./controllers/blog");
const mongoose = require("mongoose");

mongoose.connect(config.mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

app.use(cors());
app.use(express.json());
app.use("/api/blogs", blogRouter);

module.exports = app;
