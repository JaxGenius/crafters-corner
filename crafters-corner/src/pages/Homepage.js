import React, { useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SearchComponent from '../components/SearchComponent';
import { AppContext } from '../AppContext';

function Homepage() {
  const { isLoggedIn, displayName, userID, setIsLoggedIn, setDisplayName, balance, setBalance } = useContext(AppContext);
  const navigate = useNavigate();

  const fetchUserBalance = async (userId) => {
    const response = await fetch(`http://localhost:4000/users/balance/${userId}`);
    const balance = await response.json();
    setBalance(balance);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setDisplayName('');
    alert('Logged out');
    navigate('/');
  };

  const handleShopfrontClick = () => {
    navigate(`/shopfront/${userID}`);
  }

  const handleCartClick = () => {
    navigate(`/cart/${userID}`);
  }

  useEffect(() => {
    if (isLoggedIn && userID) {
      fetchUserBalance(userID);
    }
  }, [isLoggedIn, userID]);

  return (
    <div className="container">
      <header className="d-flex align-items-center justify-content-between my-3">
        <div className="d-flex align-items-center">
          <Link to="/"><img src="/logo.png" alt="Logo" /></Link>
          {isLoggedIn && balance !== null && balance !== undefined && (
            <div className="card text-center ml-3">
              <div className="card-body">
                <h5 className="card-title">Balance</h5>
                <p className="card-text">£{balance}</p>
              </div>
            </div>
          )}
        </div>
        <nav className="ml-auto">
          {isLoggedIn ? (
            <div>
              <p>Welcome, {displayName}!</p>
              <button className="btn btn-primary ml-3" onClick={handleLogout}>Logout</button>
              <button className="btn btn-primary ml-3" onClick={handleShopfrontClick}>My Shopfront</button>
              <button className="btn btn-primary ml-3" onClick={handleCartClick}>My Cart</button>
            </div>
          ) : (
            <div>
              <Link className="btn btn-primary ml-3" to="/login">Login</Link>
              <Link className="btn btn-primary ml-3" to="/register">Register</Link>
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