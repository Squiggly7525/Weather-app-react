import React, { useState } from "react";
import axios from "axios";
import "./Weather.css";
import FormattedDate from "./FormattedDate";

export default function Weather(props) {
  let [city, setCity] = useState("");
  let [message, setMessage] = useState("");
  let [temperature, setTemperature] = useState("");
  let [weatherDetails, setWeatherDetails] = useState(null);
  function showTemperature(response) {
    setTemperature(Math.round(response.data.main.temp));
    setWeatherDetails({
      feelsLike: Math.round(response.data.main.feels_like),
      humidity: Math.round(response.data.main.humidity),
      date: new Date(response.data.dt * 1000),
    });
    console.log(response.data.dt * 1000);
    setMessage(
      `City: ${city} Temperature: ${temperature} 
`
    );
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (city !== "") {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=0efb4fc16a9ed98dc0b3aafd8491d6ad&units=metric`;
      axios.get(url).then(showTemperature);
    }
  }

  function updateCity(event) {
    let newCity = event.target.value;
    setCity(newCity);
    setMessage("");
    if (newCity === "") {
      setTemperature("");
      setWeatherDetails(null);
    }
  }

  return (
    <div className="Weather">
      <div>
        <div>
          <form className="search-bar" onSubmit={handleSubmit}>
            <input
              className="search"
              type="search"
              placeholder="Type a city"
              onChange={updateCity}
              autoFocus="on"
            />
            <input type="submit" value="Submit" className="button" />
          </form>
        </div>
        {weatherDetails && (
          <div className="Data">
            <ul>
              <li>
                {" "}
                <h1>{city}</h1>{" "}
              </li>
              <span className="temperature">{temperature}°C</span>
              <li>
                <FormattedDate date={weatherDetails.date} />
              </li>
              <li>Feels like: {weatherDetails.feelsLike}°C</li>
              <li>Humidity: {weatherDetails.humidity}%</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
