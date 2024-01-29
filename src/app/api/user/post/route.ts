
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/auth";
import { NextResponse } from "next/server";
import prisma from "../../../../lib/prismadb";

export async function GET() {
	try {
		const session = await getServerSession(authOptions)

		if (!session) {
			return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
		}

		const authorId = session?.user?.id
		const userPost = await prisma.post.findMany({
			where: {
				authorId: authorId
			}
			,
			orderBy:{
				createdAt:'desc'
			}, take : 5
		})
return NextResponse.json({messgae:"Your post fetch successfully", userPost} , {status:200})

	} catch (error: any) {
		return NextResponse.json({
			message: error?.message
		}, { status: 500 })
	}
}