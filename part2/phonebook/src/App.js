import React, { useState, useEffect } from "react";
import Persons from "./components/Persons";
import AddPersonForm from "./components/AddPersonForm";
import Filter from "./components/Filter";
import personService from "./services/personService";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [nameFilter, setNameFilter] = useState("");

  useEffect(() => {
    personService.getAll().then((initialPersons) => setPersons(initialPersons));
  }, []);

  const personsToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(nameFilter)
  );

  const handleNameFilterChange = (event) => setNameFilter(event.target.value);
  const handleNewNameChange = (event) => setNewName(event.target.value);
  const handleNewNumberChange = (event) => setNewNumber(event.target.value);

  const addPerson = (event) => {
    event.preventDefault();
    const existingPerson = persons.find((person) => person.name === newName);
    if (existingPerson) {
      const message = `${newName} is already added to phonebook, replace the old number with a new one`;
      if (window.confirm(message)) {
        personService
          .updatePerson(existingPerson.id, {
            ...existingPerson,
            number: newNumber,
          })
          .then((changedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id === existingPerson.id ? changedPerson : person
              )
            );
          });
      }
    } else {
      const person = { name: newName, number: newNumber };
      personService
        .createPerson(person)
        .then((returnedPerson) => setPersons(persons.concat(returnedPerson)));
    }
    setNewName("");
    setNewNumber("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        nameFilter={nameFilter}
        handleNameFilterChange={handleNameFilterChange}
      />
      <AddPersonForm
        newName={newName}
        newNumber={newNumber}
        handleNewNameChange={handleNewNameChange}
        handleNewNumberChange={handleNewNumberChange}
        addPerson={addPerson}
      />
      <Persons persons={personsToShow} setPersons={setPersons} />
    </div>
  );
};

export default App;
