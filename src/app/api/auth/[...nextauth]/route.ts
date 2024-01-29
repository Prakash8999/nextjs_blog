// import { PrismaAdapter } from "@next-auth/prisma-adapter"

// import nextAuth from "next-auth"
// import NextAuth, { AuthOptions } from "next-auth"
// import GithubProvider from "next-auth/providers/github"

// import GoogleProvider from "next-auth/providers/google"
// import prisma from "../../../../../lib/prismadb"


// export const authOptions: AuthOptions = {
// 	providers: [
// 		GithubProvider({
// 			clientId: process.env.GITHUB_ID!,
// 			clientSecret: process.env.GITHUB_SECRET!,
// 		}),
		

// 		GoogleProvider({
// 			clientId: process.env.GOOGLE_CLIENT_ID!,
// 			clientSecret: process.env.GOOGLE_CLIENT_SECRET!
// 		}),



// 	],
	
	
// 	adapter: PrismaAdapter(prisma),
// 	secret:process.env.NEXTAUTH_SECRET
// }

// const handler = nextAuth(authOptions)

// export { handler as GET, handler as POST }


// import { authOptions } from "@/lib/auth"
import { authOptions } from "@/lib/auth"

import NextAuth from "next-auth"

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }