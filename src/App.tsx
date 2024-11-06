import { useState } from 'react';
import axios from 'axios';
import { CitySearch } from './components/CitySearch';
import { WeatherCard } from './components/WeatherCard';

function App() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async (city: string) => {
    setLoading(true);
    setError(null);

    try {
      // For demo purposes using fixed coordinates (London)
      // In a real app, you'd first geocode the city name
      const lat = 51.5074;
      const lon = -0.1278;

      const response = await axios.get(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code`
      );

      const current = response.data.current;
      
      setWeather({
        city,
        temperature: current.temperature_2m,
        description: getWeatherDescription(current.weather_code),
        humidity: current.relative_humidity_2m,
        windSpeed: current.wind_speed_10m
      });
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');
      console.error('Weather fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const getWeatherDescription = (code: number): string => {
    // Simplified weather code mapping
    const weatherCodes: Record<number, string> = {
      0: 'Clear sky',
      1: 'Mainly clear',
      2: 'Partly cloudy',
      3: 'Overcast',
      45: 'Foggy',
      48: 'Depositing rime fog',
      51: 'Light drizzle',
      53: 'Moderate drizzle',
      55: 'Dense drizzle',
      61: 'Slight rain',
      63: 'Moderate rain',
      65: 'Heavy rain',
      71: 'Slight snow fall',
      73: 'Moderate snow fall',
      75: 'Heavy snow fall',
      95: 'Thunderstorm'
    };
    
    return weatherCodes[code] || 'Unknown';
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">
          Weather Now
        </h1>
        <CitySearch onSearch={fetchWeather} />
        <WeatherCard weather={weather} loading={loading} error={error} />
      </div>
    </div>
  );
}

export default App;