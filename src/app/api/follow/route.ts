import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prismadb";
import { getAuthSession } from "../../../lib/auth";

export async function POST(req: NextRequest, res: NextResponse) {

	try {
		const body = await req.json()

		const { followerId } = body
		console.log(followerId);
		const session = await getAuthSession()

		if (!session) {
			return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
		}

		const followers = await prisma.followers.create({
			data: {
				// userId:userId,
				followerID: followerId,
				id: session?.user?.id


			}
		})
		return NextResponse.json({ message: 'followed succuccfully', followers }, { status: 200 })

	} catch (error: any) {
		return NextResponse.json({
			message: error.message
		}, { status: 500 })
	}

}