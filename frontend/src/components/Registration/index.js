import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Modal, Button } from 'bootstrap/dist/js/bootstrap.bundle.min.js';


import Step1 from './Step1';
import Step2 from './Step2';


const Registration = () => {
  const history = useHistory();
  const [step, setStep] = useState(1);
  const [basicInfo, setBasicInfo] = useState({ username: '', fullName: '', password: '', confirmPassword: '', role: '' });
  const [details, setDetails] = useState({
    email: '',
    phoneNumber: '',
    birthday: '',
    gender: '', 
    schoolProgram: '',
    yearOfStudy: '', 
  });  
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [finalSubmitted, setFinalSubmitted] = useState(false);


  const validPhoneNumber = (value) => !isNaN(Number(value)) && value.trim().length === 10;

  const validAge = (birthdate) => {
    const today = new Date();
    const birthdateDate = new Date(birthdate);
    const age = today.getFullYear() - birthdateDate.getFullYear();
  
    const isBirthdayPassed =
      today.getMonth() > birthdateDate.getMonth() ||
      (today.getMonth() === birthdateDate.getMonth() && today.getDate() >= birthdateDate.getDate());
  
    return isBirthdayPassed ? age >= 13 : age - 1 >= 13;
  };


  const handleBasicInfoSubmit = (e) => {
    e.preventDefault();

    setFormSubmitted(true);

    // Check if any of the fields is empty, including the checkbox
    if (
      basicInfo.username.trim() === '' ||
      basicInfo.fullName.trim() === '' ||
      basicInfo.password.trim() === '' ||
      basicInfo.confirmPassword.trim() === '' ||
      basicInfo.role.trim() === ''
    ) {
      // If any field is empty, display a message and do not proceed to the next step
      return;
    }
    console.log(basicInfo)
    setStep(2);
  };

  const handleDetailsSubmit = async (e) => {
    e.preventDefault();
    setFinalSubmitted(true)

      // Check if any of the fields is empty
      if (
        details.email.trim() === '' ||
        details.phoneNumber.trim() === '' ||
        details.birthday.trim() === '' ||
        details.gender.trim() === '' ||
        details.schoolProgram.trim() === '' ||
        details.yearOfStudy === ''
      ) {
        // If any field is empty, display a message and do not proceed to the next step
        return;
      }

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
          validAge={validAge}
          validPhoneNumber={validPhoneNumber}
          finalSubmitted={finalSubmitted}
          details={details}
          setDetails={setDetails}
          handleDetailsSubmit={handleDetailsSubmit}
        />
        
      )}

    </div>
  );
};

export default Registration;
