import { generateReactHelpers } from '@uploadthing/react/hooks'
// import { OurFileRouter } from '../.../app/api/uploadthing/core'


import type { OurFileRouter } from '../src/app/api/uploadthing/core'

export const { uploadFiles } = generateReactHelpers<OurFileRouter>()
