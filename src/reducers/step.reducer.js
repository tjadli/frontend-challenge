import { RESET_STEP, SET_STEP } from '../actions/step.actions';

export const initialState = 0;

export default function step(
  // eslint-disable-next-line default-param-last
  state = initialState,
  action,
) {
  switch (action.type) {
    case SET_STEP:
      return action.payload > state ? action.payload : state;

    case RESET_STEP:
      return 0;

    default:
      return state;
  }
}
