import React, { useState } from 'react';
import setIsLoggedIn from '../pages/LoginPage';
import { set } from 'mongoose';

function LoginComponent() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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
      const data = await response.json();
      console.log(data);
      // Handle successful login here (e.g. redirect, show message, etc.)
      setIsLoggedIn(true);
      window.location.href = '/'; // Redirect to homepage
    } else {
      console.log('Login failed');
      // Handle failed login here (e.g. show error message)
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" value={username} onChange={e => setUsername(e.target.value)} required />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginComponent;