import {auth} from "@clerk/nextjs/server";
import {eq} from "drizzle-orm";

import {$notes, db} from "@/lib";
import {NextRequest, NextResponse} from "next/server";

export async function GET(req: NextRequest) {
	console.log(req.nextUrl);

	return NextResponse.json('');
}
