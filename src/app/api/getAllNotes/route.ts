import {auth} from "@clerk/nextjs/server";
import {eq} from "drizzle-orm";

import {$notes, db} from "@/lib";
import {NextResponse} from "next/server";

export async function GET(req: Request) {
	const {userId} = auth();

	const notes = await db
		.select()
		.from($notes)
		.where(eq($notes.userId, userId!));

	return NextResponse.json(notes);
}
