// /api/createNoteBook

import {auth} from "@clerk/nextjs/server";
import {NextResponse} from "next/server";

import {db} from "@/lib";
import {$notes} from "@/lib/db/schema";

export async function POST(req: Request) {
	const {userId} = auth();

	if (!userId) {
		return new NextResponse("Unauthorized", {status: 401});
	}

	const {name} = await req.json();

	const note_info = await db
		.insert($notes)
		.values({
			name: name,
			userId: userId,
		})
		.returning({
			insertedId: $notes.id,
			createdAt: $notes.createdAt,
		});

	return NextResponse.json({
		noteId: note_info[0].insertedId,
		createdAt: note_info[0].createdAt,
	});
}
