const Header = ({course}) => {
    return (
      <div>
        <h2>{course}</h2>
      </div>
    );
  }

const Content = ({parts}) => {
  return (
    <div>
        {parts.map(part=> <Part key = {part.id} part={part}/>)}
    </div>
  );
}

const Part = ({part}) => {
    return (
      <div>
        <p>{part.name} {part.exercises}</p>
      </div>
    );
  }

const Total = (props) => {
    return (
      <div>
        <p>Number of exercises {props.exercises.reduce((a,b)=>a+b)}</p>
      </div>
    );
}

const Course = ({course}) => {
    return (
        <div>
            <Header course={course.name}/>
            <Content parts={course.parts}/>
            <Total exercises={course.parts.map(part=>part.exercises)}/>
        </div>
    );
}

export default Course;