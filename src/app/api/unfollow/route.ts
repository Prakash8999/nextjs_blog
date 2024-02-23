
import { getAuthSession } from "@/lib/auth";
import prisma from "@/lib/prismadb";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";


export async function DELETE(req:NextRequest ) {

	try {

		const searchParams = req.nextUrl.searchParams;
		const userId = searchParams.get("userId")
		



		// const { currentUser } = await serverAuth(req, res);
		const session = await getAuthSession()
		if (!userId || typeof userId !== "string") {
			//   return res.status(400).json({ message: "Invalid request" });
			return NextResponse.json({ Message: "Invalid request" }, { status: 400 })
		}
		const user = await prisma.user.findUnique({
			where: { id: userId },
		});
		if (!user) {
			return NextResponse.json({ Message: "User Not Found" }, { status: 404 })
		}

		let updatedFollowingIds = [...(user.followingIds || [])];

		// if (req.method === "POST") {
		//   updatedFollowingIds.push(userId);


		// }

		// if (req.method === "DELETE") {
		// }

		updatedFollowingIds = updatedFollowingIds.filter((id) => id !== userId);

		const updatedUser = await prisma.user.update({
			where: { id: session?.user.id },
			data: { followingIds: updatedFollowingIds },
		});

		return NextResponse.json({ Message: "UnFollow", updatedUser }, { status: 200 })
	} catch (error) {
		console.log(error);
		// return res.status(400).json({ message: "Internal server error" });

		return NextResponse.json({ Message: "Internal Server Error", error }, { status: 400 })
	}
}