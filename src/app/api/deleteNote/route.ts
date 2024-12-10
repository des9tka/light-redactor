import {$notes, db} from "@/lib";
import {auth} from "@clerk/nextjs/server";
import {eq} from "drizzle-orm";
import {NextResponse} from "next/server";
import {join} from "path";
import fs from "fs";

export async function PATCH(req: Request) {
	const {noteId, noteImgUrl} = await req.json();
		
	const { userId } = auth();

	if (noteImgUrl) {
		const imgPath = join(
			`public`,
			`notesImages`,
			`${userId}`,
			`${noteImgUrl}`,
		);

		fs.access(imgPath, fs.constants.F_OK, (err) => {
			if (err) {
				console.log("Image is not exist!");
			} else {
				fs.unlink(imgPath, (err) => console.log(err));
			}
		});
	}

	try {
		await db.delete($notes).where(eq($notes.id, parseInt(noteId)));

		return NextResponse.json(
			{response: "Note was deleted."},
			{status: 200},
		);
	} catch (error) {
		return NextResponse.json(
			{response: "Note was not deleted."},
			{status: 404},
		);
	}
}
