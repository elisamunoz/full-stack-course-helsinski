import { useState } from "react";

const App = () => {
  const [persons, setPerson] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 }
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterName, setFilterName] = useState("");

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

  const filterPeople = persons.filter(person =>
    person.name.toLowerCase().includes(filterName.toLowerCase())
  );

  const handleFilterName = event => {
    setFilterName(event.target.value);
  };

  const HandleNewPerson = event => {
    setNewName(event.target.value);
  };

  const HandleNewNumber = event => {
    setNewNumber(event.target.value);
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <form>
        <div>
          filter shown with
          <input value={filterName} onChange={handleFilterName} />
        </div>
      </form>
      <h2>Add a New</h2>
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
        {filterPeople.map(person => (
          <li key={person.name}>
            {person.name} {person.number}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
