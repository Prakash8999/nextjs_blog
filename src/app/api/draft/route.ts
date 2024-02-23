import prisma from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	try {
		const searchParams = req.nextUrl.searchParams

		const userId  = searchParams.get('userId')


		if (!userId) {
            throw new Error("userId is missing in the request");
        }
		const draftPost = await prisma.post.findMany({
			where: {
				authorId: userId,
				draft: true
			},
			include: {
				author: true
			}
		})

		return NextResponse.json({ message: "Draft Message Fetch", draftPost }, { status: 200 })

	} catch (error) {
		console.log(error);
		return NextResponse.json({ message: error }, { status: 200 })

	}

}