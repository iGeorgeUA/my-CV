import React, { useState } from 'react';

function App() {
  const [city, setCity] = useState('');
  const [date, setDate] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`/weather/${city}/${date}`);
    const data = await response.json();
    setWeatherData(data);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="City" onChange={(e) => setCity(e.target.value)} />
        <input type="date" onChange={(e) => setDate(e.target.value)} />
        <button type="submit">Get Weather</button>
      </form>
      {weatherData && (
        <div>
          <h2>Weather for {city} on {date}</h2>
          <p>Temperature: {weatherData.hourly.temperature_2m}</p>
          <p>Weather: {weatherData.hourly.weathercode}</p>
        </div>
      )}
    </div>
  );
}

export default App;