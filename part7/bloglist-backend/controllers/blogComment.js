const blogCommentRouter = require("express").Router({ mergeParams: true });
const Comment = require("../models/comment");
const Blog = require("../models/blog");
const mongoose = require("mongoose");
const { response } = require("../app");

blogCommentRouter.get("/", async (req, res) => {
  const blogId = req.params.id;
  const blog = await (
    await Blog.findById(blogId)
      .select("comments")
      .populate("comments", { content: 1 })
  ).execPopulate();
  // const comments = await blog
  // .populate("comments", { content: 1 })
  // .execPopulate();
  res.json(blog.comments);
});

blogCommentRouter.post("/", async (req, res) => {
  const body = req.body;
  const blogId = req.params.id;
  const blogExists = await Blog.exists({ _id: blogId });
  if (!blogExists) {
    response.status(400).json({ error: "invalid blog id" });
  }
  const comment = await new Comment({
    blog: blogId,
    content: body.content,
  }).save();
  await Blog.updateOne({ _id: blogId }, { $push: { comments: comment._id } });
  res.json(comment);
});

module.exports = blogCommentRouter;
