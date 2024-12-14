import fs from "fs";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { join } from "path";
import { eq } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";

import { $notes, db } from "@/lib";

export async function POST(req: Request) {
	const { userId } = auth();

	if (!userId) {
		return NextResponse.json({ response: "Unauthenticated." }, { status: 403 });
	}

	// Get data | return 400, 415;
	const data = await req.formData();
	const file = data.get("file") as unknown as File;
	let noteId = data.get("noteId") as string;

	if (!file || !noteId) {
		return NextResponse.json(
			{ response: "Failed to upload file." },
			{ status: 400 },
		);
	}

	const mimeType = file.type;
	const extension = mimeType.split("/")[1];
	if (!["png", "jpg", "jpeg"].includes(extension)) {
		return NextResponse.json(
			{ response: "Unsupported file type." },
			{ status: 415 },
		);
	}

	// Check if note and image path exist | return 404;
	const notes = await db
		.select()
		.from($notes)
		.where(eq($notes.id, parseInt(noteId)));

	if (notes.length == 0)
		return NextResponse.json(
			{ response: "Note was not found" },
			{ status: 404 },
		);

	const uniqueFileName = `${uuidv4()}.${extension}`;
	const uploadDir = join(`public`, `notesImages`, `${userId}`);
	const uploadPath = join(uploadDir, `${notes[0].imageUrl}`);

	if (notes[0].imageUrl) {
		fs.access(uploadPath, fs.constants.F_OK, (err) => {
			if (err) {
				console.log(err);
			} else {
				fs.unlink(uploadPath, (err) => {
					if (err) {
						return NextResponse.json(
							{ response: "Note image was not deleted." },
							{ status: 500 },
						);
					}
				});
			}
		});
	}

	fs.promises.mkdir(uploadDir, { recursive: true });

	const bytes = await file.arrayBuffer();
	const buffer = Buffer.from(bytes);
	const pathToSave = join(uploadDir, uniqueFileName);

	try {
		await fs.promises.writeFile(pathToSave, buffer);

		await db
			.update($notes)
			.set({ imageUrl: uniqueFileName })
			.where(eq($notes.id, parseInt(noteId)));

		return NextResponse.json(
			{ response: `${uniqueFileName}` },
			{ status: 201 },
		);
	} catch (error) {
		return NextResponse.json(
			{ response: "Failed to save file." },
			{ status: 500 },
		);
	}
}
