export const showNotification = (message, type) => {
  return (dispatch) => {
    const id = setTimeout(() => dispatch(hideNotification()), 5000);
    dispatch({
      type: "SHOW_NOTIFICATION",
      data: {
        id,
        message,
        type,
      },
    });
  };
};

export const hideNotification = () => {
  return {
    type: "HIDE_NOTIFICATION",
  };
};

const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case "SHOW_NOTIFICATION":
      if (state) {
        clearTimeout(state.id);
      }
      return action.data;
    case "HIDE_NOTIFICATION":
      return null;
    default:
      return state;
  }
};

export default notificationReducer;
