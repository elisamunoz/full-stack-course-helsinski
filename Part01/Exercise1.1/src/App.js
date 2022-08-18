const Header = props => <h1>{props.course}</h1>;

const Content = props => {
  const Part = partProps => (
    <p>
      {partProps.part} {partProps.exercise}
    </p>
  );

  return (
    <>
      <Part part={props.parts[0].name} exercise={props.parts[0].exercises} />
      <Part part={props.parts[1].name} exercise={props.parts[1].exercises} />
      <Part part={props.parts[2].name} exercise={props.parts[2].exercises} />
    </>
  );
};

const Total = props => <p>Number of exercises {props.exercises}</p>;

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10
      },
      {
        name: "Using props to pass data",
        exercises: 7
      },
      {
        name: "State of a component",
        exercises: 14
      }
    ]
  };

  const totalExercises =
    course.parts[0].exercises +
    course.parts[1].exercises +
    course.parts[2].exercises;

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total exercises={totalExercises} />
    </div>
  );
};

export default App;
