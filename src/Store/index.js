import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { playersReducer } from './playersReducer';
import { gameTypeReducer } from './gameTypeReducer';

const rootReducer = combineReducers({
  players: playersReducer,
  gameType: gameTypeReducer,
});

export const store = createStore(rootReducer, composeWithDevTools());
