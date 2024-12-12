import {$notes, db} from "@/lib";
import {auth} from "@clerk/nextjs/server";
import {and, eq} from "drizzle-orm";
import {NextRequest, NextResponse} from "next/server";

export async function GET(
	req: NextRequest,
	{params}: {params: {noteId: string}},
) {
	const noteId = params.noteId;

	const {userId} = auth();

	const notes = await db
		.select()
		.from($notes)
		.where(
			and(
				eq($notes.id, parseInt(noteId)),
				eq($notes.userId, userId || ""),
			),
		);

	if (notes.length > 1 || notes.length === 0) {
		return NextResponse.json({message: "Note was not found."}, {status: 404});
    }
    
    const note = notes[0]

	return NextResponse.json(note, {status: 200});
}
