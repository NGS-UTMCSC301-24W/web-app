import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-bootstrap'; 

import constants from "../../constants.json";
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

const Listings = () => {
    const [listings, setListings] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const listingsPerPage = 4;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${constants.API_BASE_URL}/listings/all`);
                const data = await response.json();
                console.log('-----------------', data);
                setListings(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const indexOfLastListing = currentPage * listingsPerPage;
    const indexOfFirstListing = indexOfLastListing - listingsPerPage;
    const currentListings = listings.slice(indexOfFirstListing, indexOfLastListing);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="container mt-4">
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

          <div className="row" >
            {currentListings.map((listing) => (
              <div key={listing.id} className="col-md-6 mb-3">
                <div className="card card-container" >
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
                    <Link to={`/list/${listing.id}`} className="btn btn-primary">
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="pagination d-flex justify-content-center mt-4">
            {Array.from({ length: Math.ceil(listings.length / listingsPerPage) }, (_, index) => (
                <span key={index} onClick={() => paginate(index + 1)} className={`mx-2 ${currentPage === index + 1 ? 'active btn-primary' : 'btn-light'}`}>
                    {index + 1}
                </span>
            ))}
            </div>
        </div>
    );
      
        
}

export default Listings;
