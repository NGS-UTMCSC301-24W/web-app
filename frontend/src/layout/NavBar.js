import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';

const Brand = () => (
  <Link className="navbar-brand p-4" to="/">
    Uhome
  </Link>
);

const SearchForm = () => (
  <form className="d-flex align-items-center" style={{ margin: '0' }}>
    <input className="form-control me-2" type="text" 
      placeholder="Search" style={{ margin: '0', marginRight: '10px'}} />
    <button className="btn btn-primary" type="button">
      Search
    </button>
  </form>
);

const DropdownSelect = () => {
  const history = useHistory();
  const [selectedOption, setSelectedOption] = useState('/');

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    history.push(selectedValue); // Navigate to the selected page
  };

  return (
    <select
      className="form-select"
      style={{ width: '150px' }}
      value={selectedOption}
      onChange={handleChange}
    >
      <option value="/">Home</option>
      <option value="/login">Login</option>
      <option value="/registration">Registration</option> {/* Corrected typo */}
      <option value="/listing">Filter</option>
      <option value="/listings">Listings</option>
      <option value="/create-listing">Create Listing</option>
      <option value="/list/65bfafc116524254cd07f34b">Example Listing Details</option>
    </select>
  );
};


const NavBar = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
    <div className="container-fluid" >
      <Brand />
      <SearchForm />
      <DropdownSelect />
    </div>
  </nav>
);

export default NavBar;
