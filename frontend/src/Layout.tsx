import { Outlet } from 'react-router-dom';
import Header from './components/Header';

const Layout = () => {
  return (
    <div className="layout">
      <Header />
      <main className="main">
        <Outlet />
      </main>
      <footer className="footer">Weather data by Open-Meteo.com</footer>
    </div>
  );
};

export default Layout;
