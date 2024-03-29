import prisma from './prismadb'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { nanoid } from 'nanoid'
import { NextAuthOptions, getServerSession } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from 'next-auth/providers/github'
import { JWT } from 'next-auth/jwt'
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
  },

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
      // @ts-ignore
      scope: "repo",
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id
        session.user.name = token.name
        session.user.email = token.email
        session.user.image = token.picture
        session.user.username = token.username
        session.user.bio = token.bio
        session.user.github = token.github
        session.user.linkedin = token.linkedin
        session.user.coding_skills = token.coding_skills
        session.user.website = token.website
        session.user.followingIds = token.followingIds
      }
      return session
    },
    async jwt({ token, user }) : Promise<JWT> {
      const dbUser = await prisma.user.findFirst({
        where: {
          email: token.email,
        },
      })
      if (!dbUser) {
        token.id = user!.id
        return token as JWT;
      }
      if (!dbUser.username) {
        await prisma.user.update({
          where: {
            id: dbUser.id,
          },
          data: {
            username: nanoid(10),
          },
        })
      }
      const followingIdsAsString = dbUser.followingIds.join(',')
      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
        username: dbUser.username,
        bio: dbUser.bio,
        github: dbUser.github,
        linkedin: dbUser.linkedin,
        coding_skills: dbUser.coding_skills,
        website: dbUser.website,
        followingIds:followingIdsAsString
      } 
    },
    redirect() {
      return '/'
    },
  },
}
export const getAuthSession = () => getServerSession(authOptions)
