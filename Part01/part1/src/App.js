import { useState } from "react";
import { tsPropertySignature } from "@babel/types";

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

// const History = ({ allClicks }) => {
//   if (allClicks.length === 0) {
//     return <div> the app is used by pressing the buttons</div>;
//   }
//   return <div>button press history: {allClicks.join("")}</div>;
// };

// const App = () => {
//   // const [clicks, setClicks] = useState({
//   //   left: 0,
//   //   right: 0
//   // });

//   // const handleLeftClick = () => {
//   //   setClicks({ ...clicks, left: clicks.left + 1 });
//   // };
//   // const handleRightClick = () => {
//   //   setClicks({ ...clicks, right: clicks.right + 1 });
//   // };

//   const [left, setLeft] = useState(0);
//   const [right, setRight] = useState(0);
//   const [allClicks, setAll] = useState([]);

//   const handleLeftClick = () => {
//     setAll(allClicks.concat("L"));
//     setLeft(left + 1);
//   };
//   const handleRightClick = () => {
//     setAll(allClicks.concat("R"));
//     setRight(right + 1);
//   };

//   return (
//     <div>
//       {left}
//       <Button onClick={handleLeftClick} text="left" />
//       <Button onClick={handleRightClick} text="right" />
//       {right}
//       <History allClicks={allClicks} />
//     </div>
//   );
// };

const Display = ({ value }) => <div>{value}</div>;

const App = () => {
  const [value, setValue] = useState(10);

  const setToValue = newValue => {
    console.log("value now", newValue);
    setValue(newValue);
  };

  return (
    <div>
      <Display value={value} />
      <Button onClick={() => setToValue(1000)} text="thousand" />
      <Button onClick={() => setToValue(0)} text="reset" />
      <Button onClick={() => setToValue(value + 1)} text="increment" />
    </div>
  );
};

export default App;
