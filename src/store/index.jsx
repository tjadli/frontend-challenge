import thunk from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';

import { composeWithDevTools } from 'redux-devtools-extension';

import reducers from '../reducers';

export default function configureStore() {
  const middleware = [thunk];

  const store = createStore(
    reducers,
    // @ts-ignore
    composeWithDevTools(applyMiddleware(...middleware)),
  );

  return { store };
}
