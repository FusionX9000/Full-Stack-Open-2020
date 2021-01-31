import loginService from "../services/login";
import blogService from "../services/blogs";

export const login = (username, password) => {
  return async (dispatch) => {
    const user = await loginService.login(username, password);
    window.localStorage.setItem("blogAppLoggedUser", JSON.stringify(user));
    blogService.setToken(user.token);
    return dispatch({ type: "SET_USER", data: user });
  };
};

export const logout = () => {
  window.localStorage.removeItem("blogAppLoggedUser");
  blogService.setToken(null);
  return {
    type: "REMOVE_USER",
  };
};

export const setUser = (user) => {
  return {
    type: "SET_USER",
    data: user,
  };
};

const loginReducer = (state = null, action) => {
  switch (action.type) {
    case "SET_USER":
      return action.data;
    case "REMOVE_USER":
      return null;
    default:
      return state;
  }
};

export default loginReducer;
