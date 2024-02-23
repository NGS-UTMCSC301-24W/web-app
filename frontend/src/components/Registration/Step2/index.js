import React from 'react';

const Step2 = ({ finalSubmitted, details, setDetails, handleDetailsSubmit }) => {
  return (
    <div className="step-container">
      <h2 style={{marginTop: '2rem' }}>Step 2: Additional Details</h2>
      <form onSubmit={handleDetailsSubmit} className="form">
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={details.email}
            onChange={(e) => setDetails({ ...details, email: e.target.value })}
            className="form-control"
          />
          {finalSubmitted && details.email.trim() === '' && <div className="text-danger">Please fill in your email.</div>}
        </div>

        <div className="form-group">
          <label>Phone Number:</label>
          <input
            type="tel"
            value={details.phoneNumber}
            onChange={(e) => setDetails({ ...details, phoneNumber: e.target.value })}
            className="form-control"
          />
          {finalSubmitted && details.phoneNumber.trim() === '' && <div className="text-danger">Please fill in your phone number.</div>}
        </div>

        <div className="form-group">
          <label>Birthday:</label>
          <input
            type="date"
            value={details.birthday}
            onChange={(e) => setDetails({ ...details, birthday: e.target.value })}
            className="form-control"
          />
          {finalSubmitted && details.birthday.trim() === '' && <div className="text-danger">Please fill in your birthday.</div>}
        </div>

        <div className="form-group">
          <label>Gender:</label>
          <select
            value={details.gender}
            onChange={(e) => setDetails({ ...details, gender: e.target.value })}
            className="form-control"
          >
            <option value="other"></option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            
          </select>
          {finalSubmitted && details.gender.trim() === '' && <div className="text-danger">Please select your gender.</div>}
        </div>

        <div className="form-group">
          <label>School's Program:</label>
          <input
            type="text"
            value={details.schoolProgram}
            onChange={(e) => setDetails({ ...details, schoolProgram: e.target.value })}
            className="form-control"
          />
          {finalSubmitted && details.schoolProgram.trim() === '' && <div className="text-danger">Please fill in your schoolProgram.</div>}
        </div>

        <div className="form-group">
          <label>Year of Study in University:</label>
          <input
            type="number"
            value={details.yearOfStudy}
            onChange={(e) => {
              const newValue = Math.min(7, Math.max(1, e.target.value));
              setDetails({ ...details, yearOfStudy: newValue });
            }}
            className="form-control"
            min="1"
            max="7"
          />
          {finalSubmitted && details.yearOfStudy === 0 && <div className="text-danger">Please select your year of study.</div>}
        </div>

        <button type="submit" className="btn btn-primary" style={{ marginTop: "1rem" }}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Step2;
