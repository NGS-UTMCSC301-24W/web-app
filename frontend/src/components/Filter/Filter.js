import React, { useState, useEffect } from 'react';
import constants from "../../constants.json";
import Layout from "../../layout"

const Filter = () => {
  const [listings, setListings] = useState([]);
  const [filter, setFilter] = useState({
    priceRange: '',
    bedrooms: '',
    bathrooms: '',
    structuralType: '',
    leaser: '',
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
          setListings([]);
        } else {
          setListings(data);
        }
      } else {
        // If all filter parameters are empty, reset the listings to the full list
        fetchListings();
      }
    } catch (error) {
      console.error('Error applying filter:', error);
    }
  };

  return (
    <Layout>
       <div>
        <h2>Listings</h2>
        <div>
          <label>Price Range:</label>
          <select name="priceRange" value={filter.priceRange} onChange={handleFilterChange}>
            <option value="">Any</option>
            {['0-500', '501-1000', '1001-2000', '2001-1000000000'].map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
            ))}
          </select>
        </div>
        <div>
          <label>Bedrooms:</label>
          <select
              name="bedrooms"
              value={filter.bedrooms}
              onChange={handleFilterChange}
              className={filter.bedrooms === '' ? 'required' : ''}
          >
            <option value="">
              Any
            </option>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 100].map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
            ))}
          </select>
          <span style={{color: 'red'}}>required</span>
        </div>
        <div>
          <label>Bathrooms:</label>
          <select
              name="bathrooms"
              value={filter.bathrooms}
              onChange={handleFilterChange}
              className={filter.bathrooms === '' ? 'required' : ''}
          >
            <option value="">
              Any
            </option>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
            ))}
          </select>
          <span style={{ color: 'red' }}>required</span>
        </div>

        <div>
          <label>Structural Type:</label>
          <select name="structuralType" value={filter.structuralType} onChange={handleFilterChange}>
            <option value="">Any</option>
            {['HOUSE', 'BASEMENT', 'APARTMENT', 'CONDO', 'ROOM'].map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
            ))}
          </select>
        </div>
        <div>
          <label>Leaser:</label>
          <select name="leaser" value={filter.leaser} onChange={handleFilterChange}>
            <option value="">Any</option>
            {['OWNER', 'ROOMMATE'].map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
            ))}
          </select>
        </div>
        {/* Add more filter input fields as needed */}
        <button onClick={applyFilter}>Apply Filter</button>
        <ul>
          {listings.map((listing) => (
              <li key={listing.id}>
                <strong>Title: {listing.title}</strong>
                <p>Description: {listing.description}</p>
                <p>Price: {listing.price}</p>
                <p>Number of Bedrooms: {listing.roomCount.bedrooms}</p>
                <p>Number of Bathrooms: {listing.roomCount.bathrooms}</p>
                <p>Type: {listing.structuralType}</p>
                <p>Leaser: {listing.leaser}</p>
                {/* Display other listing details */}
              </li>
          ))}
        </ul>
      </div>
    </Layout>
     
  );
};

export default Filter;
