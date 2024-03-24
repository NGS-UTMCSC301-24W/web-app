import React, { useState, useEffect } from 'react';

function Filter() {
  const [housingData, setHousingData] = useState([]);
  const [filters, setFilters] = useState({
    location: 'Any', // Default location
    max_price: 'Any',
    min_bedrooms: 'Any',
    amenity: [],
    lease_duration: 'Any',
    pet_friendly: 'Any',
  });

  useEffect(() => {
    // Fetch housing data with applied filters
    fetch(`/api/housing?${new URLSearchParams(filters)}`)
      .then(response => response.json())
      .then(data => setHousingData(data));
  }, [filters]);

  const handleFilterChange = (filterName, value) => {
    setFilters(prevFilters => ({ ...prevFilters, [filterName]: value }));
  };

  return (
    <div>
      <h1>Uhome</h1>
      {/* Add filter components here */}
      <FilterComponent name="Location"
                       options={['Erin Mills', 'Erindale', 'Fairview', 'Sheridan Homelands',
                           'Clarkson', 'Streetsvile', 'Squre One', 'Any']}
                       onChange={value => handleFilterChange('location', value)} />
      <FilterComponent name="Price"
                       options={['$500', '$1000', '$1500', '$2000', 'Any']}
                       onChange={value => handleFilterChange('price', value)} />
      <FilterComponent name="Bedrooms"
                       options={['1', '2', '3', '4', 'Any']}
                       onChange={value => handleFilterChange('rooms', value)} />
      <FilterComponent name="Amenity"
                       options={['Furnished', 'Parking', 'Laundry', 'Wifi', 'Any']}
                       onChange={value => handleFilterChange('amenity', value)} />
      <FilterComponent name="Lease duration"
                       options={['Short-term', 'Long-term', 'Any']}
                       onChange={value => handleFilterChange('lease duration', value)} />
      <FilterComponent name="Pet"
                       options={['Yes', 'No', 'Any']}
                       onChange={value => handleFilterChange('pet', value)} />
      {/* Add more filter components... */}

      <h2>Available Housing</h2>
      <ul>
        {housingData.map(property => (
          <li key={property.id}>
              {property.location} - ${property.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

const FilterComponent = ({ name, options, onChange }) => {
  return (
    <div style={{ margin: '10px 0' }}>
      <label style={{fontWeight: 'bold'}}>{name}: </label>
      {options.map(option => (
          <label key={option} style={{marginLeft: '10px'}}>
              <input
                  type="checkbox"
                  value={option}
                  onChange={(e) => onChange(e.target.value)}
              />
              {option}
          </label>
      ))}
    </div>
  );
};
export default Filter;
