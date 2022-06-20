import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';

import { initialState as initialColors } from '../reducers/colors.reducer';
import { loadColors, SET_COLORS } from './colors.actions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock('axios');

describe('Colors actions', () => {
  it('expected action should be dispatched on successfull loadColors', async () => {
    const store = mockStore({
      colors: initialColors,
    });
    axios.get.mockResolvedValue({ data: ['blue', 'black'] });
    await store.dispatch(loadColors());

    const actualActions = store.getActions();
    expect(actualActions).toStrictEqual([
      { type: SET_COLORS, payload: ['blue', 'black'] },
    ]);
  });

  it('expected action should be dispatched on failled loadColors', async () => {
    const store = mockStore({
      colors: initialColors,
    });

    axios.get.mockImplementation(() => Promise.reject(new Error('Failed request')));
    await store.dispatch(loadColors());

    const actualActions = store.getActions();
    expect(actualActions).toStrictEqual([]);
  });
});
