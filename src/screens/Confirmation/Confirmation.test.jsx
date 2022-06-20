import React from 'react';

import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

import { render } from '@testing-library/react';

import { mergeWith } from 'lodash';

import { Provider } from 'react-redux';
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
  useDispatch: () => jest.fn().mockReturnValue(mockDispatch),
}));

const spySubmitForm = jest.spyOn(formActions, 'submitForm');

const createWrapper = (newState = {}) => {
  const user = userEvent.setup();

  const defaultState = {
    colors: ['blue', 'black'],
    loading: false,
    form: {
      name: { value: 'name test' },
      email: { value: 'test@test.com' },
      password: { value: 'secret', isHashed: true },
      color: { value: 'blue' },
      terms: { value: true },
    },
  };
  const state = mergeWith(defaultState, newState);
  const wrapper = render(
    <Provider store={configureMockStore(state)}>
      <BrowserRouter>
        <Component />
      </BrowserRouter>
    </Provider>,
  );
  return { wrapper, state, user };
};

describe('<Cornfirmation/>', () => {
  it('renders context values', async () => {
    const { wrapper, state: { form } } = createWrapper();

    expect(wrapper.queryByText(form.name.value)).toBeTruthy();
    expect(wrapper.queryByText(form.email.value)).toBeTruthy();
    expect(wrapper.queryByText('*'.repeat(form.password.value.length))).toBeTruthy();
    expect(wrapper.queryByText(form.color.value)).toBeTruthy();
    expect(wrapper.queryByText(form.terms.value ? 'AGREED' : 'REJECTED')).toBeTruthy();
  });

  it('calls submitFrom the Submit click', async () => {
    const { wrapper, user } = createWrapper({
      form: {
        color: { value: 'blue' },
        terms: { value: true },
      },
    });
    await user.click(wrapper.getByText('Submit'));
    expect(spySubmitForm).toHaveBeenCalled();
  });

  it('navigate on back press', async () => {
    const { wrapper, user } = createWrapper();
    await user.click(wrapper.getByText('Back'));
    expect(mockNavigation).toHaveBeenCalledWith('/more-info');
  });
});
