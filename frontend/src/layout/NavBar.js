import React, {useEffect, useState} from 'react';
import { useHistory, Link } from 'react-router-dom';
import SearchForm from '../components/Search/Search';
import constants from '../constants.json';
import axios from 'axios';

const Brand = () => (
  <Link className="navbar-brand p-4" to="/">
    Uhome
  </Link>
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


const NavBar = () => {
  const history = useHistory();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`${constants.API_BASE_URL}/search/rentalListings?query=${searchTerm}`);
      console.log(response.data);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error searching:', error);
    }
  };

  useEffect(() => {
    if (searchResults) {
      history.push({
      pathname: '/search-results',
      state: { results: searchResults },
    });
    }
  }, [searchResults]);

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
        <DropdownSelect />
      </div>
    </nav>
  );
};

export default NavBar;
