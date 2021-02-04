import React, { useEffect, useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import LoginForm from "./components/LoginForm";
import NewBook from "./components/NewBook";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);
  useEffect(() => {
    setToken(localStorage.getItem("library-user-token"));
  }, []);
  useEffect(() => {
    if (token) setPage("authors");
  }, [token]);
  const logout = () => {
    localStorage.removeItem("library-user-token");
    setToken(null);
  };
  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
        {token ? (
          <button onClick={logout}>logout</button>
        ) : (
          <button onClick={() => setPage("login")}>login</button>
        )}
      </div>

      <Authors show={page === "authors"} />

      <Books show={page === "books"} />

      <NewBook show={page === "add"} />

      <LoginForm setToken={setToken} show={page === "login"} />
    </div>
  );
};

export default App;
