export interface Lead {
  email: string;
  storeUrl: string;
  createdAt: string; // ISO
}

export interface LeadStore {
  save(lead: Lead): Promise<void>;
  all(): Promise<Lead[]>;
}
