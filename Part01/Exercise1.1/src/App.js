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
  const course = "Half Stack application development";
  const parts = [
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
  ];

  const totalExercises =
    parts[0].exercises + parts[1].exercises + parts[2].exercises;

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total exercises={totalExercises} />
    </div>
  );
};

export default App;
