import React from 'react';

import { useFormContext } from '../../context/FormContext';
import SuccessComponent from './component';

export default function Success() {
  const { resetForm } = useFormContext();

  return (
    <SuccessComponent
      handleReset={resetForm}
    />
  );
}
