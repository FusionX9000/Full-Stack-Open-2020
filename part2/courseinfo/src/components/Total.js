const Total = (props) => {
    return (
      <div>
        <p>Number of exercises {props.exercises.reduce((a,b)=>a+b)}</p>
      </div>
    );
}

export default Total;