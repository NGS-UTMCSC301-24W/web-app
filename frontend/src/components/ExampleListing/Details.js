import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Carousel } from 'react-bootstrap';
import constants from "../../constants.json";
import 'bootstrap/dist/css/bootstrap.min.css';
import './details.css';

const DetailsPage = () => {
  const [pageId, setPageID] = useState(null);
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const currentURL = window.location.href;
    const urlParts = currentURL.split('/');
    const id = urlParts[urlParts.length - 1];
    setPageID(id);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${constants.API_BASE_URL}/listings/all`);
        const data = await response.json();
        const filteredListings = data.filter(listing => listing.id === pageId);
        setListings(filteredListings);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [pageId]);

  return (
    <div className='container'>
      <Container>
        <Row>
          {listings.map((listing) => (
            <Col key={listing.id} lg={25}>
              <div className="listing-item">
                <Carousel className="carousel">
                  {listing.images.map((image, index) => (
                    <Carousel.Item key={index}>
                      <img src={image} alt={`Slide ${index + 1}`} className="d-block" />
                      <Carousel.Caption>
                        <h3>{listing.title}</h3>
                      </Carousel.Caption>
                    </Carousel.Item>
                  ))}
                </Carousel>
                <div className="listing-container">
                  <h3>{listing.title}</h3>
                  <p className="text-start"><strong>Description:</strong> {listing.description}</p>
                  <p className="text-start"><strong>Address:</strong> {listing.address}</p>
                  <p className="text-start"><strong>Property Type:</strong> {listing.structuralType}</p>
                  <p className="text-start"><strong>Price:</strong> ${listing.price}</p>
                  <p className="text-start"><strong>Rooms:</strong>
                    {listing.roomCount ? ` ${listing.roomCount.bedrooms} Bedrooms, ${listing.roomCount.bathrooms} Bathrooms` : ' Room details not available'}
                  </p>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
  
};

export default DetailsPage;
