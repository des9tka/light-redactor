import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

import {NoteType} from "@/lib";
import {noteService} from "@/services";

interface IInitialState {
	userId: string | null;
	notes: NoteType[];
	note: NoteType | null;
	loading: boolean;
	errors: boolean;
}

interface ErrorResponseType {
	message: string;
	status: number;
}

const initialState: IInitialState = {
	userId: null,
	notes: [],
	note: null,
	loading: false,
	errors: false,
};

const setUserId = createAsyncThunk<string, void>(
	"noteSlice/setUserId",
	async (_, {rejectWithValue}) => {
		try {
			const {data} = await noteService.getUserId();
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

const getNoteById = createAsyncThunk<NoteType, number>(
	"noteSlice/setUserId",
	async (id, {rejectWithValue}) => {
		try {
			const {data} = await noteService.getNoteById(id);
			return data;
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
			.addCase(setUserId.pending, (state) => {
				state.loading = true;
				state.errors = false;
			})
			.addCase(setUserId.fulfilled, (state, action) => {
				state.loading = false;
				state.userId = action.payload;
			})
			.addCase(setUserId.rejected, (state) => {
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
	setUserId,
	getNoteById
};

export {noteReducer, noteActions};
