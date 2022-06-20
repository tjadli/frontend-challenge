import reducer from './form.reducer';

import {
  clearForm, setFormValue, updateForm,
} from '../actions/form.actions';

const initialState = {
  name: {
    value: '',
    hasError: false,
    isRequired: true,
  },
  email: {
    value: '',
    hasError: false,
    isRequired: true,
  },
  password: {
    value: '',
    isHashed: true,
    hasError: false,
    isRequired: true,
  },
  color: {
    value: '',
    hasError: false,
    isRequired: true,
  },
  terms: {
    value: false,
    hasError: false,
  },
};

describe('Form reducer', () => {
  it('should handle setFormValue ', () => {
    expect(reducer(initialState, setFormValue({ target: { name: 'name', value: 'test' } }))).toStrictEqual(expect.objectContaining({
      name: {
        value: 'test',
        hasError: false,
        isRequired: true,
      },
    }));
    expect(reducer(initialState, setFormValue({ target: { name: 'email', value: 'test@email' } }))).toStrictEqual(expect.objectContaining({
      email: {
        value: 'test@email',
        hasError: false,
        isRequired: true,
      },
    }));
    expect(reducer(initialState, setFormValue({ target: { name: 'password', value: 'secret' } }))).toStrictEqual(expect.objectContaining({
      password: {
        value: 'secret',
        hasError: false,
        isRequired: true,
        isHashed: true,
      },
    }));
  });

  it('should handle updateForm', () => {
    const filledState = {
      name: {
        value: 'test',
        hasError: false,
        isRequired: true,
      },
      email: {
        value: 'test@test',
        hasError: false,
        isRequired: true,
      },
      password: {
        value: 'secret',
        isHashed: true,
        hasError: false,
        isRequired: true,
      },
      color: {
        value: 'blue',
        hasError: false,
        isRequired: true,
      },
      terms: {
        value: true,
        hasError: false,
      },
    };
    expect(reducer(initialState, updateForm(filledState))).toStrictEqual(filledState);
  });
  it('should handle clearForm', () => {
    const filledState = {
      name: {
        value: 'test',
        hasError: false,
        isRequired: true,
      },
      email: {
        value: 'test@test',
        hasError: false,
        isRequired: true,
      },
      password: {
        value: 'secret',
        isHashed: true,
        hasError: false,
        isRequired: true,
      },
      color: {
        value: 'blue',
        hasError: false,
        isRequired: true,
      },
      terms: {
        value: true,
        hasError: false,
      },
    };
    expect(reducer(filledState, clearForm())).toStrictEqual(initialState);
  });
});
