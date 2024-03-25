import React, { useState, useEffect, useMemo } from 'react';
import constants from "../../constants.json";
import 'bootstrap/dist/css/bootstrap.min.css'; 
import useSharedState from '../../StateProvider/useSharedState';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';

const UserProfile = (router) => {
  const [userData, setUserData] = useState(null);
  const { sharedState } = useSharedState();
  const username = useMemo(() => {
    if (router.match.params.username) {
      return router.match.params.username;
    }
    return sharedState.username;
  }, [sharedState, router]);
    

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${constants.API_BASE_URL}/users/${username}`);
        const data = await response.json();

        // Update the state with the fetched user data
        setUserData(data);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <section className="vh-100" style={{ backgroundColor: '#f2f4f7' }}>
      {userData && (
      <MDBContainer className="py-5 h-50">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="6" className="mb-4 mb-lg-0">
            <MDBCard className="mb-3" style={{ borderRadius: '.5rem' }}>
              <MDBRow className="g-0">
                <MDBCol md="4" className="gradient-custom text-center text-black"
                  style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                  <MDBCardImage src="https://cdn.discordapp.com/attachments/408960880773169153/1221867972554129468/Default_avatar_profile.jpg?ex=66142439&is=6601af39&hm=11cd34bb231718224176c6cdc58851b0ffd8030fa299ee04204fcd9360b56fff&"
                    alt="Avatar" className="my-5" style={{ width: '80px' }} fluid />
                  <MDBTypography tag="h5">{userData.fullName}</MDBTypography>
                  <MDBCardText>{userData.username}</MDBCardText>
                  <MDBTypography tag="h6">Role: {userData.role}</MDBTypography>
                  <MDBIcon far icon="edit mb-5" />
                </MDBCol>
                <MDBCol md="8">
                  <MDBCardBody className="p-4">
                    <MDBTypography tag="h6">Profile</MDBTypography>
                    <hr className="mt-0 mb-4" />
                    <MDBRow>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Gender</MDBTypography>
                        <MDBCardText className="text-muted">{userData.gender}</MDBCardText>
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Birthday</MDBTypography>
                        <MDBCardText className="text-muted">{userData.birthday ? userData.birthday.substring(0, 10) : ""}</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <MDBRow className="pt-1">
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Email</MDBTypography>
                        <MDBCardText className="text-muted">{userData.email}</MDBCardText>
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Phone Number</MDBTypography>
                        <MDBCardText className="text-muted">{userData.phoneNumber}</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <MDBRow>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Program of Study</MDBTypography>
                        <MDBCardText className="text-muted">{userData.schoolProgram}</MDBCardText>
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Year of Study</MDBTypography>
                        <MDBCardText className="text-muted">{userData.yearOfStudy}</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      )}
    </section>
  );
};

export default UserProfile;