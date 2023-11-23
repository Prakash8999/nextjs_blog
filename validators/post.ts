import { z } from 'zod'

export const PostValidator = z.object({
  title: z
    .string()
    .min(3, {
      message: 'min size of title should be 3 character',
    })
    ,

  content: z.any(),

})

export type PostCreationRequest = z.infer<typeof PostValidator>