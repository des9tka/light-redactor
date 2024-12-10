import {NoteType} from "@/lib";
import {AxiosRes, axiosService} from "./axiosService";

import {noteUrls} from "@/config/urls";

const noteService = {
	getUserId: (): AxiosRes<string> => axiosService.get(noteUrls.getUserId()),

	getAllNotes: (): AxiosRes<NoteType[]> =>
		axiosService.get(noteUrls.getAllNotesUrl()),

	getNoteById: (id: number): AxiosRes<NoteType> =>
		axiosService.get(noteUrls.getNoteByIdUrl(id)),

	createNote: (note: NoteType): AxiosRes<void> =>
		axiosService.post(noteUrls.createNoteUrl(), note),

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
