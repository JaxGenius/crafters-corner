import React, { useState, useContext } from 'react';
import { AppContext } from '../AppContext';
import { useNavigate } from 'react-router-dom';

function LoginComponent() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setIsLoggedIn, setDisplayName } = useContext(AppContext);
  const { isLoggedIn } = useContext(AppContext);

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
      //const data = await response.json();
      // Handle successful login here (e.g. redirect, show message, etc.)
      console.log('isLoggedin first', {isLoggedIn});
      setIsLoggedIn(true); // Set the isLoggedIn state to true
      console.log('isLoggedin second', {isLoggedIn});
      setDisplayName(username);  // Set the displayName state to the username
      alert('Login successful'); // Display a browser alert message
      navigate('/'); // Navigate back to homepage
    } else {
      console.log('Login failed');
      alert('Login failed'); // Display a browser alert message
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