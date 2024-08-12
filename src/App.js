import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';
import InsuranceTypes from './InsuranceTypes';
import AuthContainer from './AuthContainer';
import PlansPage from './PlansPage';
import InsuranceRenewal from './InsuranceRenewal';
import RenewalConfirmation from './RenewalConfirmation';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthContainer/>}/>
        <Route path="/insurance-types" element={<InsuranceTypes />} />
        <Route path="/plans/:insuranceType" element={<PlansPage/>}/>
        <Route path="/renew" element={<InsuranceRenewal />} />
        <Route path="/confirmation" element={<RenewalConfirmation />} />
      </Routes>
    </Router>
  );
};

export default App;