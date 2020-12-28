import PropTypes from "prop-types";
import React, { useState } from "react";
import loginService from "../services/login";

const LoginForm = ({ rememberUser, setNotification }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      setUsername("");
      setPassword("");
      rememberUser(user);
    } catch (exception) {
      setNotification({ message: "wrong username or password", type: "error" });
    }
  };
  return (
    <div>
      <form onSubmit={handleLogin}>
        username
        <input
          type="username"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
        <button type="submit">login</button>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  rememberUser: PropTypes.func.isRequired,
  setNotification: PropTypes.func.isRequired,
};

export default LoginForm;
