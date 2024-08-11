import { imageRouter } from "./routers/image";
import { postRouter } from "./routers/post";
import { createTRPCRouter } from "./trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  image: imageRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
