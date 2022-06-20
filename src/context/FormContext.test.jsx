import React from 'react';

import axios from 'axios';

import { BrowserRouter } from 'react-router-dom';

import { act, renderHook } from '@testing-library/react-hooks';

import FormContextProvider, {
  useFormContext,
} from './FormContext';

import { BASE_URL } from '../utils';

const mockNavigation = jest.fn().mockImplementation(() => {});

jest.mock('axios');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigation,
}));

const initialState = {
  name: { value: '', hasError: false, isRequired: true },
  email: { value: '', hasError: false, isRequired: true },
  password: {
    value: '', hasError: false, isRequired: true, isHashed: true,
  },
  color: { value: '', hasError: false, isRequired: true },
  terms: { value: false, hasError: false },
};

const createWrapper = async () => {
  const wrapper = ({ children }) => (
    <BrowserRouter>
      <FormContextProvider>{children}</FormContextProvider>
    </BrowserRouter>
  );

  const { result } = await renderHook(() => useFormContext(), { wrapper });

  return result;
};
describe('FormContext', () => {
  const colorsResponse = ['red', 'blue'];
  beforeEach(() => {
    axios.get.mockResolvedValue({ data: colorsResponse });
  });

  it('default values', async () => {
    let context;
    await act(async () => {
      context = await createWrapper();
    });

    expect(context.current.form).toStrictEqual(expect.objectContaining(initialState));
  });

  it('call api to load colors', async () => {
    let context;
    await act(async () => {
      context = await createWrapper();
    });

    expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}api/colors`);
    expect(context.current.colors).toBe(colorsResponse);
  });

  it('update form when setFormValue is called', async () => {
    let context;

    await act(async () => {
      context = await createWrapper();
    });

    act(() => {
      context.current.setFormValue({ target: { name: 'name', value: 'test name' } });
    });

    act(() => {
      context.current.setFormValue({ target: { name: 'email', value: 'test@test' } });
    });

    act(() => {
      context.current.setFormValue({ target: { name: 'password', value: 'secret' } });
    });

    act(() => {
      context.current.setFormValue({ target: { name: 'color', value: 'blue' } });
    });

    act(() => {
      context.current.setFormValue({ target: { name: 'terms', checked: true, type: 'checkbox' } });
    });

    expect(context.current.form.name.value).toBe('test name');
    expect(context.current.form.name.hasError).toBeFalsy();

    expect(context.current.form.email.value).toBe('test@test');
    expect(context.current.form.email.hasError).toBeFalsy();

    expect(context.current.form.password.value).toBe('secret');
    expect(context.current.form.password.hasError).toBeFalsy();

    expect(context.current.form.color.value).toBe('blue');
    expect(context.current.form.color.hasError).toBeFalsy();

    expect(context.current.form.terms.value).toBeTruthy();
    expect(context.current.form.terms.hasError).toBeFalsy();
  });

  it('reset the from to initial values when resetForm is called', async () => {
    let context;

    await act(async () => {
      context = await createWrapper();
    });

    act(() => {
      context.current.setFormValue({ target: { name: 'name', value: 'test name' } });
    });
    act(() => {
      context.current.setFormValue({ target: { name: 'email', value: 'test@test' } });
    });
    act(() => {
      context.current.setFormValue({ target: { name: 'password', value: 'secret' } });
    });
    act(() => {
      context.current.setFormValue({ target: { name: 'color', value: 'blue' } });
    });
    act(() => {
      context.current.setFormValue({ target: { name: 'terms', value: true } });
    });

    expect(context.current.form).not.toStrictEqual(expect.objectContaining(initialState));

    act(() => {
      context.current.resetForm();
    });
    expect(context.current.form).toStrictEqual(expect.objectContaining(initialState));
  });

  it('calls API on form submit and navigate to success screen', async () => {
    axios.post.mockResolvedValue();

    let context;
    await act(async () => {
      context = await createWrapper();
    });
    act(() => {
      context.current.setFormValue({ target: { name: 'name', value: 'test name' } });
    });

    act(() => {
      context.current.setFormValue({ target: { name: 'email', value: 'test@test' } });
    });

    act(() => {
      context.current.setFormValue({ target: { name: 'password', value: 'secret' } });
    });

    act(() => {
      context.current.setFormValue({ target: { name: 'color', value: 'blue' } });
    });

    act(() => {
      context.current.setFormValue({ target: { name: 'terms', checked: true, type: 'checkbox' } });
    });

    await act(async () => {
      await context.current.submitForm();
    });

    expect(axios.post).toHaveBeenCalledWith(`${BASE_URL}api/submit`, {
      name: 'test name',
      email: 'test@test',
      password: 'secret',
      color: 'blue',
      terms: true,
    });

    expect(mockNavigation).toHaveBeenCalledWith('/success');
  });

  it('navigate to error screen', async () => {
    axios.post.mockImplementation(() => Promise.reject());

    let context;
    await act(async () => {
      context = await createWrapper();
    });
    await act(async () => {
      await context.current.submitForm();
    });

    expect(mockNavigation).toHaveBeenCalledWith('/error');
  });
});
