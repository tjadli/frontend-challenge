import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';
import { submitForm } from '../../actions/form.actions';
import { setStep } from '../../actions/step.actions';

import ConfirmationComponent from './component';

export default function Confirmation() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const form = useSelector((state) => state.form);
  const loading = useSelector((state) => state.loading);

  const handleSubmit = async () => {
    try {
      await dispatch(submitForm());
      dispatch(setStep(3));
      navigate('/success');
    } catch (error) {
      dispatch(setStep(3));
      navigate('/error');
    }
  };
  const handleBack = () => {
    navigate('/more-info');
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
