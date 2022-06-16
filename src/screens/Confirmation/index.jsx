import React from 'react';

import { useNavigate } from 'react-router-dom';

import { useFormContext } from '../../context/FormContext';

import ConfirmationComponent from './component';

export default function Confirmation() {
  const navigate = useNavigate();
  const { form, submitForm, loading } = useFormContext();

  const handleSubmit = () => {
    submitForm();
  };
  const handleBack = () => {
    navigate('/');
  };
  return (
    <ConfirmationComponent
      data={form}
      loading={loading}
      handleSubmit={handleSubmit}
      handleBack={handleBack}
    />
  );
}
