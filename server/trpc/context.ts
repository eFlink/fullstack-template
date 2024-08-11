import type { inferAsyncReturnType } from '@trpc/server'
import { db } from "~/server/db";
  import { serverSupabaseClient } from '#supabase/server'

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
export const createContext = async (event: any) => {
  const supabase = await serverSupabaseClient(event)

  return {
    db,
    supabase
  };
};

export type Context = inferAsyncReturnType<typeof createContext>;
