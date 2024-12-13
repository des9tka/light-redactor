import {NoteType} from "@/lib";
import {AxiosRes, axiosService} from "./axiosService";

import { noteUrls } from "@/config/urls";

export interface SimplifiedClerkUser {
    id: string;
    firstName: string;
    lastName: string;
}
type CreateNoteType = {
	noteId: number;
	createdAt: Date;
};

const noteService = {
	getUserInfo: (): AxiosRes<SimplifiedClerkUser> =>
		axiosService.get(noteUrls.getUserInfoUrl()),

	getAllNotes: (): AxiosRes<NoteType[]> =>
		axiosService.get(noteUrls.getAllNotesUrl()),

	getNoteById: (id: string): AxiosRes<NoteType> =>
		axiosService.get(noteUrls.getNoteByIdUrl(id)),

	createNote: (name: string): AxiosRes<CreateNoteType> =>
		axiosService.post(noteUrls.createNoteUrl(), {name}),

	saveNote: (note: NoteType): AxiosRes<void> =>
		axiosService.post(noteUrls.saveNoteUrl(), note),

	deleteNote: (id: number): AxiosRes<void> =>
		axiosService.delete(noteUrls.deleteNoteUrl(id)),

	uploadFile: (formData: FormData): AxiosRes<void> =>
		axiosService.post(noteUrls.uploadFileUrl(), formData),

	checkImageUrl: (imageUrl: string): AxiosRes<void> =>
		axiosService.post(noteUrls.checkImageUrl(imageUrl)),
};

export {noteService};
