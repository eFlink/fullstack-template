import { z } from "zod";

import { createTRPCRouter, adminProcedure } from "~/server/api/trpc";

export const imageRouter = createTRPCRouter({
  createSignedUploadUrl: adminProcedure
    .input(z.object({ 
        name: z.string().min(1),
    }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.supabase.storage.from('test').createSignedUploadUrl(input.name)
    }),
});
