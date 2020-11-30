import React from "react";
import Person from "./Person";

const Persons = ({ persons, deletePerson }) => {
  return (
    <div>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => (
          <Person
            key={person.id}
            person={person}
            deletePerson={() => deletePerson(person.id)}
          />
        ))}
      </ul>
    </div>
  );
};

export default Persons;
