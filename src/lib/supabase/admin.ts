import { createClient } from "@supabase/supabase-js";

// Service-role client for server-side writes that bypass RLS (e.g. persisting scans).
// Never import this into client code.
export function createAdminClient() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required");
  return createClient(url, key, { auth: { persistSession: false } });
}
