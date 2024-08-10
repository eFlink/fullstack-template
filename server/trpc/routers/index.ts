import { z } from 'zod'
import { publicProcedure, router } from '../trpc'

export const appRouter = router({
  hello: publicProcedure
    .input(
      z.object({
        text: z.string().nullish(),
      }),
    )
    .query(({ input }) => {
      return {
        greeting: `hello ${input?.text ?? 'world'}`,
      }
    }),
  mutation: publicProcedure
  .input(
    z.object({
      text: z.string()
    })
  ).mutation(({ input }) => {
    return input.text
  })
})

// export type definition of API
export type AppRouter = typeof appRouter