import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import { initializeAnecdotes } from "./reducers/anecdoteReducer";
import anecdoteService from "./service/anecdotes";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    anecdoteService.getAll().then((anecdotes) => {
      console.log(anecdotes);
      dispatch(initializeAnecdotes(anecdotes));
    });
  }, [dispatch]);
  return (
    <div>
      <Notification />
      <h2>Anecdotes</h2>
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
