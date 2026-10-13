import type { Lead, LeadStore } from "./types";

// Local/dev fallback. Not persistent across restarts and per-instance in
// serverless, so production must be backed by Supabase (see factory).
export class MemoryLeadStore implements LeadStore {
  private readonly leads: Lead[] = [];
  async save(lead: Lead): Promise<void> {
    this.leads.push(lead);
  }
  async all(): Promise<Lead[]> {
    return [...this.leads];
  }
}
