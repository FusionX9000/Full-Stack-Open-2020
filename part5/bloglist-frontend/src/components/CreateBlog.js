import React, { useState } from "react";
import blogService from "../services/blogs";

const CreateBlog = ({ addBlog, setNotification }) => {
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const handleAddBlog = async (event) => {
    event.preventDefault();
    const blog = {
      author,
      title,
      url,
    };
    try {
      const returnedBlog = await blogService.add(blog);
      addBlog(returnedBlog);
      setNotification({
        message: `a new blog ${blog.title} by ${blog.author} added`,
        type: "info",
      });
    } catch (exception) {
      setNotification({ message: "Error adding blog", type: "error" });
    }
  };

  return (
    <div>
      <form onSubmit={handleAddBlog}>
        <h2>create</h2>
        <div>
          title
          <input
            type="text"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            type="text"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url
          <input type="text" onChange={({ target }) => setUrl(target.value)} />
        </div>
        <button onClick={handleAddBlog}>create</button>
      </form>
    </div>
  );
};

export default CreateBlog;
