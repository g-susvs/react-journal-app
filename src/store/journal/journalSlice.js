import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
	name: 'journal',
	initialState: {
		isSaving: false,
		messageSaved: '',
		notes: [],
		active: null,
		// active: {
		//     id: 'ABA341N',
		//     title: '',
		//     body: '',
		//     date: 1231,
		//     imgsURL: [] // https://foto1, https://foto1
		// }
	},
	reducers: {
		savingNote: state => {
			state.isSaving = true;
		},
		addNewEmtyNote: (state, action) => {
			state.notes.push(action.payload);
			state.isSaving = false;
		},
		setActiveNote: (state, action) => {
			state.active = action.payload;
			state.messageSaved = '';
		},
		setNotes: (state, action) => {
			state.notes = action.payload;
		},
		setSaving: state => {
			state.isSaving = true;
			state.messageSaved = '';
		},
		updatedNote: (state, { payload }) => {
			state.isSaving = false;
			// console.log(action.payload.id)
			state.notes = state.notes.map(note => {
				if (note.id === payload.id) {
					return payload;
				}
				return note;
			});

			// TODO: Mostror mensaje de atualización
			state.messageSaved = payload.title + ', actualizada';
		},
		setPhotosUrlToActiveNote: (state, action) => {
			state.active.imgsURL = [...state.active.imgsURL, ...action.payload];
			state.isSaving = false;
		},
		deleteNoteById: (state, { payload }) => {
			state.active = null;
			state.notes = state.notes.filter(note => note.id !== payload);
		},
		clearNotesLogout: state => {
			state.isSaving = false;
			state.messageSaved = '';
			state.notes = [];
			state.active = null;
		},
	},
});

export const {
	savingNote,
	addNewEmtyNote,
	setActiveNote,
	setNotes,
	setSaving,
	updatedNote,
	deleteNoteById,
	setPhotosUrlToActiveNote,
	clearNotesLogout,
} = journalSlice.actions;
