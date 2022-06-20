import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { initialState as initialForm } from '../reducers/form.reducer';
import {
  CLEAR_FORM,
  resetForm, submitForm, UPDATE_FORM, validateForm,
} from './form.actions';
import { SET_LOADING } from './loading.actions';
import { RESET_STEP } from './step.actions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Form actions', () => {
  it('expected action should be dispatched on successfull form submit', () => {
    const store = mockStore({
      form: initialForm,
    });
    store.dispatch(submitForm()).then(() => {
      const actualActions = store.getActions();
      expect(actualActions).toStrictEqual([
        { type: SET_LOADING, payload: true },
        { type: SET_LOADING, payload: false },
      ]);
    });
  });

  it('expected action should be dispatched on form validation', () => {
    const store = mockStore({
      form: initialForm,
    });

    store.dispatch(validateForm(['name', 'email', 'password']));

    expect(store.getActions()).toStrictEqual([
      {
        type: UPDATE_FORM,
        payload:
          expect.objectContaining({
            name: expect.objectContaining({
              hasError: true,
            }),
            email: expect.objectContaining({
              hasError: true,
            }),
            password: expect.objectContaining({
              hasError: true,
            }),
          }),
      },
    ]);
  });

  it('expected action should be dispatched on reset form', () => {
    const store = mockStore({
      form: initialForm,
    });

    store.dispatch(resetForm());

    expect(store.getActions()).toStrictEqual([
      { type: CLEAR_FORM },
      { type: RESET_STEP },
    ]);
  });
});
