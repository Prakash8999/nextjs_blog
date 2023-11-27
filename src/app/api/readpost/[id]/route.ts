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
			include:{
				author:true
			}
		})

		return NextResponse.json({message:"Single post fetched successfully" , post} , {status:200})
	} catch (error : any) {
		return NextResponse.json({message: error?.message} , {status:400})
	}


}