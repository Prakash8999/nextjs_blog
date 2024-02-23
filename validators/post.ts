import { z } from 'zod'

export const PostValidator = z.object({
  title: z
    .string()
    .min(3, {
      message: 'min size of title should be 3 character',
    })
  ,

  content: z.any(),
  publish: z.boolean(),
  draft: z.boolean(),
  coverPhoto: z.string(),
  tags: z.string(),
  category: z.string()
})

export type PostCreationRequest = z.infer<typeof PostValidator>