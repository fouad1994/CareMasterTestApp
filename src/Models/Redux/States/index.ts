import {INotesState} from './notes';

export * from './notes';

export interface IReducers {
  notes: INotesState;
}

export interface ReducersAction<Payload, Type = string> {
  type: Type;
  payload: Payload;
}
