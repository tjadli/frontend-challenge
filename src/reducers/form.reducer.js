import {
  RESET_FORM,
  SET_FORM_VALUE,
  UPDATE_FORM,
} from '../actions/form.actions';

export const initialState = {
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

export default function form(
  // eslint-disable-next-line default-param-last
  state = initialState,
  action,
) {
  switch (action.type) {
    case SET_FORM_VALUE:

      return {
        ...state,
        [action.payload.attribute]: {
          ...state[action.payload.attribute],
          value: action.payload.value,
          hasError: false,
        },
      };
    case UPDATE_FORM:
      return { ...state, ...action.payload };
    case RESET_FORM:
      return { ...initialState };

    default:
      return state;
  }
}
