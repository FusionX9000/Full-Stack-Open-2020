import React, { useState } from "react";

const Blog = ({ blog, updateBlog, removeBlog }) => {
  const [fullView, setFullView] = useState(false);
  const toggleView = () => setFullView(!fullView);
  const handleLike = () => {
    const newBlog = {
      ...blog,
      likes: blog.likes + 1,
    };
    updateBlog(newBlog);
  };
  const handleRemove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      removeBlog(blog);
    }
  };
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  if (fullView)
    return (
      <div style={blogStyle}>
        <div>
          {blog.title} <button onClick={toggleView}>hide</button>
        </div>
        <div>{blog.url}</div>
        <div>
          likes {blog.likes} <button onClick={handleLike}>like</button>
        </div>
        <div>{blog.author}</div>
        <button onClick={handleRemove}>remove</button>
      </div>
    );
  return (
    <div>
      {blog.title} {blog.author} <button onClick={toggleView}>view</button>
    </div>
  );
};

export default Blog;
