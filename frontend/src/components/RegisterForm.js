import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Registration = () => {
  const history = useHistory();
  const [step, setStep] = useState(1);
  const [basicInfo, setBasicInfo] = useState({ username: '', fullName: '', password: '', confirmPassword: '' });
  const [details, setDetails] = useState({ email: '' });
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleBasicInfoSubmit = (e) => {
    e.preventDefault();

    setFormSubmitted(true);
    // Check if any of the fields is empty
    if (basicInfo.username.trim() === '' || basicInfo.fullName.trim() === '' || basicInfo.password.trim() === '' || basicInfo.confirmPassword.trim() === '') {
      // If any field is empty, display a message and do not proceed to the next step
      alert('Please fill in all the required fields.');
      return;
    }
    setStep(2);
  };

  const handleDetailsSubmit = async (e) => {
    e.preventDefault();
    const userData = { ...basicInfo, ...details };

    console.log(userData);
    try {
      // Send POST request to backend
      const response = await fetch('http://localhost:3001/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

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

  const handleConfirmPasswordChange = (e) => {
    const confirmPassword = e.target.value;
    setBasicInfo({ ...basicInfo, confirmPassword });

    // Check if password and confirm password match
    setPasswordMatch(basicInfo.password === confirmPassword);
  };

  return (
    <div className="container register">
      {step === 1 && (
        <>
          <h2>Step 1: Basic Information</h2>
          <form onSubmit={handleBasicInfoSubmit}>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label>Username:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={basicInfo.username}
                    onChange={(e) => setBasicInfo({ ...basicInfo, username: e.target.value })}
                  />
                  {formSubmitted && basicInfo.username.trim() === '' && <div className="text-danger">Username cannot be empty.</div>}
                </div>

                <div className="form-group">
                  <label>Full Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={basicInfo.fullName}
                    onChange={(e) => setBasicInfo({ ...basicInfo, fullName: e.target.value })}
                  />
                  {formSubmitted && basicInfo.fullName.trim() === '' &&  <div className="text-danger">Full Name cannot be empty.</div>}
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>Password:</label>
                  <input
                    type="password"
                    className="form-control"
                    value={basicInfo.password}
                    onChange={(e) => setBasicInfo({ ...basicInfo, password: e.target.value })}
                  />
                  {formSubmitted && basicInfo.password.trim() === '' && <div className="text-danger">Password cannot be empty.</div>}
                </div>

                <div className="form-group">
                  <label>Confirm Password:</label>
                  <input
                    type="password"
                    className="form-control"
                    value={basicInfo.confirmPassword}
                    onChange={handleConfirmPasswordChange}
                  />
                  {formSubmitted && basicInfo.confirmPassword.trim() === '' && <div className="text-danger">Confirm Password cannot be empty.</div>}
                  {!passwordMatch && <div className="text-danger">Password and confirm password do not match.</div>}
                </div>
              </div>
            </div>
            <br />
            <button type="submit" className="btn btn-primary" disabled={!passwordMatch}>
              Next
            </button>
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
            <button type="submit">Submit</button>
          </form>
        </>
      )}
    </div>
  );
};

export default Registration;
