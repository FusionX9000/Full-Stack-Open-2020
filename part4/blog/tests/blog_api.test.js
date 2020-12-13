const app = require("../app");
const Blog = require("../models/blog");
const User = require("../models/user");
const helper = require("./test_helper");
const supertest = require("supertest");
const api = supertest(app);
const mongoose = require("mongoose");

beforeEach(async () => {
  await Promise.all([Blog.deleteMany({}), User.deleteMany({})]);

  const user = await helper.addUser({
    username: "root",
    name: "root",
    password: "password",
  });

  for (let blog of helper.initialBlogs) {
    blog.user = user._id;
    const addedBlog = await new Blog(blog).save();
    await User.updateOne(
      { _id: user._id },
      { $push: { blogs: addedBlog._id } }
    );
  }
});

describe("when retrieving blogs", () => {
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
});

describe("successfully adding a blog", () => {
  test("new blog is added correctly", async () => {
    const blog = {
      title: "test",
      author: "test",
      url: "www.test.com",
      likes: 5,
    };

    const token = await helper.userToken(helper.defaultUser.username);

    const response = await api
      .post("/api/blogs")
      .send(blog)
      .set("Authorization", `Bearer ${token}`)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const addedBlog = response.body;
    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
    expect(blogsAtEnd.map((blog) => blog.id)).toContain(addedBlog.id);

    const user = await User.findOne({ username: helper.defaultUser.username });
    expect(user.blogs.map((blogIdObject) => blogIdObject.toString())).toContain(
      addedBlog.id
    );
  });

  test("if missing likes default to 0", async () => {
    const blog = {
      title: "test",
      author: "test",
      url: "www.test.com",
    };
    const token = await helper.userToken(helper.defaultUser.username);

    const response = await api
      .post("/api/blogs")
      .send(blog)
      .set("Authorization", `Bearer ${token}`)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const addedBlog = response.body;
    expect(addedBlog).toHaveProperty("likes", 0);
  });
});

describe("adding a blog with incorrect parameters returns the correct error", () => {
  test("blog isn't added if token missing", async () => {
    const blog = {
      title: "test",
      author: "test",
      url: "www.test.com",
      likes: 5,
    };

    await api
      .post("/api/blogs")
      .send(blog)
      .expect(401)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  });

  test("if response is 400 Bad request when missing title", async () => {
    const blog = {
      url: "test.com",
      author: "test",
    };

    const token = await helper.userToken(helper.defaultUser.username);

    await api
      .post("/api/blogs")
      .send(blog)
      .set("Authorization", `Bearer ${token}`)
      .expect(400)
      .expect("Content-Type", /application\/json/);
    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  });

  test("if response is 400 Bad request when missing url", async () => {
    const blog = {
      title: "test",
      author: "test",
    };
    const token = await helper.userToken(helper.defaultUser.username);

    await api
      .post("/api/blogs")
      .send(blog)
      .set("Authorization", `Bearer ${token}`)
      .expect(400)
      .expect("Content-Type", /application\/json/);
    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  });

  test("if response is 400 Bad request when missing title and url", async () => {
    const blog = {
      author: "test",
    };
    const token = await helper.userToken(helper.defaultUser.username);

    await api
      .post("/api/blogs")
      .send(blog)
      .set("Authorization", `Bearer ${token}`)
      .expect(400)
      .expect("Content-Type", /application\/json/);
    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  });
});

describe("when deleting a blog", () => {
  test("if blog is deleted correctly", async () => {
    const blogAtStart = await helper.blogsInDb();
    const blogToDelete = blogAtStart[0];

    const token = await helper.userToken(helper.defaultUser.username);

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(204);

    const blogAtEnd = await helper.blogsInDb();
    expect(blogAtEnd.length).toBe(helper.initialBlogs.length - 1);
    const deletedBlog = await Blog.findById(blogToDelete.id);
    expect(deletedBlog).toBeNull();
  });
  test("user blogs array is updated when blog is deleted", async () => {
    const blogAtStart = await helper.blogsInDb();
    const blogToDelete = blogAtStart[0];
    const userId = blogToDelete.user.toString();
    const userAtStart = await User.findById(userId);

    const token = await helper.userToken(helper.defaultUser.username);

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(204);

    const userAtEnd = await User.findById(userId);
    expect(
      await userAtEnd.blogs.map((blogIdObject) => blogIdObject.toString())
    ).not.toContain(blogToDelete.id);
    expect(userAtEnd.blogs).toHaveLength(userAtStart.blogs.length - 1);
  });
});

describe("updating a blog", () => {
  test("if blog is updated correctly", async () => {
    const blogAtStart = await helper.blogsInDb();
    const blogToUpdate = blogAtStart[0];
    blogToUpdate.title = "updatetest" + new Date().toString();
    const updatedBlog = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .expect(200)
      .expect("Content-Type", /application\/json/);
    expect((await Blog.findById(blogToUpdate.id)).toJSON()).toEqual(
      blogToUpdate
    );
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
});

afterAll(() => {
  mongoose.connection.close();
});
