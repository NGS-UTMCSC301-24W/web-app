import React from 'react';

const Step1 = ({ basicInfo, setBasicInfo, formSubmitted, handleBasicInfoSubmit, passwordMatch, handleConfirmPasswordChange }) => {
  return (
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
  );
};

export default Step1;
