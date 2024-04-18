import React, { useState } from 'react';

function SearchComponent() {

  const [search, setSearch] = useState('');

  const handleSubmit = async event => {
    event.preventDefault();

    const response = await fetch(`http://localhost:4000/products/${search}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
    } else {
      console.log('Search failed!');
      // Handle failed login here (e.g. show error message)
    }
  };

  return (
    <div>
      <h1>Search</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Search:
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} required />
        </label>
        <button type="submit">Search</button>
      </form>
    </div>
  );
}

export default SearchComponent;