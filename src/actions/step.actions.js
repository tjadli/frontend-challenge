export const SET_STEP = 'SET_STEP';
export const RESET_STEP = 'RESET_STEP';

export const setStep = (payload) => ({
  type: SET_STEP,
  payload,
});

export const resetStep = () => ({
  type: RESET_STEP,
});
