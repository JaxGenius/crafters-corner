import React from 'react';
import { Link } from 'react-router-dom';

function Homepage() {
  return (
    <div>
      <header>
        <Link to="/"><img src="logo.png" alt="Logo" /></Link>
        <nav>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </nav>
      </header>

      {/* Rest of the component... */}
    </div>
  );
}

export default Homepage;