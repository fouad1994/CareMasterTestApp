import {ICategoryClient, INote} from '../../';
import {PayloadAction} from '@reduxjs/toolkit';

export type setSelectedNoteAction = PayloadAction<{
  note: INote;
}>;
export type addNewNoteAction = PayloadAction<{
  note: Omit<INote, 'id'>;
}>;

export type updateNoteAction = PayloadAction<{
  note: INote;
}>;
export type deleteNoteAction = PayloadAction<{
  noteId: number;
}>;
export type fetchCategoriesAction = PayloadAction<{
  categories: ICategoryClient[];
}>;
export type fetchClientsAction = PayloadAction<{
  clients: ICategoryClient[];
}>;
export type fetchNotesAction = PayloadAction<{
  notes: INote[] | null;
  categoryId: string;
}>;

export type removeNoteAction = PayloadAction<{
  noteId: string;
}>;

export type getNotesAction = PayloadAction<{
  categoryId: string;
}>;
export type getSelectedNoteAction = PayloadAction<{
  noteId: string;
}>;

export type NotesAction = fetchNotesAction;
