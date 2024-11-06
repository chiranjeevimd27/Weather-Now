interface Weather {
  city: string;
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
}

interface WeatherCardProps {
  weather: Weather | null;
  loading: boolean;
  error: string | null;
}

export function WeatherCard({ weather, loading, error }: WeatherCardProps) {
  if (loading) {
    return (
      <div className="mt-8 p-6 bg-white rounded-lg shadow-lg text-center">
        <p className="text-gray-600">Loading weather data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-8 p-6 bg-white rounded-lg shadow-lg text-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!weather) {
    return null;
  }

  return (
    <div className="mt-8 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">{weather.city}</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-500">Temperature</p>
          <p className="text-xl font-semibold">{weather.temperature}°C</p>
        </div>
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-500">Description</p>
          <p className="text-xl font-semibold capitalize">{weather.description}</p>
        </div>
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-500">Humidity</p>
          <p className="text-xl font-semibold">{weather.humidity}%</p>
        </div>
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-500">Wind Speed</p>
          <p className="text-xl font-semibold">{weather.windSpeed} m/s</p>
        </div>
      </div>
    </div>
  );
}