import React, { useState } from 'react';

const SearchForm = ({ onChange, onSubmit }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    onChange(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(event);
  };

  return (
    <form className="d-flex align-items-center" onSubmit={handleSubmit} style={{ margin: '0' }}>
      <input
        className="form-control me-2"
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleChange}
        style={{ margin: '0', marginRight: '10px' }}
      />
      <button className="btn btn-primary" type="submit">
        Search
      </button>
    </form>
  );
};

export default SearchForm;
