import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { setFormValue, validateForm } from '../../actions/form.actions';
import { setStep } from '../../actions/step.actions';
import HomeComponent from './component';

export default function HomeHook() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { name, email, password } = useSelector((state) => state.form);

  const handleNext = (e) => {
    e.preventDefault();
    if (!dispatch(validateForm(['name', 'email', 'password']))) {
      return;
    }
    dispatch(setStep(1));
    navigate('/more-info');
  };

  return (
    <HomeComponent
      name={name}
      email={email}
      password={password}
      handleFormData={(e) => dispatch(setFormValue(e))}
      handleNext={handleNext}
    />
  );
}
