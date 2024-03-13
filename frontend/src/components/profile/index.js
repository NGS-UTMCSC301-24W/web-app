import axios from 'axios';
import constants from "../../constants.json";


// Function to fetch user by username
const profile = async (username) => {
  try {
    // Make a GET request to the backend API
    const response = await axios.get(`${constants.API_BASE_URL}/users/test123`);

    // Access the user data from the response
    const userData = response.data.user;

    console.log('User Data:', userData);
  } catch (error) {
    // Handle errors
    console.error('Error fetching user:', error.message);
  }
};

export default profile;
