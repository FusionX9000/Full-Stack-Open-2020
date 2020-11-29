import React, { useState, useEffect } from "react";
import axios from "axios";
import Countries from "./components/Countries";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [countryFilter, setCountryFilter] = useState("");

  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then((response) => setCountries(response.data));
  }, []);

  const countriesToShow = countries.filter((country) =>
    country.name.toLowerCase().includes(countryFilter.toLowerCase())
  );

  return (
    <div>
      <div>
        find countries
        <input
          value={countryFilter}
          onChange={(e) => setCountryFilter(e.target.value)}
        />
        <Countries countries={countriesToShow} />
      </div>
    </div>
  );
};

export default App;
