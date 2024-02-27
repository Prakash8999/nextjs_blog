import { getAuthSession } from "@/lib/auth";
import prisma from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
	try {
		if (req.method !== "POST" && req.method !== "DELETE") {
			return NextResponse.json({ message: "Method not allowed" });
		}
		const session = await getAuthSession()

		if (!session) {
			throw new Error("Unauthorized! Please Login First");
		}

		const searchParams = req.nextUrl.searchParams;
		const postId = searchParams.get("postId")
		
		if (!postId || typeof postId !== "string") {
			return NextResponse.json({ message: "Invalid Post Id" }, { status: 400 })
		}
		const post = await prisma.post.findUnique({
			where: {
				id: postId
			}
		})


		let updatelikesId = [...(post?.likedIds || [])]
		updatelikesId = updatelikesId.filter((id) => id !== session?.user?.id);

		const updatedPost = await prisma.post.update({
			where: {
				id: postId,
			},
			data: {
				likedIds: updatelikesId
			}
		})



		return NextResponse.json({ message: "Unlike success", updatedPost })
	} catch (error) {
		console.log(error);
		return NextResponse.json({ message: "Internal server error" }, { status: 400 });
	}
}