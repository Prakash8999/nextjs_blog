import { NextResponse } from "next/server";
import prisma from "../../../../lib/prismadb";

export async function GET(res: NextResponse) {


	try {

		const post = await prisma.post.findMany({

			select: {
				author: {
					select:{
						name:true,
						username:true,
						image:true,
						id:true
					}
				},
				content: true,
				title: true,
				createdAt: true,
				id: true,
				draft: true,
				publish: true
			}
			,
			orderBy: {
				createdAt: 'desc',
			},
		})


		return NextResponse.json({ message: "Post Fetch successfully", post }, { status: 200 })
	} catch (error) {
		return NextResponse.json({ message: error }, { status: 400 })
	}

}