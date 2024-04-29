import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:4000/users/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, email }),
      });

      if (response.ok) {
        alert('Registration successful');
        navigate('/login');
      }else{
        alert('Unable to register. Please try again.');
        console.error('Error: An error occurred while registering.');
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <div className="container">
    <Link to="/"><img src="/logo.png" alt="Logo" className="mt-3" /></Link>
    <div className="row justify-content-center">
        <div className="col-md-6">
        <form onSubmit={handleSubmit} className="p-5 mt-5 border rounded shadow">
            <h2 className="mb-4 text-center">Register</h2>
            <div className="mb-3">
            <label className="form-label">Username:</label>
            <input
                type="text"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            </div>
            <div className="mb-3">
            <label className="form-label">Email:</label>
            <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            </div>
            <div className="mb-3">
            <label className="form-label">Password:</label>
            <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            </div>
            <button type="submit" className="btn btn-primary w-100">Register</button>
        </form>
        </div>
    </div>
    </div>
  );
}

export default RegisterPage;