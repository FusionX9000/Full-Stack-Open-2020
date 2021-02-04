import React, { useState } from "react";
import { useApolloClient, useQuery } from "@apollo/client";
import Persons from "./components/Persons";
import { ALL_PERSONS } from "./queries";
import PersonForm from "./components/PersonForm";
import LoginForm from "./components/LoginForm";

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [token, setToken] = useState();
  const client = useApolloClient();
  const result = useQuery(ALL_PERSONS);

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

  const logout = () => {
    localStorage.clear();
    setToken(null);
    client.resetStore();
  };

  if (!token) {
    return (
      <div>
        <Notify errorMessage={errorMessage} />
        <h2>Login</h2>
        <LoginForm setToken={setToken} setError={notify} />
      </div>
    );
  }

  if (result.loading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <button onCLick={logout}>logout</button>
      <Notify errorMessage={errorMessage} />
      <Persons persons={result.data.allPersons} />
      <PersonForm setError={notify} />
    </div>
  );
};

const Notify = ({ errorMessage }) => {
  if (!errorMessage) {
    return null;
  }
  return <div style={{ color: "red" }}>{errorMessage}</div>;
};
export default App;
