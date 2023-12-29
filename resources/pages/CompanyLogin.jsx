import React from 'react';
import Login from './Login';
import { generatePath } from 'react-router-dom';

const CompanyLogin = () => {
  return <Login redirect={generatePath('/manager')} />;
};
export default CompanyLogin;
