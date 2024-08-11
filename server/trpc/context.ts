import type { inferAsyncReturnType } from '@trpc/server'
import { db } from "~/server/db";
import { supabase } from '../supabase';

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
export const createContext = async () => {
  return {
    db,
    supabase
  };
};

export type Context = inferAsyncReturnType<typeof createContext>;
