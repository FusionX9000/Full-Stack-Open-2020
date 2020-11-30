import React, { useEffect } from "react";

const Notification = ({ notification, autoClose }) => {
  useEffect(() => {
    if (notification) {
      const handle = autoClose();
      return () => clearTimeout(handle);
    }
  });
  if (notification === null) {
    return null;
  }
  const notificationStyle = {
    color: notification.type === "info" ? "green" : "red",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };
  return <div style={notificationStyle}>{notification.message}</div>;
};

export default Notification;
