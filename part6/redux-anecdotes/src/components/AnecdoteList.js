import React from "react";
import { connect } from "react-redux";
import { voteOn } from "../reducers/anecdoteReducer";
import { showNotification } from "../reducers/notificationReducer";

const AnecdoteList = (props) => {
  const vote = async (id) => {
    await props.voteOn(id);
    const anecdote = props.anecdotes.find((anecdote) => anecdote.id === id)
      .content;
    const message = `you voted on ${anecdote}`;
    props.showNotification(message, 2);
  };
  return (
    <div>
      {props.anecdotes
        .sort((a, b) => b.votes - a.votes)
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

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
    ),
  };
};

const mapDispatchToProps = {
  showNotification,
  voteOn,
};

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList);
