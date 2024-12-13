import {clerk} from "@/lib";
import {auth} from "@clerk/nextjs/server";
import {NextResponse} from "next/server";

export async function GET(req: Request) {
	const {userId} = auth();
	if (userId) {
		const userInfo = await clerk.users.getUser(userId);
		return NextResponse.json(userInfo, {status: 200});
	} else return NextResponse.json("User ID was not provided or User is not authorized.", {status: 404});
}
