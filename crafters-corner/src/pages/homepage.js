import React from 'react';

function Homepage() {
  return (
    <div>
      <header>
        <a href="/"><img src="logo.png" alt="Logo" /></a>
        <nav>
          <a href="/login">Login</a>
          <a href="/register">Register</a>
        </nav>
      </header>

      <main>
        <h1>Welcome to My E-commerce Site!</h1>
        <p>This is a simple e-commerce site. Browse our categories below:</p>

        <div className="card">
          <h2>Category 1</h2>
          <p>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        </div>

        {/* More categories... */}
      </main>
    </div>
  );
}

export default Homepage;