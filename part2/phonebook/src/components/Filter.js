import React from "react";

const Filter = ({ nameFilter, handleNameFilterChange }) => {
  return (
    <div>
      filter shown with:
      <input value={nameFilter} onChange={handleNameFilterChange} />
    </div>
  );
};

export default Filter;
