import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { logout } from "../reducers/loginReducer";
import "./Navigation.css";

const Navigation = () => {
  const user = useSelector((store) => store.login);
  const dispatch = useDispatch();
  const history = useHistory();
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
              <a
                href="/logout"
                onClick={() => {
                  dispatch(logout());
                  history.push("/");
                }}
              >
                Logout
              </a>
            </li>
          </span>
        ) : (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
      </ul>
      {/* <Link to="/blogs">blogs</Link> */}
    </nav>
  );
};

export default Navigation;
