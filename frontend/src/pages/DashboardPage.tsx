import {
  weatherService,
  type CurrentWeatherData,
} from '../ api/weatherService';
import CurrentWeatherCard from '../components/CurrentWeatherCard';
import { useAuthStore } from '../store/authStore';
import { useAxios } from '../hooks/useAxios';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  const name = useAuthStore((state) => state.explorerName);
  const navigate = useNavigate();

  const fetchCurrent = useCallback(() => {
    return weatherService.getCurrentWeather(31.76904, 35.21633);
  }, []);

  const { data, loading, error } = useAxios<CurrentWeatherData>(fetchCurrent);

  if (loading) return <h1>Loading weather info...</h1>;
  if (error) return <h1>Error: {error}</h1>;
  if (!data) return <h1>No data to display</h1>;

  return (
    <div className="dash-page">
      <h1 className="dash-headline">Welcome {name} !</h1>
      <div className="quick-cards">
        <div onClick={() => navigate('/search')} className="quick-card">
          Search City
        </div>
        <div className="quick-card">Compare Cities</div>
        <div className="quick-card">Favorites</div>
      </div>

      <CurrentWeatherCard currentData={data} />
    </div>
  );
};

export default DashboardPage;
