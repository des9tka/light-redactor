export const baseURL = "/api/";

export const noteUrls = {
	getUserInfoUrl: () => "getUserInfo",
	getAllNotesUrl: () => `getAllNotes`,
	getNoteByIdUrl: (id: string) => `getNoteById/${id}`,
	createNoteUrl: () => `createNote`,
	saveNoteUrl: () => `saveNote`,
	deleteNoteUrl: (id: number) => `deleteNote/${id}`,
	uploadFileUrl: () => `uploadFile`,
	checkImageUrl: (imageUrl: string) => `checkImage?imageUrl=${imageUrl}`,
};
