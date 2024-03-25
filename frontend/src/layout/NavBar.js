import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import constants from '../constants.json';
import useSharedState from '../StateProvider/useSharedState';
import SearchForm from '../components/Search/Search';
import LogoutButton from '../components/Logout';

import logo from '../assets/logo.png';


import './NavBar.css';

const Brand = () => (
  <Link className="navbar-brand" to="/">
    <img src={logo} alt="Logo" className="brand-logo"/>
    <span className="brand-text">UHome</span>
  </Link>
);

const Logo = () => (
  <Link className="navbar-brand" to="/">
    <img src={logo} alt="Logo" className="brand-logo"/>
  </Link>
);

const SignIn = () => (
  <Link className="navbar-brand p-4 nav-fill sign-in-link" to="/login">
    Login
  </Link>
);

const Register = () => (
  <Link className="navbar-brand p-4 nav-fill log-in-link" to="/registration">
    Register
  </Link>
);

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
        {sharedState.isLoggedIn && (
          <div className="nav-links">
            <Link className="navbar-brand nav-fill p-4" to="/">Home</Link>
            <Link className="navbar-brand nav-fill p-4" to="/profile">Profile</Link>
            {sharedState.role !== 'user' && (
              <Link className="navbar-brand nav-fill p-4" to="/create-listing">Create Listing</Link>
            )}
            <Link className="navbar-brand nav-fill p-4" to="/discussion-board">Discussion Board</Link>
          </div>
        )}
         {sharedState.isLoggedIn ? <LogoutButton /> : 
          <div className="auth-links">
            <SignIn /> 
            <Register />
          </div>
        }
      </div>
    </nav>
  );
};

export default NavBar;
