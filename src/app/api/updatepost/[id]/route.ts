import { NextRequest, NextResponse } from "next/server";
import { PostValidator } from "../../../../../validators/post";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prismadb";

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
	try {

		const { id } = params;

		const body = await request.json()
		const { title, content, publish, draft, coverPhoto, tags , category} = PostValidator.parse(body);


		const session = await getServerSession(authOptions);
		if (!session) {
			return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
		}

		const updatedPost = await prisma.post.update({
			where: {
				id: id
			},
			data: {
				title,
				content,
				publish,
				draft,
				coverPhoto,
				tags,
				category
			}
		})

		return NextResponse.json({ Message: "Post Updated Successfully", updatedPost }, { status: 200 })

	} catch (error: any) {
		return NextResponse.json({
			message: error
		}, { status: 500 })
	}

}