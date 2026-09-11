import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:8000/weather',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Api Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);
