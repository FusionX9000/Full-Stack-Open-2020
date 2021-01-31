import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./Navigation.css";

const Navigation = () => {
  const user = useSelector((store) => store.login);
  return (
    <nav className="navbar-top">
      <ul>
        <li>
          <Link to="/blogs">Blogs</Link>
        </li>
        <li>
          <Link to="/users">Users</Link>
        </li>

        {user ? (
          <span>
            <li>{user.name} logged in</li>

            <li>
              <a href="/logout">Logout</a>
            </li>
          </span>
        ) : (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
