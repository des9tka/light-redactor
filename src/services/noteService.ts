import { NoteType } from "@/lib";
import { AxiosRes, axiosService } from "./axiosService";

import { noteUrls, DeleteNoteRequestType } from "@/config/urls";

export interface SimplifiedClerkUser {
	id: string;
	firstName: string;
	lastName: string;
}

export type CreateNoteResponseType = {
	noteId: number;
	createdAt: Date;
};

export type CheckImageResponseType = {
	isExist: boolean;
};

export type SaveNoteRequestType = {
	noteId: number;
	editorState: string;
};

export type SimpleNoteResponsetType = {
	response: string
}

const noteService = {
	getUserInfo: (): AxiosRes<SimplifiedClerkUser> =>
		axiosService.get(noteUrls.getUserInfoUrl()),

	getAllNotes: (): AxiosRes<NoteType[]> =>
		axiosService.get(noteUrls.getAllNotesUrl()),

	getNoteById: (id: string): AxiosRes<NoteType> =>
		axiosService.get(noteUrls.getNoteByIdUrl(id)),

	createNote: (name: string): AxiosRes<CreateNoteResponseType> =>
		axiosService.post(noteUrls.createNoteUrl(), { name }),

	saveNote: (noteInfo: SaveNoteRequestType): AxiosRes<void> =>
		axiosService.post(noteUrls.saveNoteUrl(), noteInfo),

	deleteNote: (noteinfo: DeleteNoteRequestType): AxiosRes<SimpleNoteResponsetType> =>
		axiosService.patch(noteUrls.deleteNoteUrl(noteinfo)),

	uploadFile: (formData: FormData): AxiosRes<SimpleNoteResponsetType> =>
		axiosService.post(noteUrls.uploadFileUrl(), formData),

	checkImage: (imageUrl: string | null): AxiosRes<CheckImageResponseType> =>
		axiosService.get(noteUrls.checkImageUrl(imageUrl ? imageUrl : 'url')),
};

export { noteService };
