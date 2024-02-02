// Registration.js

import React, { useState } from 'react';

const Registration = () => {
  const [step, setStep] = useState(1);
  const [basicInfo, setBasicInfo] = useState({ username: '', password: '' });
  const [details, setDetails] = useState({ fullName: '', email: '' });

  const handleBasicInfoSubmit = (e) => {
    e.preventDefault();
    // Validate basic info if needed
    // Save basic info to state
    // You can add validation and error handling here
    setStep(2);
  };

  const handleDetailsSubmit = (e) => {
    e.preventDefault();
    // Validate details if needed
    // Combine basicInfo and details and send to the server for registration
    // You can add validation and error handling here
    console.log({ ...basicInfo, ...details });
    // Reset the form or navigate to the next step
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
            <label>
              Full Name:
              <input
                type="text"
                value={details.fullName}
                onChange={(e) => setDetails({ ...details, fullName: e.target.value })}
              />
            </label>
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
