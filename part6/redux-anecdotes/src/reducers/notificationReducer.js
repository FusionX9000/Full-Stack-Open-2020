export const showNotification = (message) => {
  return {
    type: "SHOW",
    message,
  };
};

export const hideNotification = () => {
  return {
    type: "HIDE",
  };
};

const notificationReducer = (state = "", action) => {
  switch (action.type) {
    case "SHOW":
      return action.message;
    case "HIDE":
      return null;
    default:
      return null;
  }
};

export default notificationReducer;
