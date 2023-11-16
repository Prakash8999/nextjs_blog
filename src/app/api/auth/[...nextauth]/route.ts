import nextAuth from "next-auth"
import NextAuth, { AuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"

import GoogleProvider from "next-auth/providers/google"

const authOptions: AuthOptions = {
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_ID!,
			clientSecret: process.env.GITHUB_SECRET!,
		}),


		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!
		}),



	],


	secret:process.env.NEXTAUTH_SECRET
}

const handler = nextAuth(authOptions)

export { handler as GET, handler as POST }