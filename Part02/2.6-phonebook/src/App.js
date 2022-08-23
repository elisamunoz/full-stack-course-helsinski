import { useState, useEffect } from "react";
import axios from "axios";
const Filter = ({ value, onChange }) => (
  <form>
    <div>
      filter shown with
      <input value={value} onChange={onChange} />
    </div>
  </form>
);

const PersonForm = ({
  onSubmit,
  name,
  number,
  nameValue,
  numberValue,
  onChangeName,
  onChangeNumber
}) => (
  <form onSubmit={onSubmit}>
    <InputForm text={name} value={nameValue} onChange={onChangeName} />
    <InputForm text={number} value={numberValue} onChange={onChangeNumber} />
    <div>
      <button type="submit">add</button>
    </div>
  </form>
);

const InputForm = ({ value, onChange, text }) => (
  <div>
    {text}: <input value={value} onChange={onChange} />
  </div>
);

const Persons = ({ myKey, children }) => <li key={myKey}>{children}</li>;

const App = () => {
  const [persons, setPerson] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  const hook = () => {
    axios.get("http://localhost:3001/persons").then(response => {
      setPerson(response.data);
    });
  };
  useEffect(hook, []);

  const addPerson = event => {
    event.preventDefault();

    const personObject = {
      name: newName,
      number: newNumber
    };

    const personName = persons.find(person => person.name === newName);

    if (personName) {
      alert(`${newName} is already added to phonebook`);
    } else {
      setPerson(persons.concat(personObject));
      setNewName("");
      setNewNumber("");
    }
  };

  const filterPeople = persons.filter(
    person =>
      person.name.toLowerCase().includes(filter.toLowerCase()) ||
      person.number.includes(filter)
  );

  const handleFilter = event => {
    setFilter(event.target.value);
  };

  const handleNewPerson = event => {
    setNewName(event.target.value);
  };

  const handleNewNumber = event => {
    setNewNumber(event.target.value);
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter value={filter} onChange={handleFilter} />

      <h2>Add a New</h2>

      <PersonForm
        onSubmit={addPerson}
        name="name"
        number="number"
        nameValue={newName}
        numberValue={newNumber}
        onChangeName={handleNewPerson}
        onChangeNumber={handleNewNumber}
      />

      <h2>Numbers</h2>
      {!filterPeople.length && <p>There is not information</p>}
      <ul>
        {filterPeople.map(person => (
          <Persons key={person.name}>
            {person.name} {person.number}
          </Persons>
        ))}
      </ul>
    </div>
  );
};

export default App;
