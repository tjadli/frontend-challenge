/* eslint-disable import/prefer-default-export */
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';

import { merge } from 'lodash';

import { initialState as form } from '../src/reducers/form.reducer';

export function configureMockStore(state) {
  const middlewares = [thunk];
  const mockStore = configureStore(middlewares);

  const initialState = {
    form,
  };

  return mockStore(merge(initialState, state));
}
