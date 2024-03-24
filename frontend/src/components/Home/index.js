import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';

import useSharedState from '../../StateProvider/useSharedState';
import constants from "../../constants.json";
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';


const Listings = () => {
    const [listings, setListings] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const listingsPerPage = 4;
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
    }, [filter]); // Refetch data when filter changes

    const fetchData = async () => {
        try {
            let url = `${constants.API_BASE_URL}/listings/all`;
            if (Object.values(filter).some(value => value !== '')) {
                console.log("filtered");
                const filteredParameters = Object.entries(filter)
                    .filter(([key, value]) => value !== '')
                    .map(([key, value]) => `${key}=${value}`)
                    .join('&');
                url = `${constants.API_BASE_URL}/listings/filter?${filteredParameters}`;
            }
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
            setListings(data);
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
    const currentListings = listings.slice(indexOfFirstListing, indexOfLastListing);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const deleteListing = async (id) => {
        try {
            const response = await fetch(`${constants.API_BASE_URL}/listings/delete`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }),
            });

            if (response.status === 200) {
                const updatedListings = listings.filter(listing => listing.id !== id);
                setListings(updatedListings);
            } else {
                console.error('Failed to delete listing');
            }
        } catch (error) {
            console.error('Error deleting listing:', error);
        }
    };

    return (
        <div>
            <Carousel>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://mtarch.com/wp-content/uploads/2022/05/21-W.G-DAVIS.jpg"
                        alt="First slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://philosophy.utoronto.ca/wp-content/uploads/UTM-Library.jpg"
                        alt="Second slide"
                    />
                </Carousel.Item>
            </Carousel>
            <div className="filter-card">
                <div className="filter-toggle" onClick={toggleFilterVisibility}>
                    <h3>Filter</h3>
                    <span>{isFilterVisible ? 'Hide' : 'Show'}</span>
                </div>
                {isFilterVisible && (
                    <div className="filter-row">
                        {/* Filter inputs */}
                        <div className="filter-input">
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
                        </div>

                        <div className="filter-input">
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
                        </div>

                        <div className="filter-input">
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

                        <div className="filter-input">
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

                        <div className="filter-input">
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
                        <button className="btn btn-primary apply-filter-button" onClick={applyFilter}>Apply Filter
                        </button>
                    </div>
                )}
            </div>

            <div className="row" style={{ marginLeft: '1rem' }}>
                {currentListings.map((listing) => (
                    <div key={listing.id} className="col-md-6 mb-3">
                        <div className="card card-container">
                            {listing.images && listing.images.length > 0 && (
                                <img
                                    src={listing.images[0]}
                                    className="card-img-top"
                                    alt={listing.title}
                                />
                            )}
                            <div className="card-body">
                                <h5 className="card-title">Title: {listing.title}</h5>
                                <p className="card-text"><b>Description:</b> {listing.description}</p>
                                <p className="card-text">
                                    <b>Room Details:</b>
                                    {listing.roomCount ? ` ${listing.roomCount.bedrooms} Bedrooms, ${listing.roomCount.bathrooms} Bathrooms` : ' Room details not available'}
                                </p>
                                <p className="card-text"><b>Price:</b> {listing.price}</p>
                                <Link to={sharedState.isLoggedIn ? `/list/${listing.id}` : '/login'}
                                    className="btn btn-primary card-link">
                                    {sharedState.isLoggedIn ? 'View Details' : 'Login to View Details'}
                                </Link>
                                {sharedState.userId === listing.creatorId && (
                                    <button className="btn btn-primary card-link" onClick={() => deleteListing(listing.id)}>Delete</button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="pagination d-flex justify-content-center mt-4">
                {Array.from({ length: Math.ceil(listings.length / listingsPerPage) }, (_, index) => (
                    <span key={index} onClick={() => paginate(index + 1)}
                        className={`mx-2 ${currentPage === index + 1 ? 'active btn-primary' : 'btn-light'}`}>
                        {index + 1}
                    </span>
                ))}
            </div>
        </div>
    );


}

export default Listings;
