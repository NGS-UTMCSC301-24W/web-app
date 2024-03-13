import React, { useState, useEffect } from 'react';
import constants from "../../constants.json";
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { Card, Col } from 'react-bootstrap';

const UserProfile = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${constants.API_BASE_URL}/users/test123`);
        const data = await response.json();
        console.log('--------', data);

        // Update the state with the fetched user data
        setUserData(data);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      {userData && (
        <Col md={6}>
          <Card className="text-left">
            <Card.Body>
              <Card.Title className="display-4 text-center">{userData.username}</Card.Title>
              <Card.Text className="mb-2 text-muted">Email: {userData.email}</Card.Text>
              <Card.Text className="mb-2 text-muted">Full Name: {userData.fullName}</Card.Text>
              <Card.Text className="mb-2 text-muted">Role: {userData.role}</Card.Text>
              <Card.Text className="mb-2 text-muted">Phone Number: {userData.phoneNumber}</Card.Text>
              <Card.Text className="mb-2 text-muted">Birthday: {userData.birthday}</Card.Text>
              <Card.Text className="mb-2 text-muted">Gender: {userData.gender}</Card.Text>
              <Card.Text className="mb-2 text-muted">Program of Study: {userData.schoolProgram}</Card.Text>
              <Card.Text className="mb-2 text-muted">Year of Study: {userData.yearOfStudy}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      )}
    </div>
  );
};

export default UserProfile;
