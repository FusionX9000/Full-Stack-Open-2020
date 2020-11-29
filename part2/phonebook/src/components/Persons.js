import React from "react";
import Person from "./Person";
import personService from "../services/personService";

const Persons = ({ persons, setPersons }) => {
  const deletePerson = (id) => {
    const personName = persons.find((person) => person.id === id).name;
    if (window.confirm(`Are you sure want to delete ${personName}`))
      personService
        .deletePerson(id)
        .then((response) =>
          setPersons(persons.filter((person) => person.id !== id))
        );
  };
  return (
    <div>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => (
          <Person
            key={person.id}
            person={person}
            handleDelete={() => deletePerson(person.id)}
          />
        ))}
      </ul>
    </div>
  );
};

export default Persons;
