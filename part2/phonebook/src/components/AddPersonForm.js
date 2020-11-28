import React from "react";

const AddPersonForm = ({
  newName,
  newNumber,
  handleNewNameChange,
  handleNewNumberChange,
  addPerson,
}) => {
  return (
    <div>
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name:
          <input value={newName} onChange={handleNewNameChange} />
        </div>
        <div>
          number:
          <input value={newNumber} onChange={handleNewNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

export default AddPersonForm;
