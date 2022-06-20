import React from 'react';

import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

import {
  findByText, queryByText, render, screen,
} from '@testing-library/react';

import { mergeWith } from 'lodash';

import { Provider } from 'react-redux';
import Home from './index';
import { configureMockStore } from '../../../jest/helpers';
import * as formActions from '../../actions/form.actions';

const spySetFormValue = jest.spyOn(formActions, 'setFormValue');
const spyValidateForm = jest.spyOn(formActions, 'validateForm');

const mockNavigation = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigation,
}));
const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
}));

const createWrapper = (newState = {}) => {
  const user = userEvent.setup();

  const defaultState = {
    colors: [],
    form: {
      name: { value: '' },
      email: { value: '' },
      password: { value: '' },
    },
  };
  const state = mergeWith(defaultState, newState);
  const wrapper = render(
    <Provider store={configureMockStore(state)}>
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    </Provider>,

  );
  return { wrapper, state, user };
};

describe('<Home/>', () => {
  it('renders default context values', () => {
    const { wrapper, state: { form } } = createWrapper();

    const nameValue = wrapper.getByPlaceholderText('Name').getAttribute('value');
    const emailValue = wrapper.getByPlaceholderText('Email').getAttribute('value');
    const passwordValue = wrapper.getByPlaceholderText('Password').getAttribute('value');

    expect(nameValue).toBe(form.name.value);
    expect(emailValue).toBe(form.email.value);
    expect(passwordValue).toBe(form.password.value);
  });

  it('renders updated context values', () => {
    const { wrapper, state: { form } } = createWrapper({
      form: {
        name: { value: 'test name' },
        email: { value: 'test@example.com' },
        password: { value: 'secret' },
      },
    });

    const nameValue = wrapper.getByPlaceholderText('Name').getAttribute('value');
    const emailValue = wrapper.getByPlaceholderText('Email').getAttribute('value');
    const passwordValue = wrapper.getByPlaceholderText('Password').getAttribute('value');

    expect(nameValue).toBe(form.name.value);
    expect(emailValue).toBe(form.email.value);
    expect(passwordValue).toBe(form.password.value);
  });

  it('renders errors ', async () => {
    const { wrapper } = createWrapper({
      form: {
        name: { hasError: true },
        email: { hasError: true },
        password: { hasError: true },
      },
    });

    const nameWrapper = screen.getByPlaceholderText('Name').closest('div');
    const emailWrapper = wrapper.getByPlaceholderText('Email').closest('div');
    const passwordWrapper = wrapper.getByPlaceholderText('Password').closest('div');

    expect(await findByText(nameWrapper, 'This is a required field')).toBeTruthy();
    expect(await findByText(emailWrapper, 'This is a required field')).toBeTruthy();
    expect(await findByText(passwordWrapper, 'This is a required field')).toBeTruthy();
  });

  it('doens\'t render errors', () => {
    const { wrapper } = createWrapper({
      form: {
        name: {
          hasError: false,
        },
        email: {
          hasError: false,
        },
        password: {
          hasError: false,
        },
      },
    });

    const nameWrapper = screen.getByPlaceholderText('Name').closest('div');
    const emailWrapper = wrapper.getByPlaceholderText('Email').closest('div');
    const passwordWrapper = wrapper.getByPlaceholderText('Password').closest('div');
    console.log(passwordWrapper.innerHTML);
    expect(queryByText(nameWrapper, 'This is a required field')).toBeFalsy();
    expect(queryByText(emailWrapper, 'This is a required field')).toBeFalsy();
    expect(queryByText(passwordWrapper, 'This is a required field')).toBeFalsy();
  });

  it('calls setFormValue on name input change', async () => {
    const { wrapper, user } = createWrapper();

    const nameInput = wrapper.getByPlaceholderText('Name');

    await user.type(nameInput, 'Update name');
    expect(spySetFormValue).toHaveBeenCalled();
  });
  it('calls setFormValue on email input change', async () => {
    const { wrapper, user } = createWrapper();

    const emailInput = wrapper.getByPlaceholderText('Email');

    await user.type(emailInput, 'Update email');
    expect(spySetFormValue).toHaveBeenCalled();
  });

  it('calls setFormValue on password input change', async () => {
    const { wrapper, user } = createWrapper();

    const passwordInput = wrapper.getByPlaceholderText('Password');

    await user.type(passwordInput, 'Update password');
    expect(spySetFormValue).toHaveBeenCalled();
  });

  it('validate the form onSubmit', async () => {
    const { wrapper, user } = createWrapper({
      form: {
        name: { value: 'test name' },
        email: { value: 'test@example.com' },
        password: { value: 'secret' },
      },
    });
    await user.click(wrapper.getByText('Next'));
    expect(spyValidateForm).toHaveBeenCalled();
  });

  it('navigate if validaiton is successfull', async () => {
    const { wrapper, user } = createWrapper({
      form: {
        name: { value: 'test name' },
        email: { value: 'test@example.com' },
        password: { value: 'secret' },
      },
    });
    mockDispatch.mockImplementationOnce(() => true);
    await user.click(wrapper.getByText('Next'));
    expect(mockNavigation).toHaveBeenCalledWith('/more-info');
  });

  it("doesn't navigate if form is not valid", async () => {
    const { wrapper, user } = createWrapper({
      form: {
        name: { value: 'test name' },
        email: { value: 'test@example.com' },
        password: { value: '' },
      },
    });
    mockDispatch.mockImplementationOnce(() => false);
    await user.click(wrapper.getByText('Next'));
    expect(mockNavigation).not.toHaveBeenCalled();
  });
});
