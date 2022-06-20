import axios from 'axios';
import { BASE_URL } from '../utils';

export const SET_COLORS = 'SET_COLORS';

export function setColors(payload) {
  return {
    type: SET_COLORS,
    payload,
  };
}

export function loadColors() {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${BASE_URL}api/colors`);

      dispatch(setColors(data));
    } catch (error) {
      console.trace(error);
    }
  };
}
