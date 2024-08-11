import { z } from 'zod'
import { publicProcedure, router } from '../trpc'
import { post } from '~/server/db/schema'

export const appRouter = router({
  getPosts: publicProcedure
    .query( async ({ ctx }) => {
      const posts = await ctx.db.select({
        id: post.id,
        name: post.name
      }).from(post).limit(10)
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
      name: input.name
    })
    return createPost
  })
})

// export type definition of API
export type AppRouter = typeof appRouter