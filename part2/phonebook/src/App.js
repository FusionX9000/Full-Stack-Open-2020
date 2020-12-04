import React, { useState, useEffect } from "react";
import Persons from "./components/Persons";
import AddPersonForm from "./components/AddPersonForm";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [nameFilter, setNameFilter] = useState("");
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    personService.getAll().then((initialPersons) => setPersons(initialPersons));
  }, []);

  const autoClose = () =>
    setTimeout(() => {
      return setNotification(null);
    }, 3000);

  const clearInput = () => {
    setNewName("");
    setNewNumber("");
  };

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
            setNotification({
              message: `${newName}'s number changed to ${newNumber}`,
              type: "info",
            });
          })
          .catch((error) => {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            setNotification({
              message: `${newName} already deleted from server`,
              type: "error",
            });
            setPersons(
              persons.filter((person) => person.id !== existingPerson.id)
            );
          });
      }
    } else {
      const person = { name: newName, number: newNumber };
      personService
        .createPerson(person)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setNotification({
            message: `Added ${newName} to phonebook`,
            type: "info",
          });
        })
        .catch((error) => {
          const errorResponse = error.response.data.error;
          console.log(errorResponse);
          setNotification({ message: errorResponse, type: "error" });
        });
    }
    clearInput();
  };

  const deletePerson = (id) => {
    const personName = persons.find((person) => person.id === id).name;
    if (window.confirm(`Are you sure want to delete ${personName}`))
      personService
        .deletePerson(id)
        .then((response) => {
          setPersons(persons.filter((person) => person.id !== id));
          setNotification({
            message: `Deleted ${personName} from phonebook`,
            type: "info",
          });
        })
        .catch((error) => {
          setNotification({
            message: `${personName} already deleted from server`,
            type: "error",
          });
          setPersons(persons.filter((person) => person.id !== id));
        });
  };

  const personsToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(nameFilter)
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} autoClose={autoClose} />
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
      <Persons persons={personsToShow} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
