import React from 'react';
import LoginComponent from '../components/LoginComponent';
import 'bootstrap/dist/css/bootstrap.min.css';

function LoginPage() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="p-4 rounded shadow-sm bg-white" style={{ width: '300px' }}>
        <h1 className="text-center mb-4">Login Page</h1>
        <LoginComponent />
      </div>
    </div>
  );
}

export default LoginPage;