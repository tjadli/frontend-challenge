import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useFormContext } from '../../context/FormContext';
import MoreInfoComponent from './component';

export default function MoreInfo() {
  const {
    form: { color, terms }, setFormValue, colors, validateForm,
  } = useFormContext();

  const navigate = useNavigate();

  const submitFormData = (e) => {
    e.preventDefault();
    if (!validateForm(['color', 'terms'])) {
      return;
    }

    navigate('/confirmation');
  };

  const handlePrevious = (e) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <MoreInfoComponent
      handlePrevious={handlePrevious}
      handleSubmit={submitFormData}
      handleFormData={setFormValue}
      color={color}
      colors={colors}
      terms={terms}
    />
  );
}
