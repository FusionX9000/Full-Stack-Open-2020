import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
// import loginService from "./services/login";
import LoginForm from "./components/LoginForm";
import CreateBlog from "./components/CreateBlog";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);

  const updateBlog = async (blog) => {
    try {
      await blogService.update(blog);
      setBlogs(blogs.map((b) => (b.id === blog.id ? blog : b)));
    } catch (exception) {
      console.log(exception);
    }
  };

  const removeBlog = async (blog) => {
    try {
      await blogService.remove(blog);
      setBlogs(blogs.filter((b) => b.id !== blog.id));
    } catch (exception) {
      console.log(exception);
    }
  };

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem("blogAppLoggedUser");
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const autoCloseNotification = () =>
    setTimeout(() => setNotification(null), 3000);

  const addBlog = async (newBlog) => {
    try {
      const returnedBlog = await blogService.add(newBlog);
      setBlogs(blogs.concat(returnedBlog));
      setNotification({
        message: `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`,
        type: "info",
      });
    } catch (exception) {
      setNotification({ message: "Error adding blog", type: "error" });
    }
  };

  const rememberUser = (user) => {
    window.localStorage.setItem("blogAppLoggedUser", JSON.stringify(user));
    blogService.setToken(user.token);
    setUser(user);
  };
  const handleLogout = () => {
    window.localStorage.removeItem("blogAppLoggedUser");
    setUser(null);
    blogService.setToken(null);
  };

  if (user === null)
    return (
      <Togglable buttonLabel="login">
        <h2>Login to the application</h2>
        <Notification
          notification={notification}
          autoCloseNotification={autoCloseNotification}
        />
        <LoginForm
          rememberUser={rememberUser}
          setNotification={setNotification}
        />
      </Togglable>
    );

  return (
    <div>
      <h2>blogs</h2>
      <Notification
        notification={notification}
        autoCloseNotification={autoCloseNotification}
      />
      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>
      <Togglable buttonLabel="create new blog">
        <CreateBlog addBlog={addBlog} />
      </Togglable>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          updateBlog={updateBlog}
          removeBlog={removeBlog}
        />
      ))}
    </div>
  );
};

export default App;
