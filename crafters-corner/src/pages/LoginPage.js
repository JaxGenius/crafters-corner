import React from 'react';
import { Link } from 'react-router-dom';
import LoginComponent from '../components/LoginComponent';

function LoginPage() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light position-relative">
      <Link to="/" className="position-absolute top-0 start-0 p-3">
        <img src="logo.png" alt="Logo" />
      </Link>
      <div className="p-4 rounded shadow-sm bg-white" style={{ width: '300px' }}>
        <h1 className="text-center mb-4">Login Page</h1>
        <LoginComponent />
      </div>
    </div>
  );
}

export default LoginPage;