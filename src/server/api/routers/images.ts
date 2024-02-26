import { z } from "zod";

import { createTRPCRouter, publicProcedure, adminProcedure } from "~/server/api/trpc";

export const imageRouter = createTRPCRouter({
  createSignedUploadUrl: publicProcedure
    .input(z.object({ 
        name: z.string().min(1),
    }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.supabase.storage.from('test').createSignedUploadUrl(input.name)
    }),
});
