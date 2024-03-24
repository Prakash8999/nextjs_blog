import { getAuthSession } from "@/lib/auth";
import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET() {
	try {

		const session = await getAuthSession()

		if (!session) {
			throw new Error("Unauthorized! Please Login First");
		}



		const followerCount = await prisma.user.count({
			where: {
				followingIds: {

					has: session?.user?.id
				}
			}
		})

		const postCount = await prisma.post.count({
			where: {
				authorId: session?.user?.id
			}
		})


		return NextResponse.json({ success: true, postCount, followerCount }, { status: 200 })
	} catch (error) {
		return NextResponse.json({ message: error, sucsess: false })
	}
}