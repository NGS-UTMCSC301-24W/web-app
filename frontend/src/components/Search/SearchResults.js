import React from 'react';
import Filter from '../Filter/Filter';

const SearchResults = ({ location }) => {
  const { results } = location.state || { results: [] };

  return (
    <div>
      <h2>Search Results:</h2>

      {/* Filter Component */}
      <Filter />

      {/* Display Results in Cards with Three Cards in Each Row */}
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {results.map((result) => (
          <div className="col" key={result.id}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{result.title}</h5>
                <p className="card-text"><strong>Address:</strong> {result.address}</p>
                <p className="card-text"><strong>Description:</strong> {result.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
