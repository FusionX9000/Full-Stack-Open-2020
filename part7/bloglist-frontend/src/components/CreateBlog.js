import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addBlog } from "../reducers/blogReducer";
import { showNotification } from "../reducers/notificationReducer";

const CreateBlog = () => {
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const dispatch = useDispatch();
  const handleAddBlog = async (event) => {
    event.preventDefault();
    const blog = {
      author,
      title,
      url,
    };
    try {
      await dispatch(addBlog(blog));
      dispatch(
        showNotification(`a new blog ${title} by ${author} added`, "info")
      );
    } catch (exception) {
      dispatch(showNotification("Error adding blog", "error"));
    }
    showNotification();
    setAuthor("");
    setUrl("");
    setTitle("");
  };

  return (
    <div>
      <form onSubmit={handleAddBlog}>
        <h2>create blog</h2>
        <div>
          title
          <input
            type="text"
            id="title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            type="text"
            id="author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url
          <input
            type="text"
            id="url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button onClick={handleAddBlog} id="create-button">
          create
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
