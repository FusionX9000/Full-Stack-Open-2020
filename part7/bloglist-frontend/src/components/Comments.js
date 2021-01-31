import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addComment,
  initializeComment,
  resetComment,
} from "../reducers/commentReducer";

const Comments = ({ blogId }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetComment());
    dispatch(initializeComment(blogId));
  }, []);
  const comments = useSelector((store) => store.comments);
  const [content, setContent] = useState("");
  return (
    <div>
      <h4>comments</h4>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await dispatch(addComment(blogId, content));
          setContent("");
        }}
      >
        <input
          type="text"
          name="comment"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button>add comment</button>
      </form>
      {comments.map(({ id, content }) => (
        <li key={id}>{content}</li>
      ))}
    </div>
  );
};

export default Comments;
