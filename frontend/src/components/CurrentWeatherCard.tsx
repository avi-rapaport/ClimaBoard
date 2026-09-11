import type { CurrentWeatherData } from '../ api/weatherService';
import { getWeatherInfo } from '../utils/weatherCodes';

interface CurrentDataProps {
  currentData: CurrentWeatherData;
}

const CurrentWeatherCard = ({ currentData }: CurrentDataProps) => {
  const label = getWeatherInfo(currentData.code).label;
  const icon = getWeatherInfo(currentData.code).icon;
  const date = new Date();
  const formattedDate = date.toLocaleDateString('en-US', {
    weekday: 'long',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  return (
    <div className="current-card">
      <div>
        <h2>jerusalem</h2>
        <div className="current-info">
          <div className="current-icon">{icon}</div>
          <h1>{currentData.temperature}</h1>°C
          <div className="current-sub-info">
            <p>Precipitation: {currentData.precipitation}%</p>
            <p>Humidity: {currentData.humidity}%</p>
            <p>Wind: {currentData.wind_speed}km/h</p>
          </div>
        </div>
      </div>

      <div>
        <h3>Weather</h3>
        <p>{formattedDate}</p>
        <p>{label}</p>
      </div>
    </div>
  );
};

export default CurrentWeatherCard;
