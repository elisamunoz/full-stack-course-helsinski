import { useState } from "react";

const App = () => {
  const [persons, setPerson] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const addPerson = event => {
    event.preventDefault();

    const personObject = {
      name: newName
    };

    const personName = persons.find(person => person.name === newName);

    if (personName) {
      alert(`${newName} is already added to phonebook`);
    } else {
      setPerson(persons.concat(personObject));
      setNewName("");
    }
  };

  const HandleNewPerson = event => {
    setNewName(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={HandleNewPerson} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person => (
          <li key={person.name}>{person.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
