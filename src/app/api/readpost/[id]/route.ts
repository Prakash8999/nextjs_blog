import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prismadb";

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



// import { NextRequest, NextResponse } from "next/server";
// import prisma from "../../../../../lib/prismadb";
// import { redisClient } from "@/lib/redis";

// export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
// 	try {
// 		const { id } = params
// 		const cachedValue = await redisClient.get("singlepost")
// 		if (cachedValue) {
// 			console.log('Single Data from redis');
// 			const parsedCachedValue = JSON.parse(cachedValue)
// 			return NextResponse.json({ message: "Single post fetched successfully", post: parsedCachedValue }, { status: 200 })

// 		}


// 		const post = await prisma.post.findUnique({
// 			where: {
// 				id: id
// 			}
// 			,
// 			include: {
// 				author: true,


// 			}
// 		})

// 		const postCount = await prisma.post.count({
// 			where: {
// 				id: id
// 			}
// 		})
// 		console.log('Database was queried');
// 		let num = 0;
// 		await redisClient.set(`singlepost:${num+1}`, JSON.stringify(post))
// 		await redisClient.expire("singlepost", 30)



// 		return NextResponse.json({ message: "Single post fetched successfully", post }, { status: 200 })
// 	} catch (error: any) {
// 		return NextResponse.json({ message: error?.message }, { status: 400 })
// 	}


// }