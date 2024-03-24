
import prisma from "@/lib/prismadb";
import { getAuthSession } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  if (req.method !== "POST") {
    return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
  }

  try {
    // const { currentUser } = await serverAuth(req, res);
    const { postId, body } = await req.json()
    
    const session = await getAuthSession()
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }


    if (!postId || typeof postId !== "string") {
      return NextResponse.json({ message: "Invalid Post ID" });
    }

    const comment = await prisma.comment.create({
      data: {
        // body
        body,
        authorId: session?.user?.id,
        postId,
        commentUsername:session?.user?.username  ,
        commentUserPhoto:session?.user?.image,

      },

      
    });




    return NextResponse.json(comment);
  } catch (error) {
    console.log(error);
    NextResponse.json({ message: "Something went wrong" }, { status: 400 });
  }
}