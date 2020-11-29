import React from "react";
import Country from "./Country";

const Countries = ({ countries }) => {
  //   console.log(countries);
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  } else if (countries.length >= 2) {
    return countries.map((country) => (
      <Country key={country.name} country={country} show={false} />
    ));
  } else if (countries.length === 1) {
    return <Country country={countries[0]} show={true} />;
  }
  return null;
};

export default Countries;
