import { useState, useEffect } from "react";
import phonebookService from "./services/phonebook";

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

const Persons = ({ myKey, children, onClick }) => (
  <li key={myKey}>
    {children} <button onClick={onClick}>delete</button>
  </li>
);

const App = () => {
  const [persons, setPerson] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  const getAllPeople = () => {
    phonebookService
      .getAll()
      .then(initialPhoneBook => setPerson(initialPhoneBook));
  };
  useEffect(getAllPeople, []);

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
      phonebookService.create(personObject).then(returnedPhonebook => {
        setPerson(persons.concat(returnedPhonebook));
        setNewName("");
        setNewNumber("");
      });
    }
  };

  const deletePerson = id => {
    const person = persons.find(per => per.id === id);

    phonebookService
      .deleteEntry(id)
      .then(response => {
        getAllPeople();
        // setPerson(persons.filter(p => p.id !== id));
      })
      .catch(error => {
        alert(`the note '${person?.name}' was already deleted from server`);
      });
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
          <Persons key={person.name} onClick={() => deletePerson(person.id)}>
            {person.name} {person.number}
          </Persons>
        ))}
      </ul>
    </div>
  );
};

export default App;
