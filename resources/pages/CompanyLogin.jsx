import React, { useState } from 'react';
import LoginInputs from '../components/Layout/LoginInputs';
import { useLogin } from '../hooks/useLogin';
import { useNavigate } from 'react-router-dom';

const CompanyLogin = ({ redirect = '/manager' }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { errors, login } = useLogin();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await login(email, password);
    if (response?.data?.status) {
      navigate(redirect);
    }
  };

  return (
    <LoginInputs
      handleLogin={handleLogin}
      errors={errors}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
    />
  );
};
export default CompanyLogin;
