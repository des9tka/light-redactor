import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

import {NoteType} from "@/lib";
import {noteService, SimplifiedClerkUser} from "@/services";

interface IInitialState {
	user: SimplifiedClerkUser | null;
	notes: NoteType[];
	note: NoteType | null;
	loading: boolean;
	errors: boolean | string;
}

type createdNoteType = {
	noteId: number;
	noteName: string;
	createdAt: Date;
};

const initialState: IInitialState = {
	user: null,
	notes: [],
	note: null,
	loading: false,
	errors: false,
};

const setUserInfo = createAsyncThunk<SimplifiedClerkUser, void>(
	"noteSlice/setUserId",
	async (_, {rejectWithValue}) => {
		try {
			const {data} = await noteService.getUserInfo();
			return data;
		} catch (err) {
			const typedError = err as AxiosError;
			return rejectWithValue(typedError.response?.data);
		}
	},
);

const getAllNotes = createAsyncThunk<NoteType[], void>(
	"noteSlice/getAllNotes",
	async (_, {rejectWithValue}) => {
		try {
			const {data} = await noteService.getAllNotes();
			return data;
		} catch (err) {
			const typedError = err as AxiosError;
			return rejectWithValue(typedError.response?.data);
		}
	},
);

const getNoteById = createAsyncThunk<NoteType, string>(
	"noteSlice/getNoteById",
	async (id: string, {rejectWithValue}) => {
		try {
			const {data} = await noteService.getNoteById(id);
			return data;
		} catch (err) {
			console.log(err);

			const typedError = err as AxiosError;
			return rejectWithValue(typedError.response?.data);
		}
	},
);

const createNote = createAsyncThunk<createdNoteType, string>(
	"noteSlice/createNote",
	async (name: string, {rejectWithValue}) => {
		try {
			const {data} = await noteService.createNote(name);
			return {
				noteId: data.noteId,
				noteName: name,
				createdAt: data.createdAt,
			};
		} catch (err) {
			const typedError = err as AxiosError;
			return rejectWithValue(typedError.response?.data);
		}
	},
);

const noteSlice = createSlice({
	name: "noteSlice",
	initialState,
	reducers: {},
	extraReducers: (builder) =>
		builder
			// Get All Notes;
			.addCase(getAllNotes.pending, (state) => {
				state.loading = true;
				state.errors = false;
			})
			.addCase(getAllNotes.fulfilled, (state, action) => {
				state.loading = false;
				state.notes = action.payload;
			})
			.addCase(getAllNotes.rejected, (state) => {
				state.loading = false;
				state.errors = true;
			})

			// Set UserId;
			.addCase(setUserInfo.pending, (state) => {
				state.loading = true;
				state.errors = false;
			})
			.addCase(setUserInfo.fulfilled, (state, action) => {
				state.loading = false;
				state.user = action.payload;
			})
			.addCase(setUserInfo.rejected, (state) => {
				state.loading = false;
				state.errors = true;
			})

			// Get Note by ID;
			.addCase(getNoteById.pending, (state) => {
				state.loading = true;
				state.errors = false;
			})
			.addCase(getNoteById.fulfilled, (state, action) => {
				state.loading = false;
				state.note = action.payload;
			})
			.addCase(getNoteById.rejected, (state) => {
				state.loading = false;
				state.errors = true;
			})

			// Create Note;
			.addCase(createNote.pending, (state) => {
				state.loading = true;
				state.errors = false;
			})
			.addCase(createNote.fulfilled, (state, action) => {
				if (state.user) {
					const newNote = {
						id: action.payload.noteId,
						userId: state.user.id,
						name: action.payload.noteName,
						editorState: "",
						imageUrl: null,
						createdAt: action.payload.createdAt,
					};

					state.notes.push(newNote);
					state.note = newNote;
				} else {
					state.errors = "User ID was not provided!";
				}
				state.loading = false;
			})
			.addCase(createNote.rejected, (state) => {
				state.loading = false;
				state.errors = true;
			}),
});

const {
	reducer: noteReducer,
	actions: {},
} = noteSlice;

const noteActions = {
	getAllNotes,
	setUserInfo,
	getNoteById,
	createNote,
};

export {noteReducer, noteActions};
