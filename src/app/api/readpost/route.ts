// import { NextResponse } from "next/server";
// import prisma from "../../../../lib/prismadb";

// export async function GET(res: NextResponse) {


// 	try {

// 		const post = await prisma.post.findMany({

// 			select: {
// 				author: {
// 					select:{
// 						name:true,
// 						username:true,
// 						image:true,
// 						id:true
// 					}
// 				},
// 				content: true,
// 				title: true,
// 				createdAt: true,
// 				id: true,
// 				draft: true,
// 				publish: true,
// 				coverPhoto:true
// 			}
// 			,
// 			orderBy: {
// 				createdAt: 'desc',
// 			},
// 		})


// 		return NextResponse.json({ message: "Post Fetch successfully", post }, { status: 200 })
// 	} catch (error) {
// 		return NextResponse.json({ message: error }, { status: 400 })
// 	}

// }


import { NextResponse } from "next/server";
import prisma from "../../../../lib/prismadb";
import { Redis } from "ioredis";
import { redisClient } from "@/lib/redis";

export async function GET(res: NextResponse) {


	try {


		const cachedValue = await redisClient.get("post")
		if (cachedValue) {
			const parsedCachedValue = JSON.parse(cachedValue);
			return NextResponse.json({ message: "Post Fetch successfully", post: parsedCachedValue }, { status: 200 })
		}

		const post = await prisma.post.findMany({

			select: {
				author: {
					select: {
						name: true,
						username: true,
						image: true,
						id: true
					}
				},
				content: true,
				title: true,
				createdAt: true,
				id: true,
				draft: true,
				publish: true,
				coverPhoto: true,
				tags: true
			}
			,
			orderBy: {
				createdAt: 'desc',
			},
		})

		await redisClient.set("post", JSON.stringify(post))
		await redisClient.expire("post", 30)


		return NextResponse.json({ message: "Post Fetch successfully", post }, { status: 200 })
	} catch (error) {
		return NextResponse.json({ message: error }, { status: 400 })
	}

}