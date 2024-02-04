import React, { useState, useEffect } from 'react';
import constants from "../constants.json";

const Filter = () => {
  const [listings, setListings] = useState([]);
  const [filter, setFilter] = useState({
    minPrice: '',
    maxPrice: '',
    minLatitude: '',
    maxLatitude: '',
    minLongitude: '',
    maxLongitude: '',
  });

  useEffect(() => {
    fetchListings();
  }, []); // Fetch listings on component mount

  const fetchListings = async () => {
    try {
      const response = await fetch(`${constants.API_BASE_URL}/listings/all`);
      const data = await response.json();
      setListings(data);
    } catch (error) {
      console.error('Error fetching listings:', error);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };

  const applyFilter = async () => {
    try {
      const queryParameters = Object.entries(filter)
        .filter(([key, value]) => value !== '')
        .map(([key, value]) => `${key}=${value}`)
        .join('&');

      const response = await fetch(`${constants.API_BASE_URL}/listings/filter?${queryParameters}`);
      const data = await response.json();
      setListings(data);
    } catch (error) {
      console.error('Error applying filter:', error);
    }
  };

  return (
      <div>
        <h2>Listings</h2>
        <div>
          <label>Min Price:</label>
          <input type="text" name="minPrice" value={filter.minPrice} onChange={handleFilterChange}/>
        </div>
        <div>
          <label>Max Price:</label>
          <input type="text" name="maxPrice" value={filter.maxPrice} onChange={handleFilterChange}/>
        </div>
        {/* Add more filter input fields as needed */}
        <button onClick={applyFilter}>Apply Filter</button>
        <ul>
          {listings.map((listing) => (
              <li key={listing.id}>
                <strong>Title: {listing.title}</strong>
                <p>Description: {listing.description}</p>
                <p>Price: {listing.price}</p>
                {/* Display other listing details */}
              </li>
          ))}
        </ul>
      </div>
  );
};

export default Filter;
