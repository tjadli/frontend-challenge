import { SET_COLORS } from '../actions/colors.actions';

export const initialState = [];

export default function form(
  // eslint-disable-next-line default-param-last
  state = initialState,
  action,
) {
  switch (action.type) {
    case SET_COLORS:

      return [...action.payload];

    default:
      return state;
  }
}
