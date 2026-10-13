import type { LeadStore } from "./types";
import { MemoryLeadStore } from "./memory-lead-store";
import { SupabaseLeadStore } from "./supabase-lead-store";

// Supabase in production (when creds are set); in-memory locally so the gate
// still works in dev without a database.
export function createLeadStore(): LeadStore {
  if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return SupabaseLeadStore.fromEnv();
  }
  return new MemoryLeadStore();
}
