import React from 'react';
import { useDispatch } from 'react-redux';
import { resetForm } from '../../actions/form.actions';

import ErrorComponent from './component';

export default function Error() {
  const dispatch = useDispatch();
  const handleReset = () => {
    dispatch(resetForm());
  };
  return (
    <ErrorComponent handleReset={handleReset} />
  );
}
