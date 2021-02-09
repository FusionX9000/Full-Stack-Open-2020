import React, { useEffect, useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import LoginForm from "./components/LoginForm";
import NewBook from "./components/NewBook";
import Recommed from "./components/Recommed";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);
  useEffect(() => {
    setToken(localStorage.getItem("library-user-token"));
  }, []);

  const logout = () => {
    localStorage.removeItem("library-user-token");
    setToken(null);
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token ? (
          <span>
            <button onClick={() => setPage("add")}>add book</button>
            <button onClick={() => setPage("recommend")}>recommend</button>
            <button onClick={logout}>logout</button>
          </span>
        ) : (
          <button onClick={() => setPage("login")}>login</button>
        )}
      </div>

      <Authors show={page === "authors"} />
      <Books show={page === "books"} />
      <NewBook show={page === "add"} />
      <LoginForm setToken={setToken} show={page === "login"} />
      <Recommed show={page === "recommend"} />
    </div>
  );
};

export default App;
