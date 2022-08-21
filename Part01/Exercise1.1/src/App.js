const Course = ({ children }) => <div>{children}</div>;

const Header = ({ course }) => <h1>{course}</h1>;

const Total = ({ sum }) => <p>Number of exercises {sum}</p>;

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ parts }) => (
  <>
    <Part part={parts[0]} />
    <Part part={parts[1]} />
    <Part part={parts[2]} />
    <Part part={parts[3]} />
  </>
);

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
    },
    {
      name: "Redux",
      exercises: 11
    }
  ];

  parts.reduce((acc, val) => {}, 0);
  return (
    <Course>
      <Header course={course} />
      <Content parts={parts} />
      <Total sum={parts.reduce((acc, val) => (acc += val.exercises), 0)} />
    </Course>
  );
};

export default App;
