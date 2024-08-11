import { initTRPC, TRPCError } from '@trpc/server'
import { createContext } from './context';

/**
 * This is your entry point to setup the root configuration for tRPC on the server.
 * - `initTRPC` should only be used once per app.
 * - We export only the functionality that we use so we can enforce which base procedures should be used
 *
 * Learn how to create protected base procedures and other things below:
 * @see https://trpc.io/docs/server/routers
 * @see https://trpc.io/docs/server/procedures
 */

const t = initTRPC.context<typeof createContext>().create();

/**
 * ROUTER & PROCEDURE
 *
 * These are the pieces you use to build your tRPC API. You should import these a lot in the
 * "/server/api/routers" directory.
 */

/**
 * This is how you create new routers and sub-routers in your tRPC API.
 *
 * @see https://trpc.io/docs/router
 */
export const createTRPCRouter = t.router;

/**
 * Unprotected procedure
 **/
export const publicProcedure = t.procedure;

/**
 * Authenticated procedure
 */
const enforceUserIsAuthed = t.middleware(async ({ ctx, next }) => {
  const user = await ctx.supabase.auth.getUser();
  if (user.error) {
    throw new TRPCError({
      code: "UNAUTHORIZED"
    })
  }
  return next({
    ctx: {
      currentUser: user
    }
  })
})

export const adminProcedure = t.procedure.use(enforceUserIsAuthed)

export const router = t.router;
export const middleware = t.middleware;
