import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useFormContext } from '../../context/FormContext';
import HomeComponent from './component';

export default function HomeHook() {
  const navigate = useNavigate();
  const { form: { name, email, password }, setFormValue, validateForm } = useFormContext();

  const handleNext = (e) => {
    e.preventDefault();
    if (!validateForm(['name', 'email', 'password'])) {
      return;
    }

    navigate('/more-info');
  };

  return (
    <HomeComponent
      name={name}
      email={email}
      password={password}
      handleFormData={setFormValue}
      handleNext={handleNext}
    />
  );
}
