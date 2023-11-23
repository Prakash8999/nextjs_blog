import { NextRequest, NextResponse } from "next/server";
import { PostValidator } from "../../../../../validators/post";
import { getServerSession } from "next-auth";

import prisma from "../../../../../lib/prismadb";
import { authOptions } from "../../../../../lib/auth";

export async function POST(request: NextRequest) {
	try {
		const body = await request.json()

		const { title, content } = PostValidator.parse(body)

		const session = await getServerSession(authOptions)
		if (!session) {
			return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
		}

		const post = await prisma.post.create({
			data: {
				title,
				content,
				authorId: session?.user?.id
			}
		})

		return NextResponse.json({ message: "post created successfully", post }, { status: 200 })

	} catch (error: any) {
		return NextResponse.json({
			message: error?.message
		}, { status: 500 })
	}

}