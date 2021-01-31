import blogService from "../services/blogs";

export const addBlog = (blog) => {
  return async (dispatch) => {
    const addedBlog = await blogService.add(blog);
    return dispatch({
      type: "ADD_BLOG",
      data: addedBlog,
    });
  };
};

export const initializeBlogs = () => {
  return async (dispatch) => {
    return dispatch({
      type: "INIT_BLOGS",
      data: await blogService.getAll(),
    });
  };
};

export const updateBlog = (id, blog) => {
  return async (dispatch) => {
    return dispatch({
      type: "UPDATE_BLOG",
      data: await blogService.update(blog),
    });
  };
};

export const likeBlog = (id) => {
  return async (dispatch, getState) => {
    const blogs = getState();
    const blog = blogs.find((b) => b.id === id);
    const likedBlog = {
      ...blog,
      likes: blog.likes + 1,
    };
    await blogService.update(likedBlog);
    dispatch({
      type: "LIKE_BLOG",
      data: id,
    });
  };
};

export const removeBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id);
    dispatch({
      type: "REMOVE_BLOG",
      data: id,
    });
  };
};

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case "INIT_BLOGS":
      return action.data;
    case "ADD_BLOG":
      return state.concat(action.data);
    case "REMOVE_BLOG": {
      const id = action.data;
      return state.filter((blog) => blog.id !== id);
    }
    case "UPDATE_BLOG": {
      const blog = action.data;
      return state.map((b) => (b.id !== blog.id ? b : { ...blog }));
    }
    case "LIKE_BLOG": {
      const id = action.data;
      return state.map((blog) =>
        blog.id !== id ? blog : { ...blog, likes: blog.likes + 1 }
      );
    }
    case "ADD_COMMENT": {
      const { blogId, id: commentId } = action.data;
      return state.map((blog) =>
        blog.id !== blogId
          ? blog
          : { ...blog, comments: blog.comments.concat(commentId) }
      );
    }
    default:
      return state;
  }
};
export default blogReducer;
