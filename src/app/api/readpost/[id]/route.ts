import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../lib/prismadb";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
	try {
		const { id } = params


		const post = await prisma.post.findUnique({
			where: {
				id: id
			}
			,
			include: {
				author: true,


			}
		})

		const postCount = await prisma.post.count({
			where:{
				id:id
			}
		})
		return NextResponse.json({ message: "Single post fetched successfully", post, postCount }, { status: 200 })
	} catch (error: any) {
		return NextResponse.json({ message: error?.message }, { status: 400 })
	}


}