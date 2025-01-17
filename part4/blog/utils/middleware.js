const logger = require("./logger");

const unknownEndpoint = (error, request, response, next) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);
  if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  } else if (error.name === "CastError") {
    return response.status(400).send({ error: "malformed id" });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).json({ error: "invalid token" });
  }
  next(error);
};

const tokenExtractor = (request, response, next) => {
  request.token = null;
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    request.token = authorization.substring(7);
  }
  next();
};

module.exports = { unknownEndpoint, errorHandler, tokenExtractor };
