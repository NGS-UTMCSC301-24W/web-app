import React from 'react';
import './index.css';

const Step1 = ({ basicInfo, setBasicInfo, formSubmitted, handleBasicInfoSubmit, passwordMatch, handleConfirmPasswordChange, confirmPass }) => {
  return (
    <>
      <h2 style={{marginTop: '2rem', marginBottom: '2rem' }}>Step 1: Basic Information</h2>
      <form onSubmit={handleBasicInfoSubmit}>
        <div className="container">
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
                {formSubmitted && confirmPass.trim() === '' && <div className="text-danger">Confirm Password cannot be empty.</div>}
                {!passwordMatch && confirmPass.trim() !== '' && 
                  <div className="text-danger">Password and confirm password do not match.</div>}
              </div>
            </div>
          </div>
  
          <div className="row mt-4">
          <div className="row">
          <div className="col-md-6">
            <div className="form-check">
              <input
                type="radio"
                className="form-check-input"
                id="userCheckbox"
                name="role"
                value="user"
                checked={basicInfo.role === 'user'}
                onChange={() => setBasicInfo({ ...basicInfo, role: 'user' })}
              />
              <label className="form-check-label" htmlFor="userCheckbox">
                User
              </label>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-check">
              <input
                type="radio"
                className="form-check-input"
                id="landlordCheckbox"
                name="role"
                value="landlord"
                checked={basicInfo.role === 'landlord'}
                onChange={() => setBasicInfo({ ...basicInfo, role: 'landlord' })}
              />
              <label className="form-check-label" htmlFor="landlordCheckbox">
                Landlord
              </label>
            </div>
          </div>
    </div>
            {formSubmitted && basicInfo.role.trim() === '' && <div className="text-danger">Please select your role.</div>}
          </div>
        </div>
  
        <button type="submit" className="btn btn-primary" disabled={!passwordMatch}>
          Next
        </button>
      </form>
    </>
  );
  
};

export default Step1;
