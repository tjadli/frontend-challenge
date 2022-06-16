import React from 'react';
import { render } from '@testing-library/react';

import axios from 'axios';

import { BrowserRouter } from 'react-router-dom';

import FormContextProvider, {
  useFormContext,
} from './FormContext';

import { BASE_URL } from '../utils';

jest.mock('axios');

const createWrapper = () => {
  const returnVal = {};
  function ExpectationComponent() {
    Object.assign(returnVal, useFormContext());

    return null;
  }

  render(
    // eslint-disable-next-line
    <BrowserRouter>
      <FormContextProvider>
        <ExpectationComponent />
      </FormContextProvider>
    </BrowserRouter>,
  );
  return returnVal;
};
describe('FormContext', () => {
  const colors = ['red', 'blue'];
  beforeEach(() => {
    axios.get.mockResolvedValue(colors);
  });
  it('default values', () => {
    const { form } = createWrapper();

    expect(form).toStrictEqual(expect.objectContaining({
      color: { value: '', hasError: false },
      name: { value: '', hasError: false },
      email: { value: '', hasError: false },
      password: { value: '', hasError: false, isHashed: true },
      terms: { value: false, hasError: false },
    }));
  });

  it('call api to load colors', async () => {
    createWrapper();
    expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}api/colors`);
  });
});
