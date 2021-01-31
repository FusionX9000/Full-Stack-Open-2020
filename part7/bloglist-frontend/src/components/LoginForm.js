import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../reducers/loginReducer";
import { showNotification } from "../reducers/notificationReducer";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await dispatch(login(username, password));
    } catch (exception) {
      dispatch(showNotification("wrong username or password", "error"));
      setUsername("");
      setPassword("");
    }
  };

  return (
    <div>
      <h2>Login to the application</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">username</label>
          <input
            type="username"
            value={username}
            name="Username"
            id="username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">password</label>
          <input
            type="password"
            value={password}
            name="Password"
            id="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <div>
          <button type="submit" id="login-button">
            login
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
