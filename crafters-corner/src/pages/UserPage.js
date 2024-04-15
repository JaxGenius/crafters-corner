import React from 'react';
import { Link } from 'react-router-dom';

function UserPage({ username }) {
  return (
    <div>
      <header>
        <Link to="/"><img src="logo.png" alt="Logo" /></Link>
        <nav>
          <p>Welcome, {username}!</p>
          <Link to="/logout">Logout</Link>
        </nav>
      </header>

      {/* Rest of the component... */}
    </div>
  );
}

export default UserPage;