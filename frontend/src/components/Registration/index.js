import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Step1 from './Step1';
import Step2 from './Step2';
import Layout from '../../layout';

const Registration = () => {
  const history = useHistory();
  const [step, setStep] = useState(1);
  const [basicInfo, setBasicInfo] = useState({ username: '', fullName: '', password: '', confirmPassword: '' });
  const [details, setDetails] = useState({
    email: '',
    phoneNumber: '',
    birthday: '',
    gender: 'male', 
    schoolProgram: '',
    yearOfStudy: 1, 
  });  
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
      <Layout>
        {step === 1 && (
        <Step1
          basicInfo={basicInfo}
          setBasicInfo={setBasicInfo}
          formSubmitted={formSubmitted}
          handleBasicInfoSubmit={handleBasicInfoSubmit}
          handleConfirmPasswordChange={handleConfirmPasswordChange}
          passwordMatch={passwordMatch}
        />
      )}

      {step === 2 && (
        <Step2
          details={details}
          setDetails={setDetails}
          handleDetailsSubmit={handleDetailsSubmit}
        />
      )}
      </Layout>
      
    </div>
  );
};

export default Registration;
