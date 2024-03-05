import React, { useState, useEffect } from 'react';
import constants from "../../constants.json";
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

const Listings = () => {
    const [listings, setListings] = useState([]);

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

    return (
        <div className="container mt-4">
            <div className="row" style={{width: '98rem'}}>
                {listings.map((listing) => (
                    <div key={listing.id} className="col-md-4 mb-3">
                        <div className="card card-container">
                            <img src={listing.images || 'path/to/default/image.jpg'} className="card-img-top" alt={listing.title} />
                            <div className="card-body">
                                <h5 className="card-title">Title: {listing.title}</h5>
                                <p className="card-text"><b>Description:</b> {listing.description}</p>
                                <p className="card-text">
                                    <b>Room Details:</b>
                                    {listing.roomCount ? ` ${listing.roomCount.bedrooms} Bedrooms, ${listing.roomCount.bathrooms} Bathrooms` : ' Room details not available'}
                                </p>
                                <p className="card-text"><b>Price:</b> {listing.price}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
        
}

export default Listings;
