import { getServerSession } from 'next-auth'
// import { getToken } from 'auth/jwt'
import { createUploadthing, type FileRouter } from 'uploadthing/next'
import { authOptions } from '../auth/[...nextauth]/route'

const f = createUploadthing()

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: '4MB' } })
    .middleware(async () => {
      const session = await  getServerSession(authOptions)

      if (!session) throw new Error('Unauthorized')

      return { userId: session?.user?.name }
    })
    .onUploadComplete(async ({ metadata, file }) => {}),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
