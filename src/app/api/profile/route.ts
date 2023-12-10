import { NextRequest, NextResponse } from "next/server";
import { getAuthSession } from "../../../../lib/auth";
import { UsernameValidator } from "../../../../validators/username";
import prisma from "../../../../lib/prismadb";

export async function PATCH(req: NextRequest) {

	try {
		const session = await getAuthSession()
		if (!session?.user) {
			return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
		}
		const { uname, bio, github,website,coding_skills,linkedin } = await req.json()
		// const { uname  } = UsernameValidator.parse(body)
		// console.log(uname);

		const username = await prisma.user.findFirst({
			where: {
				username: uname
			}
		})
		if (uname == session?.user?.username) {


			const updated = await prisma.user.update({
				where: {
					id: session.user.id
				},
				data: {
					github: github,
					bio: bio,
					linkedin:linkedin,
					website:website,
					coding_skills:coding_skills,


				}
			})

			return NextResponse.json({ message: "Profile Updated Successfully", updated }, {
				status: 200
			})
		}



		if (uname != session?.user?.username) {

			if (username) {
				return NextResponse.json({ message: "Username Already taken please choose another username" }, {
					status: 409
				})
			}


			const updated = await prisma.user.update({
				where: {
					id: session.user.id
				},
				data: {
					username: uname,
					bio: bio,
					github:github,
					linkedin:linkedin,
					website:website,
					coding_skills:coding_skills,
					
				}
			})

			return NextResponse.json({ message: "Profile Updated Successfully", updated }, {
				status: 200
			})


		}



	} catch (error) {
		return NextResponse.json({ message: "Could Not Able to Update Profile." }, {
			status: 500
		})
	}

}