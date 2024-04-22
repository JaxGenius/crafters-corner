import React from 'react';
import LoginComponent from '../components/LoginComponent';

function LoginPage() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f5f5f5' }}>
      <div style={{ width: '300px', padding: '20px', borderRadius: '5px', boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.1)', backgroundColor: '#fff' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Login Page</h1>
        <LoginComponent />
      </div>
    </div>
  );
}

export default LoginPage;