import { NavLink } from 'react-router-dom';
import logoImg from '../assets/logo_img.jpeg';
import { useAuthStore } from '../store/authStore';

const Header = () => {
  const logout = useAuthStore((state) => state.logout);

  return (
    <div className="header">
      <img className="logo-img" src={logoImg} alt="logo" />
      <nav className="nav-bar">
        <NavLink
          to="/dashboard"
          className={({ isActive }) => (isActive ? 'nav-active' : 'nav-item')}
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/search"
          className={({ isActive }) => (isActive ? 'nav-active' : 'nav-item')}
        >
          Search
        </NavLink>

        <NavLink
          to="/favorites"
          className={({ isActive }) => (isActive ? 'nav-active' : 'nav-item')}
        >
          Favorites
        </NavLink>
      </nav>

      <div className="logout-btn" onClick={logout}>
        Logout→
      </div>
    </div>
  );
};

export default Header;
