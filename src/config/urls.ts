export const baseURL = "/api/";

export type DeleteNoteRequestType = {
	noteImgUrl: string,
	noteId: number
}

export const noteUrls = {
	getUserInfoUrl: () => "getUserInfo",
	getAllNotesUrl: () => `getAllNotes`,
	getNoteByIdUrl: (id: string) => `getNoteById/${id}`,
	createNoteUrl: () => `createNote`,
	saveNoteUrl: () => `saveNote`,
	deleteNoteUrl: (noteInfo: DeleteNoteRequestType) => `deleteNote/${noteInfo.noteId}?imageUrl=${noteInfo.noteImgUrl}`,
	uploadFileUrl: () => `uploadFile`,
	checkImageUrl: (imageUrl: string) => `checkImage?imageUrl=${imageUrl}`,
};
