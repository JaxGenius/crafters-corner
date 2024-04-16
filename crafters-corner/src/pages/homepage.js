import React from 'react';
import { Link } from 'react-router-dom';

function Homepage({ isLoggedIn, username }) {
  return (
    <div>
      <header>
        <Link to="/"><img src="logo.png" alt="Logo" /></Link>
        <nav>
          {isLoggedIn ? (
            <>
              <p>Welcome, {username}!</p>
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

      {/* Rest of the component... */}
    </div>
  );
}

export default Homepage;