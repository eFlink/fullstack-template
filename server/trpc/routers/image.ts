import { z } from 'zod'
import { publicProcedure, router } from '../trpc'
import { image, post } from '~/server/db/schema'

export const imageRouter = router({
    getImages: publicProcedure
        .query(async ({ ctx }) => {
            const images = await ctx.db.select({
                name: image.name,
                path: image.path
            }).from(image)
            const newImages = await Promise.all(images.map(async (value) => {
                const signedUrl = await ctx.supabase.storage.from("test").createSignedUrl(value.path!, 120)
                return {
                    name: value.name,
                    url: signedUrl.data?.signedUrl
                }
            }))
            return newImages
        }),
    createImage: publicProcedure
        .input(
            z.object({
                name: z.string(),
                path: z.string()
            })
        )
        .mutation(async ({ input, ctx }) => {
            const createPost = await ctx.db.insert(image).values({
                name: input.name,
                path: input.path
            })
            return createPost
        })
})