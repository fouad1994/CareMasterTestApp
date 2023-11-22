import {ICategoryClient, INote} from '../../';

export interface INotesState {
  selectedNote: INote | null;
  notes: INote[];
  clients: ICategoryClient[];
  categories: ICategoryClient[];
}
