import type { Session, User } from 'next-auth'
import type { JWT } from 'next-auth/jwt'

type UserId = string

declare module 'next-auth/jwt' {
  interface JWT {
    id: UserId
    username?: string | null
    bio?: string | null
    github?: string | null
    website?: string | null
    coding_skills: string | null,
    linkedin: string | null,
    followingIds: string | null
  }
}

declare module 'next-auth' {
  interface Session {
    user: User & {
      id: UserId
      username?: string | null
      bio?: string | null
      github?: string | null
      website?: string | null
      coding_skills: string | null,
      linkedin: string | null,
      followingIds: string | null
    }
  }
}
