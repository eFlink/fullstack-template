import { z } from 'zod'
import { publicProcedure, router } from '../trpc'
import { post } from '~/server/db/schema'

export const authRouter = router({
  getUser: publicProcedure
    .query( async ({ ctx }) => {
      const user = await ctx.supabase.auth.getUser()
      return user
    }),
})