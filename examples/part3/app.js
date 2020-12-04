const express = require("express");
const cors = require("cors");
const app = express();
const logger = require("./utils/logger");
const config = require("./utils/config");
const notesRouter = require("./controllers/notes");
const middleware = require("./utils/middleware");

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

app.use("/api/notes", notesRouter);

app.use(middlware.unknownEndpoint);
app.use(middlware.errorHandler);

module.exports = app;
