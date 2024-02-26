import React, { useState } from 'react';

const SearchFilter = ({ onFilterChange }) => {
  const [filter, setFilter] = useState({
    priceRange: '',
    bedrooms: '',
    bathrooms: '',
    structuralType: '',
    leaser: '',
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };

  const applyFilter = async () => {
    try {
      onFilterChange(filter);
    } catch (error) {
      console.error('Error applying filter:', error);
    }
  };
  return (
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
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 100].map((value) => (
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
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
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
      <button onClick={applyFilter}>Apply Filter</button>
    </div>
  );
};

export default SearchFilter;
