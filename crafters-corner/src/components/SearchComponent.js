import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchComponent() {

  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async event => {
    event.preventDefault();

    const response = await fetch(`http://localhost:4000/search/${query}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();
      navigate('/results', { state: { results: data } });
    } else {
      console.log('Search failed!');
    }
  };

  return (
    <div>
      <h1>Search</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Search:
          <input type="text" value={query} onChange={e => setQuery(e.target.value)} required />
        </label>
        <button type="submit">Search</button>
      </form>
    </div>
  );
}

export default SearchComponent;