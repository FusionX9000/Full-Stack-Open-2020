import React from "react";
import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((store) => store.notification);
  if (notification === null) {
    return null;
  }
  const notificationStyle = {
    color: notification.type === "info" ? "green" : "red",
    fontSize: 20,
    background: "lightgrey",
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };
  return <div style={notificationStyle}>{notification.message}</div>;
};

export default Notification;
