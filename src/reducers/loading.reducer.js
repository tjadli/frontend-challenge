import { SET_LOADING } from '../actions/loading.actions';

export const initialState = false;

export default function loading(
  // eslint-disable-next-line default-param-last
  state = initialState,
  action,
) {
  switch (action.type) {
    case SET_LOADING:

      return action.payload;

    default:
      return state;
  }
}
