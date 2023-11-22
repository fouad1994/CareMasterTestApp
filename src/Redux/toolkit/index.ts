export * from './notesState';

import notesState from './notesState';

import {combineReducers} from 'redux';
import {IReducers} from '../../Models';

const rootReducer = combineReducers<IReducers>({
  notes: notesState,
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
