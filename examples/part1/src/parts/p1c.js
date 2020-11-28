import React, {useState} from 'react';

const Display = ({counter}) => {
    return (
      <div>{counter}</div>
    )
}
  
const Button = ({handleClick, text}) => {
    return (
      <button onClick={handleClick}>
        {text}
      </button>
    )
}
  
const App = () => {
    const [counter, setCounter] = useState(0);
    const increaseByOne = () =>setCounter(counter+1);
    const setToZero = () =>setCounter(0);
    const decreaseByOne = () =>setCounter(counter-1);
    return (
      <div>
        <Display counter={counter}/>
        <Button text="plus" handleClick={increaseByOne}/>
        <Button text="zero" handleClick={setToZero}/>
        <Button text="minus" handleClick={decreaseByOne}/>
      </div>
    )
}

export default App;