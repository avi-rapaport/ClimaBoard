import { useAxios } from '../hooks/useAxios';
import {
  weatherService,
  type CityData,
  type CurrentWeatherData,
} from '../ api/weatherService';
import { useState } from 'react';

const SearchCity = () => {
  const [searcQuery, setSearchQuery] = useState('');

  const fetchForecast = () =>
    weatherService.getForcastData(cityData?.latitude, cityData?.longitude);

  return (
    <form onSubmit={handle} className="search-city">
      <input
        type="text"
        placeholder="Search city"
        value={searcQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button type="submit"></button>
    </form>
  );
};

export default SearchCity;
