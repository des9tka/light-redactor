import {auth} from "@clerk/nextjs/server";
import {NextResponse} from "next/server";

export async function GET(req: Request) {
	const {userId} = auth();
	return NextResponse.json(userId);
}
