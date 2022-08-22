import { useState } from "react";

const App = () => {
  const [persons, setPerson] = useState([
    { name: "Arto Hellas", number: 123456789 }
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

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

  const HandleNewPerson = event => {
    setNewName(event.target.value);
  };

  const HandleNewNumber = event => {
    setNewNumber(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={HandleNewPerson} />
        </div>
        <div>
          number: <input value={newNumber} onChange={HandleNewNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person => (
          <li key={person.name}>
            {person.name} {person.number}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
