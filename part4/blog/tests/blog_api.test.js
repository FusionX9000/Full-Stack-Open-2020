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
  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
  expect(blogsAtEnd).toContainEqual(addedBlog);
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

test("if blog is deleted correctly", async () => {
  const blogAtStart = await helper.blogsInDb();
  const blogToDelete = blogAtStart[0];
  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);
  const blogAtEnd = await helper.blogsInDb();
  expect(blogAtEnd.length).toBe(helper.initialBlogs.length - 1);
  const deletedBlog = await Blog.findById(blogToDelete.id);
  expect(deletedBlog).toBeNull();
});

test("if blog is updated correctly", async () => {
  const blogAtStart = await helper.blogsInDb();
  const blogToUpdate = blogAtStart[0];
  blogToUpdate.title = "updatetest" + new Date().toString();
  const updatedBlog = await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(blogToUpdate)
    .expect(200)
    .expect("Content-Type", /application\/json/);
  expect((await Blog.findById(blogToUpdate.id)).toJSON()).toEqual(blogToUpdate);
});

test("if error when updating incorrect id", async () => {
  const blog = {
    title: "test",
    author: "test",
    url: "test",
  };
  const id = await helper.nonExistingId();
  await api.put(`/api/blogs/${id}`).send(blog).expect(404);
});

afterAll(() => {
  mongoose.connection.close();
});
