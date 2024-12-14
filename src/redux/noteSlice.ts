import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import { NoteType } from "@/lib";
import {
	noteService,
	SimplifiedClerkUser,
	CheckImageResponseType,
	SaveNoteRequestType,
	SimpleNoteResponsetType
} from "@/services";

import { DeleteNoteRequestType } from "@/config"

interface IInitialState {
	user: SimplifiedClerkUser | null;
	notes: NoteType[];
	note: NoteType | null;
	loading: boolean;
	errors: boolean | string;
}

type CreatedNoteResponseType = {
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
	async (_, { rejectWithValue }) => {
		try {
			const { data } = await noteService.getUserInfo();
			return data;
		} catch (err) {
			const typedError = err as AxiosError;
			return rejectWithValue(typedError.response?.data);
		}
	},
);

const getAllNotes = createAsyncThunk<NoteType[], void>(
	"noteSlice/getAllNotes",
	async (_, { rejectWithValue }) => {
		try {
			const { data } = await noteService.getAllNotes();
			const validateImageNotes = await Promise.all(
				data.map(async (note) => {
					const { data } = await noteService.checkImage(
						note.imageUrl ? note.imageUrl : null,
					);
					note.imageUrl = data.isExist ? note.imageUrl : null;
					return note;
				}),
			);
			return validateImageNotes;
		} catch (err) {
			const typedError = err as AxiosError;
			return rejectWithValue(typedError.response?.data);
		}
	},
);

const getNoteById = createAsyncThunk<NoteType, string>(
	"noteSlice/getNoteById",
	async (id: string, { rejectWithValue }) => {
		try {
			const { data } = await noteService.getNoteById(id);
			return data;
		} catch (err) {
			console.log(err);

			const typedError = err as AxiosError;
			return rejectWithValue(typedError.response?.data);
		}
	},
);

const createNote = createAsyncThunk<CreatedNoteResponseType, string>(
	"noteSlice/createNote",
	async (name: string, { rejectWithValue }) => {
		try {
			const { data } = await noteService.createNote(name);
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

const checkNoteImage = createAsyncThunk<CheckImageResponseType, string | null>(
	"noteSlice/checkNoteImage",
	async (noteUrl: string | null, { rejectWithValue }) => {
		try {
			const { data } = await noteService.checkImage(noteUrl);
			return data;
		} catch (err) {
			const typedError = err as AxiosError;
			return rejectWithValue(typedError.response?.data);
		}
	},
);

const saveNoteById = createAsyncThunk<SaveNoteRequestType, SaveNoteRequestType>(
	"noteSlice/saveNoteById",
	async (noteInfo, { rejectWithValue }) => {
		try {
			await noteService.saveNote(noteInfo);
			return noteInfo;
		} catch (err) {
			const typedError = err as AxiosError;
			return rejectWithValue(typedError.response?.data);
		}
	},
);


const deleteNoteById = createAsyncThunk<number, DeleteNoteRequestType>(
	"noteSlice/deleteNoteById",
	async (noteInfo, { rejectWithValue }) => {
		try {
			await noteService.deleteNote(noteInfo);
			return noteInfo.noteId;
		} catch (err) {
			const typedError = err as AxiosError;
			return rejectWithValue(typedError.response?.data);
		}
	},
);

const uploadFileNote = createAsyncThunk<{ noteId: string, noteImgUrl: string }, FormData>(
	"noteSlice/uploadFileNote",
	async (formData, { rejectWithValue }) => {
		try {
			const { data } = await noteService.uploadFile(formData);
			const noteId = formData.get('noteId') as string;
			const noteImgUrl = data.response;
			return { noteId, noteImgUrl };
		} catch (err) {
			const typedError = err as AxiosError;
			return rejectWithValue(typedError.response?.data);
		}
	},
);

const noteSlice = createSlice({
	name: "noteSlice",
	initialState,
	reducers: {
		getStateNoteById: (state, action: PayloadAction<{ noteId: string }>) => {
			const note = state.notes.find(note => note.id === parseInt(action.payload.noteId));
			if (note) {
				state.note = note;
			}
		}
	},
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
			})

			// Save Note State;
			.addCase(saveNoteById.pending, (state) => {
				// state.loading = true;
				state.errors = false;
			})
			.addCase(saveNoteById.fulfilled, (state, action) => {
				state.loading = false;
				state.notes.map((note) => {
					if (note.id === action.payload.noteId) {
						note.editorState = action.payload.editorState;
					}
				})
			})
			.addCase(saveNoteById.rejected, (state) => {
				state.loading = false;
				state.errors = true;
			})

			// Delete Note by ID;
			.addCase(deleteNoteById.pending, (state) => {
				// state.loading = true;
				state.errors = false;
			})
			.addCase(deleteNoteById.fulfilled, (state, action) => {
				state.loading = false;
				state.notes = state.notes.filter((note) => note.id !== action.payload)
			})
			.addCase(deleteNoteById.rejected, (state) => {
				state.loading = false;
				state.errors = true;
			})

			// Delete Note by ID;
			.addCase(uploadFileNote.pending, (state) => {
				// state.loading = true;
				state.errors = false;
			})
			.addCase(uploadFileNote.fulfilled, (state, action) => {
				const noteId = action.payload.noteId
				const imageUrl = action.payload.noteImgUrl
				state.loading = false;
				state.notes.map((note) => {
					if (note.id == parseInt(noteId)) note.imageUrl = imageUrl;
				})
			})
			.addCase(uploadFileNote.rejected, (state) => {
				state.loading = false;
				state.errors = true;
			})
});

const {
	reducer: noteReducer,
	actions: { getStateNoteById }
} = noteSlice;

const noteActions = {
	getStateNoteById,
	getAllNotes,
	setUserInfo,
	getNoteById,
	createNote,
	checkNoteImage,
	saveNoteById,
	deleteNoteById,
	uploadFileNote
};

export { noteReducer, noteActions };
