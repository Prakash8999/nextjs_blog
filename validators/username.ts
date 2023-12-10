import { z } from 'zod'

export const UsernameValidator = z.object({
  uname: z
    .string()
    .min(3)
    .max(30),
  bio: z.string().min(4).max(300),
  linkedin: z.string().min(4).max(300),
  github: z.string(),
  website: z.string(),
  skills: z.string(),

})
