import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { voteOn } from "../reducers/anecdoteReducer";
import { showNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes }) => anecdotes);
  const filter = useSelector(({ filter }) => filter);
  const dispatch = useDispatch();
  const vote = (id) => {
    console.log("vote", id);
    dispatch(voteOn(id));
    const anecdote = anecdotes.find((anecdote) => anecdote.id === id).content;
    const message = `you voted on ${anecdote}`;
    dispatch(showNotification(message));
  };
  return (
    <div>
      {anecdotes
        .sort((a, b) => b.votes - a.votes)
        .filter((anecdote) =>
          anecdote.content.toLowerCase().includes(filter.toLowerCase())
        )
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default AnecdoteList;
