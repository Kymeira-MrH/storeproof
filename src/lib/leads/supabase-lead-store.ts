import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Lead, LeadStore } from "./types";

export class SupabaseLeadStore implements LeadStore {
  constructor(private readonly client: SupabaseClient) {}

  static fromEnv(): SupabaseLeadStore {
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) throw new Error("SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required");
    return new SupabaseLeadStore(createClient(url, key));
  }

  async save(lead: Lead): Promise<void> {
    const { error } = await this.client
      .from("leads")
      .insert({ email: lead.email, store_url: lead.storeUrl, created_at: lead.createdAt });
    if (error) throw new Error(`failed to save lead: ${error.message}`);
  }

  async all(): Promise<Lead[]> {
    const { data, error } = await this.client
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw new Error(`failed to load leads: ${error.message}`);
    return (data ?? []).map((r) => ({
      email: r.email as string,
      storeUrl: r.store_url as string,
      createdAt: r.created_at as string,
    }));
  }
}
