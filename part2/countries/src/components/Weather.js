import React, { useState, useEffect } from "react";
import axios from "axios";

const Weather = ({ place }) => {
  const [weather, setWeather] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const weatherApiUrl = `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${place}`;

  useEffect(() => {
    axios
      .get(weatherApiUrl)
      .then((response) => response.data)
      .then((data) => {
        setWeather({
          temperature: data.current.temperature,
          icon: data.current.weather_icons[0],
          windSpeed: data.current.wind_speed,
          windDirection: data.current.wind_dir,
        });
        setIsLoading(false);
      });
  }, [weatherApiUrl]);

  if (isLoading) {
    return (
      <div>
        <p>
          <b>Loading weather data...</b>
        </p>
      </div>
    );
  } else {
    return (
      <div>
        <h3>Weather in {place}</h3>
        <p>
          <b>temperature:</b> {weather.temperature} Celsius
        </p>
        <img src={weather.icon} alt="weather icon" />
        <p>
          <b>wind:</b> {weather.windSpeed} km/h direction{" "}
          {weather.windDirection}
        </p>
      </div>
    );
  }
};

export default Weather;
