import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideNotification } from "../reducers/notificationReducer";

const Notification = () => {
  const notification = useSelector(({ notification }) => notification);
  const dispatch = useDispatch();

  useEffect(() => {
    if (notification !== null) {
      const timeoutId = setTimeout(
        () => dispatch(hideNotification(notification)),
        2000
      );
      return () => clearTimeout(timeoutId);
    }
  });

  if (notification === null) {
    return <div></div>;
  }
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };
  return <div style={style}>{notification}</div>;
};

export default Notification;
