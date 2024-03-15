import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import constants from '../constants.json';
import useSharedState from '../StateProvider/useSharedState';
import SearchForm from '../components/Search/Search';
import LogoutButton from '../components/Logout';

import './NavBar.css';

const Brand = () => (
  <Link className="navbar-brand p-4" to="/">
    Uhome
  </Link>
);

const SignIn = () => (
  <Link className="navbar-brand p-4 sign-in-link" to="/login">
    Login
  </Link>
);

const Register = () => (
  <Link className="navbar-brand p-4 log-in-link" to="/registration">
    Register
  </Link>
);


const DropdownSelect = () => {
  const history = useHistory();
  const [selectedOption, setSelectedOption] = useState('/');
  const { sharedState } = useSharedState();

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    history.push(selectedValue);
  };

  return (
    <select
      className="form-select"
      style={{ width: '150px' }}
      value={selectedOption}
      onChange={handleChange}
    >
      <option value="/">Home</option>
      {sharedState.isLoggedIn ? (
        <>
          <option value="/profile">Profile</option>
          {sharedState.role !== 'user' && (
            <option value="/create-listing">Create Listing</option>
          ) }
          <option value="/listing">Filter</option>
          <option value="/discussion-board">Discussion Board</option>
        </>
      ) : (
        <>
        </>
      )}
    </select>
  );
};

const NavBar = () => {
  const history = useHistory();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const { sharedState } = useSharedState();

  const handleSearch = async () => {
    try {
      const response = await axios.get(`${constants.API_BASE_URL}/search/rentalListings?query=${searchTerm}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error searching:', error);
    }
  };

  useEffect(() => {
    if (searchResults) {
      history.push('/search-results', { results: searchResults });
    }
  }, [searchResults, history]);

  const onSearchChange = (searchValue) => {
    setSearchTerm(searchValue);
  };

  const onSearchSubmit = (event) => {
    event.preventDefault();
    handleSearch();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <Brand />
        <SearchForm onChange={onSearchChange} onSubmit={onSearchSubmit} />
        {sharedState.isLoggedIn ? <LogoutButton /> : 
          <div class="auth-links">
            <SignIn /> 
            <Register />
          </div>
          }
        {sharedState.isLoggedIn ? <DropdownSelect /> : <></>}
      </div>
    </nav>
  );
};

export default NavBar;
