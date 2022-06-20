import axios from 'axios';
import { BASE_URL } from '../utils';
import { setLoading } from './loading.actions';
import { resetStep } from './step.actions';

export const SET_FORM_VALUE = 'SET_FORM_VALUE';
export const UPDATE_FORM = 'UPDATE_FORM';
export const RESET_FORM = 'RESET_FORM';

export function setFormValue({
  target: {
    name, type, checked, value,
  },
}) {
  let formattedValue = value;

  if (type === 'checkbox') {
    formattedValue = checked;
  }

  return {
    type: SET_FORM_VALUE,
    payload: {
      attribute: name,
      value: formattedValue,
    },
  };
}

export function updateForm(form) {
  return {
    type: UPDATE_FORM,
    payload: form,
  };
}

export const validateForm = (attrs) => (dispatch, getState) => {
  const validatedForm = { ...getState().form };
  let valid = true;

  attrs.forEach((attribute) => {
    if (validatedForm[attribute].isRequired && !validatedForm[attribute].value) {
      validatedForm[attribute].hasError = true;
      valid = false;
    }
  });

  dispatch(updateForm(validatedForm));
  return valid;
};

export const submitForm = () => async (dispatch, getState) => {
  try {
    const { form } = getState();
    const payload = Object.keys(getState().form).reduce((acc, red) => {
      acc[red] = form[red].value;
      return acc;
    }, {});
    dispatch(setLoading(true));
    await axios.post(`${BASE_URL}api/submit`, payload);
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setLoading(false));
    console.trace(error);
    throw error;
  }
};

const clearForm = () => ({
  type: RESET_FORM,
});
export const resetForm = () => (dispatch) => {
  dispatch(clearForm());
  dispatch(resetStep());
};
