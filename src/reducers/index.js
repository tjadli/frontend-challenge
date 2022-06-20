import { combineReducers } from 'redux';

import form from './form.reducer';
import colors from './colors.reducer';
import loading from './loading.reducer';
import step from './step.reducer';

export default combineReducers({
  form,
  colors,
  loading,
  step,
});
