import './App.css';
import React, { useState } from 'react';

const weatherCodes = {
  0: 'Clear sky',
  1: 'Mainly clear',
  2: 'Partly cloudy',
  3: 'Overcast',
  45: 'Fog',
  48: 'Depositing rime fog',
  51: 'Light intensity drizzle',
  53: 'Moderate intensity drizzle',
  55: 'Dense intensity drizzle',
  56: 'Light intensity freezing drizzle',
  57: 'Dense intensity freezing drizzle',
  61: 'Slight intensity rain',
  63: 'Moderate intensity rain',
  65: 'Heavy intensity rain',
  66: 'Light intensity freezing rain',
  67: 'Heavy intensity freezing rain',
  71: 'Slight intensity snowfall',
  73: 'Moderate intensity snowfall',
  75: 'Heavy intensity snowfall',
  77: 'Snow grains',
  80: 'Slight rain showers',
  81: 'Moderate rain showers',
  82: 'Violent rain showers',
  85: 'Slight snow showers',
  86: 'Heavy snow showers',
  95: 'Thunderstorm slight or moderate',
  96: 'Thunderstorm with slight hail',
  99: 'Thunderstorm with heavy hail'
};

function App() {
  const [city, setCity] = useState('');
  const [date_start, setDate_start] = useState('');
  const [date_end, setDate_end] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://127.0.0.1:3001/weather/${city}/${date_start}/${date_end}`);
    const data = await response.json();
    setWeatherData(data);
  }
  console.log(weatherData);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="City" onChange={(e) => setCity(e.target.value)} />
        <input type="date" onChange={(e) => setDate_start(e.target.value)} />
        <input type="date" onChange={(e) => setDate_end(e.target.value)} />
        <button type="submit">Get Weather</button>
      </form>
      {weatherData && (
        <div>
          <h2>Weather for {city} from {date_start} to {date_end}</h2>
          {weatherData.daily.weathercode.map((code, index) => (
            <div key={index}>
              <h3>Date: {weatherData.time[index]}</h3>
              <p>Max temperature: {weatherData.daily.temperature_2m_max[index]}</p>
              <p>Min temperature: {weatherData.daily.temperature_2m_min[index]}</p>
              <p>Weather: {weatherCodes[code]}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;