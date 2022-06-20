import React from 'react';

import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import {
  findByText, queryByText, render, screen,
} from '@testing-library/react';

import { mergeWith } from 'lodash';

import Component from './index';
import * as formActions from '../../actions/form.actions';
import { configureMockStore } from '../../../jest/helpers';

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

const spySetFormValue = jest.spyOn(formActions, 'setFormValue');
const spyValidateForm = jest.spyOn(formActions, 'validateForm');

const createWrapper = (updatedState = {}) => {
  const user = userEvent.setup();

  const defaultState = {
    colors: ['blue', 'black'],
    form: {
      color: { value: '' },
      terms: { value: false },
    },

  };

  const wrapper = render(
    <Provider store={configureMockStore(mergeWith(defaultState, updatedState))}>
      <BrowserRouter>
        <Component />
      </BrowserRouter>
    </Provider>,
  );
  return { wrapper, user };
};

describe('<MoreInfo/>', () => {
  it('renders default context values', async () => {
    createWrapper();

    expect(screen.getByRole('checkbox')).not.toBeChecked();
    expect(screen.getByRole('option', { selected: true }).textContent).toBe('Select your favorite color');
  });

  it('renders updated context values', () => {
    createWrapper({
      form: {
        color: { value: 'blue' },
        terms: { value: true },
      },
    });

    expect(screen.getByRole('checkbox')).toBeChecked();
    expect(screen.getByRole('option', { selected: true }).textContent).toBe('blue');
  });

  it('renders errors context values', async () => {
    createWrapper({
      form: {
        color: { hasError: true },
        terms: { hasError: true },
      },
    });

    const colorWrapper = screen.getByRole('option', { selected: true }).closest('div');
    const termsWrapper = screen.getByRole('checkbox').closest('.mb-3');

    expect(await findByText(colorWrapper, 'This is a required field')).toBeTruthy();
    expect(await findByText(termsWrapper, 'You have to accept the terms and conditions')).toBeTruthy();
  });

  it('doens\'t render errors context values', () => {
    createWrapper();

    const colorWrapper = screen.getByRole('option', { selected: true }).closest('div');
    const termsWrapper = screen.getByRole('checkbox').closest('.mb-3');

    expect(findByText(colorWrapper, 'This is a required field')).toBeFalsy();
    expect(queryByText(termsWrapper, 'You have to accept the terms and conditions')).toBeFalsy();
  });

  it('calls setFormValue on color select change', async () => {
    const { wrapper, user } = createWrapper();

    const colorSelect = wrapper.getByRole('combobox');

    await user.selectOptions(colorSelect, 'blue');
    expect(spySetFormValue).toHaveBeenCalled();
  });

  it('calls setFormValue on terms checkbox change', async () => {
    const { wrapper, user } = createWrapper();

    const colorCheckbox = wrapper.getByRole('checkbox');

    await user.click(colorCheckbox);
    expect(spySetFormValue).toHaveBeenCalled();
  });

  it('validate the form onSubmit', async () => {
    const { wrapper, user } = createWrapper({
      form: {
        color: { value: 'blue' },
        terms: { value: true },
      },
    });
    await user.click(wrapper.getByText('Next'));
    expect(spyValidateForm).toHaveBeenCalled();
  });

  it('navigate on back press', async () => {
    const { wrapper, user } = createWrapper({
      form: {
        name: { value: 'test name' },
        email: { value: 'test@example.com' },
        password: { value: 'secret' },
      },
    });
    await user.click(wrapper.getByText('Back'));
    expect(mockNavigation).toHaveBeenCalledWith('/');
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
    expect(mockNavigation).toHaveBeenCalledWith('/confirmation');
  });

  it("doesn't navigate if form is not valid", async () => {
    const { wrapper, user } = createWrapper({
      form: {
        name: { value: 'test name' },
        email: { value: 'test@example.com' },
        password: { value: 'secret' },
      },
    });
    mockDispatch.mockImplementationOnce(() => false);
    await user.click(wrapper.getByText('Next'));
    expect(mockNavigation).not.toHaveBeenCalled();
  });
});
