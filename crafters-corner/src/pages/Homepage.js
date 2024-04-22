import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SearchComponent from '../components/SearchComponent';
import { AppContext } from '../AppContext';
import 'bootstrap/dist/css/bootstrap.min.css';

function Homepage() {
  const { isLoggedIn, displayName, setIsLoggedIn, setDisplayName } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
    setDisplayName('');
    alert('Logged out');
    navigate('/');
  };

  return (
    <div className="container">
      <header className="d-flex justify-content-between align-items-center my-3">
        <Link to="/"><img src="logo.png" alt="Logo" /></Link>
        <nav>
          {isLoggedIn ? (
            <div>
              <p>Welcome, {displayName}!</p>
              <button className="btn btn-primary" onClick={handleLogout}>Logout</button>
              <button className="btn btn-secondary ml-2">My Shopfront</button>
              <button className="btn btn-secondary ml-2">My Cart</button>
            </div>
          ) : (
            <div>
              <Link className="btn btn-primary mr-2" to="/login">Login</Link>
              <Link className="btn btn-secondary" to="/register">Register</Link>
            </div>
          )}
        </nav>
      </header>
      <div id="search">
        <SearchComponent />
      </div>
      <div className="mt-5"></div>
      <h1>Categories</h1>
      <div className="mt-5"></div>
      <div className="d-flex justify-content-between">
        <div className="flex-grow-1 m-2 p-3 border">Furniture</div>
        <div className="flex-grow-1 m-2 p-3 border">Jewelery</div>
        <div className="flex-grow-1 m-2 p-3 border">Tools</div>
      </div>
    </div>
  );
}

export default Homepage;