import React, { useState } from 'react';
import axios from 'axios';

const WeatherApp = () => {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const fetchWeatherData = async () => {
    try {
      const response = await axios.post('/weather', { location });
      setWeatherData(response.data);
      setError('');
    } catch (error) {
      setError(error.response.data.error || 'Something went wrong');
    }
  };

  return (
    <div>
      <h1>Weather Forecast</h1>
      <input
        type="text"
        placeholder="Enter Location"
        value={location}
        onChange={handleLocationChange}
      />
      <button onClick={fetchWeatherData}>Get Forecast</button>
      {error && <p>{error}</p>}
      {weatherData && (
        <div>
          <h2>Location: {weatherData.city.name}</h2>
          <ul>
            {weatherData.list.map((item) => (
              <li key={item.dt}>{item.weather[0].description}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
