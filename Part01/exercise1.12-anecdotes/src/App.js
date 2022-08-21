import { useState } from "react";

const Button = ({ text, onClick }) => <button onClick={onClick}>{text}</button>;

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients."
  ];
  const randomNumber = () => Math.floor(Math.random() * anecdotes.length);
  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState([]);

  const handleRandomNumber = () => setSelected(randomNumber());
  const getVotes = () => {
    const newPoints = points;

    if (!points[selected]) {
      newPoints[selected] = 1;
    } else {
      newPoints[selected]++;
    }

    setPoints(newPoints);
  };

  return (
    <>
      <h1>Anecdote of the day</h1>
      <div>{anecdotes[selected]}</div>
      <Button text="next anectote" onClick={handleRandomNumber} />
      <Button text="vote" onClick={getVotes} />
      <h2>Anecdote with most votes</h2>
    </>
  );
};

export default App;
