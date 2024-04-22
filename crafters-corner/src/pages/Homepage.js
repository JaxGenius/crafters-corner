import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import SearchComponent from '../components/SearchComponent';
import { AppContext } from '../AppContext';

function Homepage() {
  const { isLoggedIn, displayName } = useContext(AppContext);

  return (
    <div>
      <header>
        <Link to="/"><img src="logo.png" alt="Logo" /></Link>
        <nav>
          {isLoggedIn ? (
            <>
              <p>Welcome, {displayName}!</p>
              <Link to="/logout">Logout</Link>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </nav>
      </header>
      <div>name = {displayName}</div>
      <div id="search">
        <SearchComponent />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ flex: '1', margin: '10px', padding: '20px', border: '1px solid black' }}>Category 1</div>
        <div style={{ flex: '1', margin: '10px', padding: '20px', border: '1px solid black' }}>Category 2</div>
        <div style={{ flex: '1', margin: '10px', padding: '20px', border: '1px solid black' }}>Category 3</div>
      </div>
    </div>
  );
}

export default Homepage;