// import { getAuthSession } from "@/lib/auth";
// import prisma from "@/lib/prismadb";
// import { NextApiRequest, NextApiResponse } from "next";

// // import prisma from "@/libs/prismadb";
// // import serverAuth from "@/libs/serverAuth";

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== "POST" && req.method !== "DELETE") {
//     return res.status(405).json({ message: "Method not allowed" });
//   }

//   const session = await getAuthSession()
  
//   try {
//     const { postId } = req.method === "POST" ? req.body : req.query;
//     const currentUser = session?.user

//     if (!postId || typeof postId !== "string") {
//       return res.status(400).json({ message: "Invalid Post ID" });
//     }

//     const post = await prisma.post.findUnique({
//       where: {
//         id: postId,
//       },
//     });

//     if (!post) {
//       return res.status(404).json({ message: "Post not found" });
//     }

//     let updatedLikedIds = [...(post.likedIds || [])];

//     if (req.method === "POST") {
//       updatedLikedIds.push(currentUser?.id);

//       try {
//         const post = await prisma.post.findUnique({
//           where: {
//             id: postId,
//           },
//         });
    

//           await prisma.user.update({
//             where: {
//               id: post.userId,
//             },
//             data: {
//               hasNotification: true,
//             },
//           });
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     } else {
//       updatedLikedIds = updatedLikedIds.filter((id) => id !== currentUser.id);
//     }

//     const updatedPost = await prisma.post.update({
//       where: {
//         id: ,
//       },
//       data: {
//         likedIds: updatedLikedIds,
//       },
//     });

//     return res.status(200).json(updatedPost);
//   } catch (error) {
//     console.log(error);
//     return res.status(400).json({ message: "Internal server error" });
//   }
// }