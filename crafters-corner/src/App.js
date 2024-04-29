import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Homepage from './pages/Homepage';
import LoginPage from './pages/LoginPage';
import SearchResults from './pages/SearchResults';
import { AppProvider } from './AppContext';
import ShopfrontPage from './pages/ShopfrontPage';
import CartPage from './pages/CartPage';
import ProductPage from './pages/ProductPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<Homepage />} />
            <Route path="/results" element={<SearchResults />} />
            <Route path="/shopfront/:userId" element={<ShopfrontPage />} />
            <Route path="/cart/:id" element={<CartPage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;