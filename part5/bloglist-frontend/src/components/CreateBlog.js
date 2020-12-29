import React, { useState } from "react";

const CreateBlog = ({ addBlog }) => {
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const handleAddBlog = (event) => {
    event.preventDefault();
    const blog = {
      author,
      title,
      url,
    };
    addBlog(blog);
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
        <button onClick={handleAddBlog}>create</button>
      </form>
    </div>
  );
};

export default CreateBlog;
