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

	const body = await req.json();

	const note_ids = await db
		.insert($notes)
		.values({
			name: body.name,
			userId: userId,
		})
		.returning({
			insertedId: $notes.id,
		});

	return NextResponse.json({
		note_id: note_ids[0].insertedId,
	});
}
