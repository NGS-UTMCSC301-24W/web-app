import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Registration = () => {
  const history = useHistory();
  const [step, setStep] = useState(1);
  const [basicInfo, setBasicInfo] = useState({ username: '', password: '' });
  const [details, setDetails] = useState({ email: '' });

  const handleBasicInfoSubmit = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handleDetailsSubmit = async (e) => {
    e.preventDefault();
    const userData = { ...basicInfo, ...details };

    console.log( userData)
    try {
      // Send POST request to backend
      const response = await fetch('http://localhost:3001/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      console.log("---", userData)
      if (response.ok) {
        console.log('User registered successfully');
        history.push('/');
      } else {
        console.error('Failed to register user');
        console.error('Status Code:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };


  return (
    <div>
      {step === 1 && (
        <>
          <h2>Step 1: Basic Information</h2>
          <form onSubmit={handleBasicInfoSubmit}>
            <label>
              Username:
              <input
                type="text"
                value={basicInfo.username}
                onChange={(e) => setBasicInfo({ ...basicInfo, username: e.target.value })}
              />
            </label>
            <br />
            <label>
              Password:
              <input
                type="password"
                value={basicInfo.password}
                onChange={(e) => setBasicInfo({ ...basicInfo, password: e.target.value })}
              />
            </label>
            <br />
            <button type="submit">Next</button>
          </form>
        </>
      )}

      {step === 2 && (
        <>
          <h2>Step 2: Additional Details</h2>
          <form onSubmit={handleDetailsSubmit}>
            <br />
            <label>
              Email:
              <input
                type="email"
                value={details.email}
                onChange={(e) => setDetails({ ...details, email: e.target.value })}
              />
            </label>
            <br />
            <button type='submit'>Submit</button>
          </form>
        </>
      )}
    </div>
  );
};

export default Registration;
