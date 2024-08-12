import React, { useState } from 'react';
import './InsuranceRenewal.css';
import logo from './logo1.jpg';
import { useNavigate } from 'react-router-dom';

const InsuranceRenewal = () => {
  const navigate = useNavigate();
  const [policyNumber, setPolicyNumber] = useState('');
  const [email, setEmail] = useState('');
  const [insuranceType, setInsuranceType] = useState('life');
  const [renewalDate, setRenewalDate] = useState('');

  const handleRenew = (e) => {
    e.preventDefault();

    // Simulate an API call or renewal process
    setTimeout(() => {
      // After successful renewal, navigate to the confirmation page
      navigate('/confirmation', {
        state: {
          policyNumber,
          insuranceType,
          renewalDate,
        },
      });
    }, 1000);
  };

  return (
    <div className="insurance-renewal-page scrollable-container">
      <header className="header">
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>
        <nav className="navbar">
          <a href="/">Home</a>
          <a href="/about">About Us</a>
          <a href="/insurance-types">Our Plans</a>
          <a href="/contact">Contact Us</a>
        </nav>
      </header>
      <div className="content">
        <h1>Renew Your Insurance Policy</h1>
        <form className="renewal-form" onSubmit={handleRenew}>
          <div className="form-group">
            <label htmlFor="policyNumber">Policy Number:</label>
            <input
              type="text"
              id="policyNumber"
              value={policyNumber}
              onChange={(e) => setPolicyNumber(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="insuranceType">Insurance Type:</label>
            <select
              id="insuranceType"
              value={insuranceType}
              onChange={(e) => setInsuranceType(e.target.value)}
            >
              <option value="life">Life Insurance</option>
              <option value="health">Health Insurance</option>
              <option value="home">Home Insurance</option>
              <option value="vehicle">Auto Insurance</option>
              <option value="travel">Travel Insurance</option>
              <option value="pet">Pet Insurance</option>
              <option value="fire">Fire Insurance</option>
              <option value="disability">Disability Insurance</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="renewalDate">Renewal Date:</label>
            <input
              type="date"
              id="renewalDate"
              value={renewalDate}
              onChange={(e) => setRenewalDate(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="renew-btn">Renew Now</button>
        </form>
      </div>
    </div>
  );
};

export default InsuranceRenewal;
