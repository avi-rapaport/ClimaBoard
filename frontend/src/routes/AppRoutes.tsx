import { Navigate, Route, Routes } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import Layout from '../Layout';
import ProtectedRoutes from './ProtectedRoutes';
import DashboardPage from '../pages/DashboardPage';
import WeatherPage from '../pages/WeatherPage';
import ComparePage from '../pages/ComparePage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route element={<ProtectedRoutes />}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="weather" element={<WeatherPage />} />
          <Route path="compare" element={<ComparePage />} />
        </Route>
      </Route>

      <Route path="*" element="404 Page not found" />
    </Routes>
  );
};

export default AppRoutes;
