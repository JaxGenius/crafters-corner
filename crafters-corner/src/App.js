import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Homepage from './pages/Homepage';
import LoginPage from './pages/LoginPage'; // adjust the path as needed

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/" element={<Homepage username={username} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;