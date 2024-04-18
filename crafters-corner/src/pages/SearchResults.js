import React from 'react';
import PropTypes from 'prop-types';

function SearchResults({ results }) {
  return (
    <div>
      <h1>Search Results</h1>
      {results.length > 0 ? (
        results.map((result, index) => (
          <div key={index}>
            <h2>{result.productName}</h2>
            <p>Price: {result.price}</p>
          </div>
        ))
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
}

SearchResults.propTypes = {
  results: PropTypes.arrayOf(
    PropTypes.shape({
      productName: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default SearchResults;