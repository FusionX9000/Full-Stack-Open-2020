import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = ({text, handleClick}) => {
  return (
    <div>
      <button onClick={handleClick}>{text}</button>
    </div>
  )
}

const Statistic = ({text, count}) => {
  return (
    <tr>
      <td>
        {text}
      </td>
      <td>
        {count}
      </td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad}) => {
  const allCount = () => good+neutral+bad;
  const average = () => (good-bad)/3;
  const positivePercentage = () => (good+neutral+bad)==0 ? "0%" : `${good/(good+neutral+bad)*100}%`;

  if(allCount()==0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }

  return (
    <table>
      <tbody>
        <Statistic text="good" count={good} />
        <Statistic text="neutral" count={neutral} />
        <Statistic text="bad" count={bad} />
        <Statistic text="all" count={allCount()} />
        <Statistic text="average" count={average()} />
        <Statistic text="positive" count={positivePercentage()} />
      </tbody>
    </table>
  )
}


const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodClick = () => setGood(good+1);
  const handleNeutralClick = () => setNeutral(neutral+1);
  const handleBadClick = () => setBad(bad+1);



  return (
    <div>
      <h2>Feedback</h2>
      <Button text="good" handleClick={handleGoodClick} />
      <Button text="neutral" handleClick={handleNeutralClick} />
      <Button text="bad" handleClick={handleBadClick} />
      <h2>Statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);