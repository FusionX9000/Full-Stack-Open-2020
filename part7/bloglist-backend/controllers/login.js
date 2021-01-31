const loginRouter = require("express").Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("../utils/config");

loginRouter.post("/", async (request, response) => {
  const body = request.body;
  const user = await User.findOne({ username: body.username });
  const passwordCorrect =
    user === null
      ? false
      : await bcrypt.compare(body.password, user.passwordHash);
  if (!passwordCorrect) {
    return response.status(400).json({ error: "invalid username or password" });
  }
  console.log(user.id, user._id);
  const userForToken = {
    username: user.username,
    id: user._id,
  };
  const token = jwt.sign(userForToken, config.SECRET);
  return response
    .status(200)
    .json({ token, username: user.username, name: user.name });
});

module.exports = loginRouter;
