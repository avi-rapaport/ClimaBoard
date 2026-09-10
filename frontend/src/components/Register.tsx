import { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const login = useAuthStore((state) => state.login);
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const nameToSubmit = name.trim();
    if (!nameToSubmit) return;

    login(nameToSubmit);

    navigate('/', { replace: true });
  };

  return (
    <form className="register" onSubmit={handleSubmit}>
      <input
        className="reg-input"
        onChange={(e) => setName(e.target.value)}
        type="text"
        placeholder="explorer name"
        value={name}
        autoFocus
        required
        minLength={3}
      />
      <button className="reg-btn" type="submit">
        Login
      </button>
    </form>
  );
};

export default Register;
