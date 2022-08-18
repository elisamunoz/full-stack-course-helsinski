import logo from "./logo.svg";
import "./App.css";

const Hello = props => {
  return (
    <div>
      <p>Hello {props.name}</p>
    </div>
  );
};

function App() {
  const name = "Eli";

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Greetings</h1>
        <Hello name={name} />
        <Hello name="Laitor" />
      </header>
    </div>
  );
}

export default App;
