import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CreateBlog from "./CreateBlog";
import Togglable from "./Togglable";
import { initializeBlogs } from "../reducers/blogReducer";
import "./Blogs.css";

const Blogs = () => {
  const blogs = useSelector((store) => store.blogs);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  // const blogStyle = {
  //   paddingTop: 10,
  //   paddingLeft: 2,
  //   border: "solid",
  //   borderWidth: 1,
  //   marginBottom: 5,
  // };
  return (
    <div>
      <Togglable buttonLabel="create new blog">
        <CreateBlog />
      </Togglable>
      <div className="links-container">
        {blogs
          .sort((a, b) => -(a.likes - b.likes))
          .map((blog) => (
            <div key={blog.id}>
              <div className="link-container">
                <Link to={`/blogs/${blog.id}`}>
                  <div className="link">
                    {blog.title} {blog.author}
                  </div>
                </Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Blogs;
