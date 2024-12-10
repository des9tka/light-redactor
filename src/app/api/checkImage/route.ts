import {auth} from "@clerk/nextjs/server";
import {NextRequest, NextResponse} from "next/server";

import fs from "fs/promises";

export async function GET(req: NextRequest) {
	const {userId} = auth();

    const imageUrl = req.nextUrl.searchParams.get("imageUrl");

	const filePath = `public/notesImages/${userId}/${imageUrl}`;

	try {
		await fs.access(filePath);
		return NextResponse.json({isExist: true});
	} catch (err) {
		return NextResponse.json({isExist: false});
	}
}
