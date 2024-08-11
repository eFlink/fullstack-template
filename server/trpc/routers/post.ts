import { z } from 'zod'
import { adminProcedure, publicProcedure, router } from '../trpc'
import { post } from '~/server/db/schema'

export const postRouter = router({
  getPosts: adminProcedure
    .query( async ({ ctx }) => {
      const posts = await ctx.db.select({
        id: post.id,
        name: post.name
      }).from(post)
      return posts
    }),
  createPost: publicProcedure
  .input(
    z.object({
      name: z.string()
    })
  )
  .mutation( async ({ input, ctx }) => {
    const createPost = await ctx.db.insert(post).values({
      name: input.name,
    })
    return createPost
  })
})