import React from 'react';

import { useFormContext } from '../../context/FormContext';

import ErrorComponent from './component';

export default function Error() {
  const { resetForm } = useFormContext();

  return (
    <ErrorComponent handleReset={resetForm} />
  );
}
