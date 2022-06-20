import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { resetForm } from '../../actions/form.actions';

import SuccessComponent from './component';

export default function Success() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleReset = () => {
    dispatch(resetForm());
    navigate('/');
  };
  return (
    <SuccessComponent
      handleReset={handleReset}
    />
  );
}
