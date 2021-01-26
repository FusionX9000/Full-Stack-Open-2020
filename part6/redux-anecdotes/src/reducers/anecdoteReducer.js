import anecdoteService from "../service/anecdotes";

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({ type: "INIT_ANECDOTES", data: anecdotes });
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createAnecdote(content);
    dispatch({ type: "NEW_ANECDOTE", data: newAnecdote });
  };
};

const anecdoteReducer = (state = [], action) => {
  console.log("state now: ", state);
  console.log("action", action);
  switch (action.type) {
    case "VOTE": {
      const id = action.data.id;
      const votedAnecdote = state.find((anec) => anec.id === id);
      const changedAnecdote = {
        ...votedAnecdote,
        votes: votedAnecdote.votes + 1,
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
  return async (dispatch, getState) => {
    const anecdotes = getState().anecdotes;
    console.log(anecdotes);
    const votedAnecdote = anecdotes.find((anecdote) => anecdote.id === id);
    const changedAnecdote = {
      ...votedAnecdote,
      votes: votedAnecdote.votes + 1,
    };
    await anecdoteService.updateAnecdote(id, changedAnecdote);
    dispatch({
      type: "VOTE",
      data: {
        id,
      },
    });
  };
};

export default anecdoteReducer;
