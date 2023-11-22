import {createSlice} from '@reduxjs/toolkit';
import {
  addNewNoteAction,
  deleteNoteAction,
  fetchCategoriesAction,
  fetchClientsAction,
  INotesState, setSelectedNoteAction,
  updateNoteAction
} from "../../Models";

export const notesSlice = createSlice({
  name: 'notes',
  initialState: {
    notes: [],
    categories: [],
    clients: [],
    selectedNote: null,
  } as INotesState,
  reducers: {
    fetchCategories: (state: INotesState, action: fetchCategoriesAction) => {
      // console.log(action.payload.categories)
      return {
        ...state,
        categories: action.payload.categories,
      };
    },
    fetchClients: (state: INotesState, action: fetchClientsAction) => {
      return {
        ...state,
        clients: action.payload.clients,
      };
    },
    addNewNote: (state: INotesState, action: addNewNoteAction) => {
      const notesLength = state.notes.length;
      return {
        ...state,
        notes: [
          ...state.notes,
          {
            id: notesLength ? state.notes[notesLength - 1].id + 1 : 1,
            ...action.payload.note,
          },
        ],
      };
    },
    updateExistingNote: (state: INotesState, action: updateNoteAction) => {
      return {
        ...state,
        notes: [
          ...state.notes.map(item => {
            if (item.id === action.payload.note.id) {
              return action.payload.note;
            } else {
              return item;
            }
          }),
        ],
      };
    },
    deleteExistingNote: (state: INotesState, action: deleteNoteAction) => {
      return {
        ...state,
        notes: [
          ...state.notes.filter(item => item.id !== action.payload.noteId),
        ],
      };
    },
    setSelectedNote: (state: INotesState, action: setSelectedNoteAction) => {
      return {
        ...state,
        selectedNote:action.payload.note,
      };
    },
    clearSelectedNote: (state: INotesState) => {
      return {
        ...state,
        selectedNote: null,
      };
    },

    getCategories: (state: INotesState) => {},
    getClients: (state: INotesState) => {},
  },
});

export const {
  fetchCategories,
  fetchClients,
  getClients,
  getCategories,
  deleteExistingNote,
  updateExistingNote,
  addNewNote, setSelectedNote, clearSelectedNote
} = notesSlice.actions;
export default notesSlice.reducer;
