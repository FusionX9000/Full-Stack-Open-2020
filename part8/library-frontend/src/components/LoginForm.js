import { useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { LOGIN } from "../queries";

const LoginForm = ({ show, setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });
  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      setToken(token);
      localStorage.setItem("library-user-token", token);
    }
  }, [result.data]); // eslint-disable-line
  const submit = (e) => {
    e.preventDefault();
    login({ variables: { username, password } });
  };

  if (!show) {
    return null;
  }

  return (
    <div>
      <form onSubmit={submit}>
        <label>username</label>
        <input
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          value={username}
        />
        <br />
        <label>password</label>
        <input onChange={(e) => setPassword(e.target.value)} type="password" />
        <br />
        <button>login</button>
      </form>
    </div>
  );
};

export default LoginForm;
