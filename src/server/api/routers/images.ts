import { z } from "zod";

import { createTRPCRouter, publicProcedure, adminProcedure } from "~/server/api/trpc";

export const imageRouter = createTRPCRouter({
  upload: publicProcedure
    .input(z.object({ 
        name: z.string().min(1),
        file: z.any(),
    }))
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      return await ctx.supabase.storage.from('test').upload(input.name, input.name)
    }),

});
