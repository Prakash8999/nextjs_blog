import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismadb"

export async function GET(req:NextRequest,{ params }: { params: { id: string } }) {
	try {
		const  {id}  = params
		const author = await prisma.user.findFirst({
			where:{
				username:id
			},
			select:{
				username:true,
				image:true,
				name:true,
				bio:true,
				github:true,
				linkedin:true,
				id:true,
				Post:true
			}
		})
		return NextResponse.json({ message: "userfeeetched" , author} )
	} catch (error) {
		return NextResponse.json(error)

	}
}

