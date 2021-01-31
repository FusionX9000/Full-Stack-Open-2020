import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { removeBlog, updateBlog } from "../reducers/blogReducer";
import Comments from "./Comments";

const Blog = () => {
  const id = useParams().id;
  const blogs = useSelector((store) => store.blogs);
  const user = useSelector((store) => store.login);
  const blog = blogs && blogs.find((blog) => blog.id === id);
  const history = useHistory();
  const dispatch = useDispatch();
  if (!blog) {
    history.push("/blogs");
    return null;
  }
  const showRemove = blog.user && blog.user.username === user.username;
  const handleLike = () => {
    const newBlog = {
      ...blog,
      likes: blog.likes + 1,
    };
    dispatch(updateBlog(blog.id, newBlog));
  };

  const handleRemove = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await dispatch(removeBlog(blog.id));
      history.push("/blogs");
    }
  };

  return (
    <div>
      <div>
        <h2>
          {blog.title} by {blog.author}
        </h2>
        <div>
          URL: <a href={blog.url}>{blog.url}</a>
        </div>
        <div>
          {blog.likes} likes
          <button onClick={handleLike} className="like-button">
            like
          </button>
        </div>
        {blog.user ? <div>added by {blog.user.name}</div> : null}
        {showRemove ? (
          <button onClick={handleRemove} className="remove-button">
            remove
          </button>
        ) : (
          ""
        )}
        <Comments blogId={blog.id} />
      </div>
      {/* <div>
          {blog.title} {blog.author}
        </div> */}
    </div>
  );
};

export default Blog;
