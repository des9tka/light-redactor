import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";
import fs from "fs";

import { $notes, db } from "@/lib";


export async function PATCH(req: NextRequest, { params }: { params: { noteId: string } }) {

	const noteImageUrl = req.nextUrl.searchParams.get("imageUrl");
	const noteId = params.noteId;

	const { userId } = auth();

	if (noteImageUrl) {
		const imgPath = join(
			`public`,
			`notesImages`,
			`${userId}`,
			`${noteImageUrl}`,
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
			{ response: "Note was deleted." },
			{ status: 200 },
		);
	} catch (error) {
		return NextResponse.json(
			{ response: "Note was not deleted." },
			{ status: 404 },
		);
	}
}
