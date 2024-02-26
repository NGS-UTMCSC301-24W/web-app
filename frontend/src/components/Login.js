import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useSharedState from '../StateProvider/useSharedState';

const Login = () => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const { sharedState, updateState } = useSharedState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add logic to handle login (e.g., send data to backend for authentication)
    const userData = { ...formData };

    console.log( userData)
    try {
      // Send POST request to backend
      const response = await fetch('http://localhost:3001/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
        credentials: 'include',
      });
      console.log("---", userData)
      if (response.ok) {
        updateState({ isLoggedIn: true });
        //console.log(sharedState.isLoggedIn);
        console.log('User Login successfully');
        history.push('/');
      } else {
        console.error('Failed to login user');
        console.error('Status Code:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
    // Reset form fields after submission
    setFormData({ username: '', password: '' });
  };

  useEffect(() => {
    console.log(sharedState.isLoggedIn);
  }, [sharedState.isLoggedIn]);

  return (
    <div>
      <h2>Login Page</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
