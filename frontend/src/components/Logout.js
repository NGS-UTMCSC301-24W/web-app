import React from 'react';
import { useHistory } from 'react-router-dom';
import useSharedState from '../StateProvider/useSharedState';
import './LogoutButton.css'; // Import CSS file for styling

const LogoutButton = () => {
  const history = useHistory();
  const { updateState } = useSharedState();

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:3001/users/logout', {
        method: 'POST',
        credentials: 'include',
      });
      if (response.ok) {
        updateState({ isLoggedIn: false }); // Update shared state to reflect user logout
        history.push('/'); // Redirect to home page or another appropriate route
      } else {
        console.error('Failed to logout user');
        console.error('Status Code:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <button className="logout-button" onClick={handleLogout}>Logout</button>
    
  );
};

export default LogoutButton;
