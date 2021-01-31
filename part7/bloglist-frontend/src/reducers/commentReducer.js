import axios from "axios";

const createUrl = (blogId) => `/api/blogs/${blogId}/comments`;

export const addComment = (blogId, content) => {
  return async (dispatch) => {
    const { id } = (await axios.post(createUrl(blogId), { content })).data;
    dispatch({
      type: "ADD_COMMENT",
      data: {
        blogId,
        id,
        content,
      },
    });
  };
};

export const initializeComment = (blogId) => {
  return async (dispatch) => {
    const comments = (await axios.get(createUrl(blogId))).data;
    dispatch({
      type: "INIT_COMMENTS",
      data: comments,
    });
  };
};

export const resetComment = () => {
  return {
    type: "INIT_COMMENTS",
    data: [],
  };
};

const commentReducer = (state = [], action) => {
  switch (action.type) {
    case "INIT_COMMENTS": {
      const { data: comments } = action;
      return comments;
    }
    case "ADD_COMMENT": {
      const { data } = action;
      const { id, content } = data;
      return state.concat({ id, content });
    }
    default:
      return state;
  }
};

export default commentReducer;
