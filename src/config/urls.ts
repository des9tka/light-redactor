export const baseURL = "/api/";

export const noteUrls = {
	getUserId: () => "getUserId",
	getAllNotesUrl: () => `getAllNotes`,
	getNoteByIdUrl: (id: number) => `getNoteById/${id}`,
	createNoteUrl: () => `createNote`,
	saveNoteUrl: () => `saveNote`,
	deleteNoteUrl: (id: number) => `deleteNote/${id}`,
	uploadFileUrl: () => `uploadFile`,
	checkImageUrl: (imageUrl: string) => `checkImage?imageUrl=${imageUrl}`,
};
