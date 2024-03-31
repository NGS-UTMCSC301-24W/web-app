import React, { useState, useEffect } from 'react';
import constants from "../../constants.json";

import useSharedState from "../../StateProvider/useSharedState";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from "react-router-dom";
import '../Home/index.css';

const SearchPage = ({ location }) => {
    const {results} = location.state || {results: []};
    const [filteredResults, setFilteredResults] = useState(results);
    const [currentPage, setCurrentPage] = useState(1);
    const listingsPerPage = 9;
    const { sharedState } = useSharedState();
    const [filter, setFilter] = useState({
        priceRange: '',
        bedrooms: '',
        bathrooms: '',
        structuralType: '',
        leaser: '',
    });
    const [isFilterVisible, setIsFilterVisible] = useState(false);
    const toggleFilterVisibility = () => {
        setIsFilterVisible(!isFilterVisible);
    };

    useEffect(() => {
        fetchData();
    }, [filter, results]);

    const fetchData = async () => {
        try {
            const filteredParameters = Object.entries(filter)
                .filter(([key, value]) => value !== '')
                .map(([key, value]) => `${key}=${value}`)
                .join('&');
            let url = `${constants.API_BASE_URL}/listings/filter?${filteredParameters}`;
            const response = await fetch(url);
            const data = await response.json();
            setFilteredResults(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilter({ ...filter, [name]: value });
    };

    const applyFilter = () => {
        fetchData();
    };

    const indexOfLastListing = currentPage * listingsPerPage;
    const indexOfFirstListing = indexOfLastListing - listingsPerPage;
    const currentListings = results.slice(indexOfFirstListing, indexOfLastListing);

    const matchingListings = currentListings.filter(listing => {
        return filteredResults.some(filteredListing => filteredListing.id === listing.id);
    });
    console.log(matchingListings);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div>
            <div className="filter-card">
                <div className="filter-toggle" onClick={toggleFilterVisibility}>
                    <h3>Filter</h3>
                    <span>{isFilterVisible ? 'Hide' : 'Show'}</span>
                </div>
                {isFilterVisible && (
                    <div className="filter-row">
                        {/* Filter inputs */}
                        <div className="filter-input">
                            <label>Bedrooms</label>
                            <select
                                name="bedrooms"
                                value={filter.bedrooms}
                                onChange={handleFilterChange}
                                className={`${filter.bedrooms === '' ? 'required' : ''} select-box`}
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
                        </div>

                        <div className="filter-input">
                            <label>Bathrooms</label>
                            <select
                                name="bathrooms"
                                value={filter.bathrooms}
                                onChange={handleFilterChange}
                                className={`${filter.bathrooms === '' ? 'required' : ''} select-box`}
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
                        </div>

                        <div className="filter-input">
                            <label>Price Range</label>
                            <select name="priceRange" value={filter.priceRange} onChange={handleFilterChange}
                            className='select-box'>
                                <option value="">Any</option>
                                {['0-500', '501-1000', '1001-2000', '2001-1000000000'].map((value) => (
                                    <option key={value} value={value}>
                                        {value}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="filter-input">
                            <label>Structural Type</label>
                            <select name="structuralType" value={filter.structuralType} onChange={handleFilterChange}
                            className='select-box'>
                                <option value="">Any</option>
                                {['HOUSE', 'BASEMENT', 'APARTMENT', 'CONDO', 'ROOM'].map((value) => (
                                    <option key={value} value={value}>
                                        {value}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="filter-input">
                            <label>Leaser</label>
                            <select name="leaser" value={filter.leaser} onChange={handleFilterChange}
                            className='select-box'>
                                <option value="">Any</option>
                                {['OWNER', 'ROOMMATE'].map((value) => (
                                    <option key={value} value={value}>
                                        {value}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                )}
            </div>

            <h2 className="text-center mb-4">Search Results:</h2>

            <div className="row" style={{marginLeft: '1rem'}}>
                {matchingListings.map((results) => (
                    <div key={results.id} className="col-md-6 mb-3">
                        <div className="card card-container">
                            {results.images && results.images.length > 0 && (
                                <img
                                    src={results.images[0]}
                                    className="card-img-top"
                                    alt={results.title}
                                />
                            )}
                            <div className="card-body">
                                <h5 className="card-title">Title: {results.title}</h5>
                                <p className="card-text"><b>Description:</b> {results.description}</p>
                                <p className='card-text'><b>Address:</b> {results.address}</p>
                                <p className="card-text">
                                    <b>Room Details:</b>
                                    {results.roomCount ? ` ${results.roomCount.bedrooms} Bedrooms, ${results.roomCount.bathrooms} Bathrooms` : ' Room details not available'}
                                </p>
                                <p className="card-text"><b>Price:</b> {results.price}</p>
                                <Link to={sharedState.isLoggedIn ? `/list/${results.id}` : '/login'}
                                      className="btn btn-primary">
                                    {sharedState.isLoggedIn ? 'View Details' : 'Login to View Details'}
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="pagination d-flex justify-content-center mt-4">
                {Array.from({length: Math.ceil(results.length / listingsPerPage)}, (_, index) => (
                    <span key={index} onClick={() => paginate(index + 1)}
                          className={`mx-2 ${currentPage === index + 1 ? 'active btn-primary' : 'btn-light'}`}>
                    {index + 1}
                </span>
                ))}
            </div>
        </div>
    );
};

export default SearchPage;
