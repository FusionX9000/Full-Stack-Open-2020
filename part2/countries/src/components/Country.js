import React, { useState } from "react";
import Weather from "./Weather";

const CountryLarge = ({ country, handleClick }) => {
  //   console.log(country);
  return (
    <div>
      <h2>{country.name}</h2>
      <button onClick={handleClick}>hide</button>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h3>Languages</h3>
      <ul>
        {country.languages.map((language) => (
          <li key={language.name}>{language.name}</li>
        ))}
      </ul>
      <img src={country.flag} width="100px" alt="flag" />
      <Weather place={country.capital} />
    </div>
  );
};

const CountrySmall = ({ country, handleClick }) => {
  return (
    <div>
      {country.name}
      <button onClick={handleClick}>show</button>
    </div>
  );
};

const Country = ({ country, show }) => {
  const [_show, setShow] = useState(show);
  const handleClick = () => {
    setShow(!_show);
  };

  switch (_show) {
    case false:
      return (
        <div>
          <CountrySmall country={country} handleClick={handleClick} />
        </div>
      );
    case true:
      return (
        <div>
          <CountryLarge country={country} handleClick={handleClick} />
        </div>
      );

    default:
      return null;
  }
};

export default Country;
