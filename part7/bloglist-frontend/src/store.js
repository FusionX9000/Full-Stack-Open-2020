import { applyMiddleware, combineReducers, createStore } from "redux";
import blogReducer from "./reducers/blogReducer";
import loginReducer from "./reducers/loginReducer";
import notificationReducer from "./reducers/notificationReducer";
import thunk from "redux-thunk";
import userReducer from "./reducers/userReducer";
import commentReducer from "./reducers/commentReducer";

const reducer = combineReducers({
  blogs: blogReducer,
  login: loginReducer,
  notification: notificationReducer,
  users: userReducer,
  comments: commentReducer,
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
