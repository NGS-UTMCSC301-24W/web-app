import React, { useState, useEffect } from 'react';
import SearchFilter from "./SearchFilter";
import constants from "../../constants.json";

const SearchResults = ({ location }) => {
  const { results } = location.state || { results: [] };
  const [filteredResults, setFilteredResults] = useState(results);

  const applyFilter = async (filter) => {
    try {
      // Filter out parameters with empty values
      const filteredParameters = Object.entries(filter)
        .filter(([key, value]) => value !== '')
        .map(([key, value]) => `${key}=${value}`)
        .join('&');
      console.log(filteredParameters);

      // Only proceed with the request if there are non-empty parameters
      if (filteredParameters !== '') {
        const response = await fetch(`${constants.API_BASE_URL}/listings/filter?${filteredParameters}`);
        const data = await response.json();
        console.log(data);

        // Check if the filtered result is empty
        if (data.length === 0) {
          // Clear the listings page by setting an empty array
          setFilteredResults([]);
        } else {
          setFilteredResults(data);
        }
      } else {
        // If all filter parameters are empty, reset the listings to the full list
        setFilteredResults(results);
      }
    } catch (error) {
      console.error('Error applying filter:', error);
    }
  };

  useEffect(() => {
    // Apply the initial filter when the component mounts
    applyFilter({});
  }, [results]);

  const handleFilterChange = (filter) => {
    // Update the filtered results when the filter changes
    applyFilter(filter);
  };


  return (
      <div className="container mt-4"> {/* Adjust the margin-top as needed */}
        <h2 className="text-center mb-4">Search Results:</h2>

        {/* Pass filter change handler to SearchFilter component */}
        <SearchFilter searchResults={results} onFilterChange={handleFilterChange}/>

        {/* Display Results in Cards with Three Cards in Each Row */}
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {filteredResults.map((result) => (
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
