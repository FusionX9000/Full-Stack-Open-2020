import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
// import loginService from "./services/login";
import LoginForm from "./components/LoginForm";
import CreateBlog from "./components/CreateBlog";
import Notification from "./components/Notification";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);

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

  const addBlog = (newBlog) => {
    setBlogs(blogs.concat(newBlog));
  };

  const rememberUser = (user) => {
    window.localStorage.setItem("blogAppLoggedUser", JSON.stringify(user));
    blogService.setToken(user.token);
    setUser(user);
  };
  const handleLogout = (event) => {
    window.localStorage.removeItem("blogAppLoggedUser");
    setUser(null);
    blogService.setToken(null);
  };

  if (user === null)
    return (
      <div>
        <h2>Login to the application</h2>
        <Notification
          notification={notification}
          autoCloseNotification={autoCloseNotification}
        />
        <LoginForm
          rememberUser={rememberUser}
          setNotification={setNotification}
        />
      </div>
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
      <CreateBlog addBlog={addBlog} setNotification={setNotification} />
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
