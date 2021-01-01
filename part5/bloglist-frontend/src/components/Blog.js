import React, { useState } from "react";

const Blog = ({ blog, updateBlog, removeBlog, showRemove }) => {
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
  // if (fullView) return <div style={blogStyle}></div>;
  return (
    <div style={blogStyle}>
      {fullView ? (
        <div>
          <div>
            {blog.title} <button onClick={toggleView}>hide</button>
          </div>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes}{" "}
            <button onClick={handleLike} className="like-button">
              like
            </button>
          </div>
          <div>{blog.author}</div>
          {showRemove ? (
            <button onClick={handleRemove} className="remove-button">
              remove
            </button>
          ) : (
            ""
          )}
        </div>
      ) : (
        <div>
          {blog.title} {blog.author} <button onClick={toggleView}>view</button>
        </div>
      )}
    </div>
  );
};

export default Blog;
