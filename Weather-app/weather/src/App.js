import './App.css';
import React, { useState } from 'react';

function App() {
  const [city, setCity] = useState('');
  const [date, setDate] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://127.0.0.1:3000/weather/${city}/${date}`);
    const data = await response.json();
    setWeatherData(data);
    console.log(data);
    console.log(weatherData);
  }

  let a = (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="City" onChange={(e) => setCity(e.target.value)} />
        <input type="date" onChange={(e) => setDate(e.target.value)} />
        <button type="submit">Get Weather</button>
      </form>
      {weatherData && (
        <div>
          <h2>Weather for {city} on {date}</h2>
          <p>Temperature: {weatherData.hourly.temperature_2m[0]}</p>
          <p>Weather: {weatherData.hourly.weathercode}</p>
        </div>
      )}
    </div>
  );
  return a;
}

export default App;