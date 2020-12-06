const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const logger = require("../utils/logger");

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogRouter.post("/", async (request, response) => {
  const blog = new Blog(request.body);
  const result = await blog.save();
  response.status(201).json(result);
});

blogRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  return response.json(blog);
});

blogRouter.put("/:id", async (request, response) => {
  const body = request.body;
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, body, {
    new: true,
    runValidators: true,
    context: "query",
  });
  if (updatedBlog) {
    return response.json(updatedBlog);
  } else {
    return response.status(404).end();
  }
});

blogRouter.delete("/:id", async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id);
  return response.status(204).end();
});

module.exports = blogRouter;
