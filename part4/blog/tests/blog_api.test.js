const app = require("../app");
const Blog = require("../models/blog");
const helper = require("./test_helper");
const supertest = require("supertest");
const api = supertest(app);
const mongoose = require("mongoose");

beforeEach(async () => {
  await Blog.deleteMany({});
  for (let blog of helper.initialBlogs) {
    await new Blog(blog).save();
  }
});

test("if the application returns correct amount of blog posts", async () => {
  const response = await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
  expect(response.body.length).toBe(helper.initialBlogs.length);
});

test("if the blog has id as identifier", async () => {
  const response = await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
  expect(response.body[0].id).toBeDefined();
});

test("new blog is added correctly", async () => {
  const blog = {
    title: "test",
    author: "test",
    url: "www.test.com",
    likes: 5,
  };
  const response = await api
    .post("/api/blogs")
    .send(blog)
    .expect(201)
    .expect("Content-Type", /application\/json/);
  const addedBlog = response.body;
  const notesAtEnd = await helper.blogsInDb();
  expect(notesAtEnd).toHaveLength(helper.initialBlogs.length + 1);
  expect(notesAtEnd).toContainEqual(addedBlog);
});

test("if missing likes default to 0", async () => {
  const blog = {
    title: "test",
    author: "test",
    url: "www.test.com",
  };
  const response = await api
    .post("/api/blogs")
    .send(blog)
    .expect(201)
    .expect("Content-Type", /application\/json/);
  const addedBlog = response.body;
  expect(addedBlog).toHaveProperty("likes", 0);
  // expect(notesAtEnd).toContainEqual(addedBlog);
  // expect(notesAtEnd).toHaveLength(helper.initialBlogs.length + 1);
});

test("if response is 400 Bad request when missing title", async () => {
  const blog = {
    url: "test.com",
    author: "test",
  };
  await api
    .post("/api/blogs")
    .send(blog)
    .expect(400)
    .expect("Content-Type", /application\/json/);
});

test("if response is 400 Bad request when missing url", async () => {
  const blog = {
    title: "test",
    author: "test",
  };
  await api
    .post("/api/blogs")
    .send(blog)
    .expect(400)
    .expect("Content-Type", /application\/json/);
});

test("if response is 400 Bad request when missing title and url", async () => {
  const blog = {
    author: "test",
  };
  await api
    .post("/api/blogs")
    .send(blog)
    .expect(400)
    .expect("Content-Type", /application\/json/);
});

afterAll(() => {
  mongoose.connection.close();
});
