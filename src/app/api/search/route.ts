import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function GET(req: NextRequest, res: NextResponse) {
	// const { q: query } = req.query;
	try {
		const searchParams = req.nextUrl.searchParams;
		const searchQuery = searchParams.get("q")
		console.log(searchQuery);

		if (typeof searchQuery != 'string') {
			throw new Error("Invalid Request")
		}
		const posts = await prisma.post.findMany({
			where: {
				OR: [
					{
						title: {
							contains: searchQuery,
							mode: "insensitive"
						}

					},
					{
						author: {
							username: {
								contains:searchQuery,
								mode:"insensitive"
							}
						}
					},
					{
						tags: {
							contains: searchQuery,
							mode: "insensitive"
						}
					},

					{
						author: {
							name: {
								contains: searchQuery,
								mode: "insensitive"
							},
						}


					},
					{
						author: {
							github: {
								contains: searchQuery,
								mode: "insensitive"
							},
						}


					},

				]
			},
			include: {
				author: true
			}
		})
		return NextResponse.json({ message: "Data Found", posts }, { status: 200 })
	} catch (error: any) {
		return NextResponse.json({ message: error?.message }, { status: 500 })
	}


}