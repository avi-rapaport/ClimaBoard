import { api } from './axiosInstance';

export interface CityData {
  id: number;
  name: string;
  country: string;
  latitude: number;
  longitude: number;
}

export interface CurrentWeatherData {
  code: number;
  temperature: number;
  precipitation: number;
  humidity: number;
  wind_speed: number;
}

export interface ForecastData {
  code: number;
  temperature_max: number;
  temperature_min: number;
  precipitation: number;
  humidity_max: number;
  humidity_min: number;
  wind_speed: number;
}

export const weatherService = {
  getCity: async (city: string): Promise<CityData> => {
    const response = await api.get(`/search?name=${city}`);
    return response.data;
  },

  getCurrentWeather: async (
    lat: number,
    lon: number
  ): Promise<CurrentWeatherData> => {
    const response = await api.get<CurrentWeatherData>(
      `/current?lat=${lat}&lon=${lon}`
    );
    return response.data;
  },

  getForecastData: async (lat: number, lon: number): Promise<ForecastData> => {
    const response = await api.get<ForecastData>(
      `/forecast?lat=${lat}&lon=${lon}`
    );
    return response.data;
  },
};
