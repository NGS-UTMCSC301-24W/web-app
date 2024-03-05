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
    <div className='container'>
      <h2 style={{marginTop: '2rem', marginBottom: '2rem' }}>Login Page</h2>
      <form onSubmit={handleSubmit}>
        <div className='col-md-6'>
          <div className="form-group mb-3">
            <label>Username:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group mb-3">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-control"
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
};

export default Login;
