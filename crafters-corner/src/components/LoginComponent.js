import React, { useState, useContext } from 'react';
import { AppContext } from '../AppContext';
import { useNavigate } from 'react-router-dom';

function LoginComponent() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setIsLoggedIn, setDisplayName, setUserID } = useContext(AppContext);

  const navigate = useNavigate();

  const handleSubmit = async event => {
    event.preventDefault();

    const response = await fetch('http://localhost:4000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      // Handle successful login here
      const data = await response.json();
      setIsLoggedIn(true);
      setDisplayName(username);
      setUserID(data.id);
      alert('Login successful');
      navigate('/');
    } else {
      // Handle failed login here
      console.log('Login failed');
      alert('Login failed');
    }
  };

  return (
    <div>
      <form className="form-group" onSubmit={handleSubmit}>
        <label className="form-label mt-3">
          Username:
          <input type="text" className="form-control" value={username} onChange={e => setUsername(e.target.value)} required />
        </label>
        <label className="form-label mt-3">
          Password:
          <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} required />
        </label>
        <button type="submit" className="btn btn-primary mt-3">Login</button>
      </form>
    </div>
  );
}

export default LoginComponent;