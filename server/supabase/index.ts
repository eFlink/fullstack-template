import { createClient } from "@supabase/supabase-js";

// TODO: Fix this so it uses env variables
export const supabase = createClient("https://hwtpyjszfznisyezytzc.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh3dHB5anN6ZnpuaXN5ZXp5dHpjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjMzMDIyNDIsImV4cCI6MjAzODg3ODI0Mn0.rY3Bnz8fUKpgHAV2X33JmBtPlmL7g05Xn1xqsqCc-yY")