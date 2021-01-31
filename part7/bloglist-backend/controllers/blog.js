const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const jwt = require("jsonwebtoken");
const config = require("../utils/config");
const User = require("../models/user");
const blogCommentRouter = require("./blogComment");

blogRouter.use("/:id/comments", blogCommentRouter);

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  return response.json(blogs);
});

blogRouter.post("/", async (request, response) => {
  const decodedToken = jwt.verify(request.token, config.SECRET);
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }
  const user = await User.findById(decodedToken.id);
  const blog = new Blog({ ...request.body, user: user._id });
  const result = await (await blog.save())
    .populate("user", { username: 1, name: 1, id: 1 })
    .execPopulate();
  console.log(result);
  await User.updateOne({ _id: user._id }, { $push: { blogs: blog._id } });
  // user.blogs.push(result._id);
  // await user.save();
  return response.status(201).json(result);
});

blogRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id).populate("user");
  return response.json(blog);
});

blogRouter.put("/:id", async (request, response) => {
  const body = request.body;
  const blog = {
    author: body.author,
    title: body.title,
    url: body.url,
    likes: body.likes,
  };
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
    runValidators: true,
    context: "query",
  });
  if (updatedBlog) {
    const populatedBlog = await updatedBlog
      .populate("user", { username: 1, name: 1, id: 1 })
      .execPopulate();
    console.log(updatedBlog, populatedBlog);
    return response.json(populatedBlog);
  } else {
    return response.status(404).end();
  }
});
blogRouter.delete("/:id", async (request, response) => {
  const decodedToken = jwt.verify(request.token, config.SECRET);
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }
  const blog = await Blog.findById(request.params.id);
  if (blog) {
    if (blog.user.toString() == decodedToken.id) {
      await Blog.findByIdAndRemove(request.params.id);
      // const user = await User.findById(decodedToken.id);
      // user.blogs.filter((blog) => blog.id.toString() != request.params.id);
      // await user.save();
      await User.updateOne(
        { _id: decodedToken.id },
        { $pull: { blogs: blog._id } }
      );
    } else {
      return response
        .status(403)
        .json({ error: "user doesn't have access to this resource" });
    }
    return response.status(204).end();
  }
});

module.exports = blogRouter;
