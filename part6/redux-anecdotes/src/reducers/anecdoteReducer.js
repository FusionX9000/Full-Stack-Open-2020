export const initializeAnecdotes = (anecdotes) => {
  return {
    type: "INIT_ANECDOTES",
    data: anecdotes,
  };
};

// const getId = () => (100000 * Math.random()).toFixed(0);

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0,
//   };
// };

export const createAnecdote = (data) => {
  return {
    type: "NEW_ANECDOTE",
    data,
  };
};

const anecdoteReducer = (state = [], action) => {
  console.log("state now: ", state);
  console.log("action", action);
  switch (action.type) {
    case "VOTE": {
      const id = action.data.id;
      const anecdoteVoted = state.find((anec) => anec.id === id);
      const changedAnecdote = {
        ...anecdoteVoted,
        votes: anecdoteVoted.votes + 1,
      };
      return state.map((anecdote) =>
        anecdote.id !== id ? anecdote : changedAnecdote
      );
    }
    case "NEW_ANECDOTE":
      return state.concat(action.data);
    case "INIT_ANECDOTES":
      return action.data;
    default:
      return state;
  }
};

export const voteOn = (id) => {
  return {
    type: "VOTE",
    data: {
      id,
    },
  };
};

export default anecdoteReducer;
