import React, { useEffect } from "react";

const Notification = ({ notification, autoCloseNotification }) => {
  useEffect(() => {
    if (notification) {
      const handle = autoCloseNotification();
      return () => clearTimeout(handle);
    }
  });
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
