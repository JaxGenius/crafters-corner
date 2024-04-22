import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Homepage from './pages/Homepage';
import LoginPage from './pages/LoginPage';
import SearchResults from './pages/SearchResults';
import { AppProvider } from './AppContext';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<Homepage />} />
            <Route path="/results" element={<SearchResults />} />
          </Routes>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;