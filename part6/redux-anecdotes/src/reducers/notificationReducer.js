export const showNotification = (message, seconds) => {
  return async (dispatch) => {
    const id = setTimeout(() => dispatch(hideNotification()), seconds * 1000);
    dispatch({ type: "SHOW", data: { id, message } });
  };
};

export const hideNotification = () => {
  return {
    type: "HIDE",
  };
};

// const initialState = { id: null, message: null };

const notificationReducer = (state = null, action) => {
  console.log("state", state, action);
  switch (action.type) {
    case "SHOW":
      if (state) {
        clearTimeout(state.id);
      }
      return action.data;
    case "HIDE":
      return null;
    default:
      return state;
  }
};

export default notificationReducer;
