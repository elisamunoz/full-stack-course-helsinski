import { useState } from "react";
const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodClick = () => {
    setGood(good + 1);
  };

  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
  };

  const handleBadClick = () => {
    setBad(bad + 1);
  };

  const allFeedback = good + neutral + bad;
  const average = allFeedback === 0 ? 0 : (good - bad) / allFeedback;
  const positivePercentage = allFeedback === 0 ? 0 : (good / allFeedback) * 100;

  return (
    <div>
      <h1> Give feedback</h1>
      <Button onClick={handleGoodClick} text="good" />
      <Button onClick={handleNeutralClick} text="neutral" />
      <Button onClick={handleBadClick} text="bad" />

      <h2>Statistics</h2>
      <p>good: {good}</p>
      <p>neutral: {neutral}</p>
      <p>bad: {bad}</p>
      <p>all: {allFeedback}</p>
      <p>average: {average}</p>
      <p>positive: {positivePercentage} %</p>
    </div>
  );
};

export default App;
