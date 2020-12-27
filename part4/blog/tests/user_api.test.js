const app = require("../app");
const api = require("supertest")(app);
const User = require("../models/user");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const helper = require("./test_helper");

describe("when one user exists in db", () => {
  beforeEach(async () => {
    await User.deleteMany({});
    const user = new User({
      username: "root",
      name: "admin",
      passwordHash: await bcrypt.hash("password", 10),
    });
    await user.save();
  });
  test("user is added successfully", async () => {
    const usersAtStart = await helper.usersInDb();
    const newUser = {
      username: "samurai",
      name: "Johnny Silverhand",
      password: "hunter2",
    };
    const response = await api
      .post("/api/users")
      .send(newUser)
      .expect(200)
      .expect("Content-Type", /application\/json/);
    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);
    expect(usersAtEnd.map((u) => u.username)).toContain(newUser.username); //improve
  });
  test("user creation fails if user already exists", async () => {
    const usersAtStart = await helper.usersInDb();
    const newUser = {
      username: "root",
      name: "admin",
      password: "123456",
    };
    await api.post("/api/users").send(newUser).expect(400);
    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });
});

describe("user creation validation for incorrect inputs", () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });
  test("user creation fails if username less than 3 characters", async () => {
    const usersAtStart = await helper.usersInDb();
    const newUser = {
      username: "jo",
      name: "Jon Snow",
      password: "123456",
    };
    await api.post("/api/users").send(newUser).expect(400);
    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });
  test("user creation fails if password less than 3 characters", async () => {
    const usersAtStart = await helper.usersInDb();
    const newUser = {
      username: "Ozymandias",
      name: "ivan",
      password: "00",
    };
    await api.post("/api/users").send(newUser).expect(400);
    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });
  test("user creation fails if username is missing", async () => {
    const usersAtStart = await helper.usersInDb();
    const newUser = {
      name: "ivan",
      password: "00",
    };
    await api.post("/api/users").send(newUser).expect(400);
    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });
  test("user creation fails if password is missing", async () => {
    const usersAtStart = await helper.usersInDb();
    const newUser = {
      username: "Ozymandias",
      name: "ivan",
    };
    await api.post("/api/users").send(newUser).expect(400);
    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
