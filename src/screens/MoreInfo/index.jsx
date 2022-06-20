import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setFormValue, validateForm } from '../../actions/form.actions';
import { setStep } from '../../actions/step.actions';

import MoreInfoComponent from './component';

export default function MoreInfo() {
  const { color, terms } = useSelector((state) => state.form);
  const colors = useSelector((state) => state.colors);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitFormData = (e) => {
    e.preventDefault();
    if (!dispatch(validateForm(['color', 'terms']))) {
      return;
    }
    dispatch(setStep(2));
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
      handleFormData={(e) => dispatch(setFormValue(e))}
      color={color}
      colors={colors}
      terms={terms}
    />
  );
}
