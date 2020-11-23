import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const getRandomInt = (max) => Math.floor(Math.random()*max);

const Button = ({text, handleClick}) => {
  return (
    <button onClick={handleClick}>{text}</button>
  );
}

const App = ({anecdotes}) => {
  const [selected, setSelected] = useState(getRandomInt(anecdotes.length));
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));
  const [mostVoted, setMostVoted] = useState(0);
  
  const handleNextClick = () => setSelected(getRandomInt(anecdotes.length));
  const handleVoteClick = () => {
    const copy = [...votes];
    copy[selected]++;
    setVotes(copy);
    if(copy[selected]>copy[mostVoted]) {
      setMostVoted(selected);
    }
  }
  return (
    <div>
      <h2>Anecdote of the day</h2>
      <p>{anecdotes[selected]}</p>
      <Button text="vote" handleClick={handleVoteClick}/>
      <Button text="next anecdote" handleClick={handleNextClick}/>
      <h2>Anecdote with most votes</h2>
      <p>{anecdotes[mostVoted]} has {votes[mostVoted]} votes</p>
    </div>
  );
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)