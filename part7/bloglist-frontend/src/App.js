import React, { useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import { useDispatch, useSelector } from "react-redux";
import { logout, setUser } from "./reducers/loginReducer";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import Users from "./components/Users";
import User from "./components/User";
import Blogs from "./components/Blogs";
import Navigation from "./components/Navigation";
import "./App.css";

const PrivateRoute = ({ children, ...rest }) => {
  const user = useSelector((store) => store.login);
  const authenticated = user !== null;
  return (
    <Route {...rest}>
      {authenticated ? children : <Redirect to="/login" />}
    </Route>
  );
};

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.login);
  if (!user) {
    const loggedUserJson = window.localStorage.getItem("blogAppLoggedUser");
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson);
      blogService.setToken(user.token);
      dispatch(setUser(user));
    }
  }
  const Logout = () => {
    const history = useHistory();
    useEffect(() => {
      dispatch(logout());
      history.push("/");
    }, []);
    return null;
  };
  return (
    <div>
      <Navigation />
      <div className="container">
        <h1>Blog app</h1>
        <Notification />
        <Switch>
          <PrivateRoute path="/users/:id">
            <User />
          </PrivateRoute>
          <PrivateRoute path="/users">
            <Users />
          </PrivateRoute>
          <PrivateRoute path="/blogs/:id">
            <Blog />
          </PrivateRoute>
          <PrivateRoute path="/blogs">
            <Blogs />
          </PrivateRoute>
          <Route path="/login">
            {user ? <Redirect to="/" /> : <LoginForm />}
          </Route>
          <Route path="/logout">
            <Logout />
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default App;
