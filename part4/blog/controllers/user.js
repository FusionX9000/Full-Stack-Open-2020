const usersRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs", {
    title: 1,
    author: 1,
    url: 1,
    likes: 1,
  });
  response.json(users);
});

usersRouter.post("/", async (request, response) => {
  const body = request.body;

  const saltRounds = 10;
  if (!body.password) {
    return response.status(400).json({ error: "missing password" });
  } else if (body.password.length < 3) {
    return response
      .status(400)
      .json({ error: "password length should be at least 3" });
  }
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  });

  const savedUser = await user.save();
  response.json(savedUser);
});

module.exports = usersRouter;
