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
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "info" });

  const getAllPeople = () => {
    phonebookService
      .getAll()
      .then(initialPhoneBook => setPerson(initialPhoneBook));
  };
  useEffect(getAllPeople, []);

  const updatePersonNumber = (id, newNumber) => {
    const person = persons.find(pers => pers.id === id);
    const newInfo = { ...person, number: newNumber };

    phonebookService.update(id, newInfo).then(response => {
      getAllPeople();
    });
  };

  const resetFields = () => {
    setNewName("");
    setNewNumber("");
  };

  const addPerson = event => {
    event.preventDefault();

    const personObject = {
      name: newName,
      number: newNumber
    };

    const person = persons.find(p => p.name === newName);

    if (person) {
      if (
        window.confirm(
          `${person.name} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        updatePersonNumber(person.id, newNumber);
        resetFields();
      }
    } else {
      phonebookService.create(personObject).then(returnedPerson => {
        setPerson(persons.concat(returnedPerson));
        setShowMessage(true);
        setMessage({
          text: `${returnedPerson.name} was added to phonebook`,
          type: "info"
        });
        resetFields();
        setTimeout(() => {
          setShowMessage(false);
        }, 5000);
      });
    }
  };

  const deletePerson = id => {
    const person = persons.find(per => per.id === id);

    if (window.confirm(`Delete ${person.name}?`)) {
      phonebookService
        .deleteEntry(id)
        .then(response => {
          getAllPeople();
          // setPerson(persons.filter(p => p.id !== id));
        })
        .catch(error => {
          setShowMessage(true);
          setMessage({
            text: `${person?.name} was already deleted from server`,
            type: "error"
          });
          setTimeout(() => {
            setShowMessage(false);
          }, 5000);
        });
    }
  };

  const filterPeople = persons.filter(
    person =>
      person?.name?.toLowerCase().includes(filter.toLowerCase()) ||
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
      {showMessage && (
        <div className={`message ${message.type}`}>{message.text}</div>
      )}
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
          <Persons key={person.id} onClick={() => deletePerson(person.id)}>
            {person.name} {person.number}
          </Persons>
        ))}
      </ul>
    </div>
  );
};

export default App;
