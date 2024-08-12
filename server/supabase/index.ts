import { createClient } from "@supabase/supabase-js";
import env from "~/env";

// TODO: Fix this so it uses env variables
export const supabase = createClient(
    env.SUPABASE_URL, 
    env.SUPABASE_ANON_KEY
)