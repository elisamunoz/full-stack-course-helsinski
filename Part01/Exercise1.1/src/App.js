import Course from "./components/Course";
import { COURSES } from "./data";

const Header = ({ course }) => <h1>{course}</h1>;

const Total = ({ sum }) => <p>Number of exercises {sum}</p>;

const Content = ({ parts = [] }) => (
  <>
    {parts.map(part => (
      <p key={part.id}>
        {part.name} {part.exercises}
      </p>
    ))}
  </>
);

const App = () => {
  const courses = COURSES;

  return (
    <Course>
      <Header course="Web development curriculum" />

      {courses.map(course => (
        <div key={course.id}>
          <Header course={course.name} />
          <Content parts={course.parts} />
          <Total
            sum={course.parts.reduce((acc, val) => (acc += val.exercises), 0)}
          />
        </div>
      ))}
    </Course>
  );
};

export default App;
