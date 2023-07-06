import './App.css';
import React, { useState } from 'react';

const WEEK_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

function App() {
  const [city, setCity] = useState('');
  const [currentWeatherData, setCurrentWeatherData] = useState(null);
  const [weatherData, setWeatherData] = useState(null);

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleGetCurrentWeather = async () => {
    try {
      // const token = 'SecretKey';
      const response = await fetch(`http://127.0.0.1:3001/current-weather/${city}`);
      const data = await response.json();
      setCurrentWeatherData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleGetWeather = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:3001/weather/${city}`);
      const data = await response.json();
      const groupedData = data.list.reduce((acc, curr) => {
        const date = new Date(curr.dt_txt).getDate();
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(curr);
        return acc;
      }, {});
      const averagedData = Object.values(groupedData).map((group) => {
        const sum = group.reduce((acc, curr) => acc + curr.main.temp, 0);
        const avg = sum / group.length;
        return { ...group[0], main: { ...group[0].main, temp: avg } };
      });
      setWeatherData({ ...data, list: averagedData });
    } catch (error) {
      console.error(error);
    }
  };

  const dayInAWeek = new Date().getDay();
  const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(WEEK_DAYS.slice(0, dayInAWeek));
  
  return (
    <div>
      <div className='container'>
        <input type="text" className='search' placeholder='City' onChange={handleCityChange} />
        <button className='btn' onClick={handleGetWeather}>Get Forecast Weather</button>
        <button className='btn' onClick={handleGetCurrentWeather}>Get Current Weather</button>
      </div>
      {currentWeatherData && (
        <div className='weather'>
          <div className='info'>
            <div>
              <div>
                <p className='city'>{currentWeatherData.name}</p>
                <p className='weather-description'>{currentWeatherData.weather[0].main}</p>
              </div>
              <p className='temperature'>{Math.round(currentWeatherData.main.temp)} °C</p>
            </div>
            <div>
              <img alt='weather icon' className='icon' src={`icons/${currentWeatherData.weather[0].icon}.png`} />
              <img alt='cloth icon' className='icon' src={`icons/${currentWeatherData.weather[0].icon}_cloth.png`} />
            </div>  
          </div>
        </div>
      )}
      {weatherData && weatherData.list && (
        <div className='weather-forecast'>
          {weatherData.list.map((day, index) => (
            <div key={index} className='info'>
              <p className='day'>{forecastDays[index]}</p>
              <div>
                <div>
                  <p className='city'>{weatherData.city.name}</p>
                  <p className='weather-description'>{day.weather[0].main}</p>
                </div>
                <p className='temperature'>{Math.round(day.main.temp)} °C</p>
              </div>
              <div>
                <img alt='weather icon' className='icon' src={`icons/${day.weather[0].icon}.png`} />
                <img alt='cloth icon' className='icon' src={`icons/${day.weather[0].icon}_cloth.png`} />
              </div>  
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;