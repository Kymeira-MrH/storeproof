import type { Scanner, ScanResult } from "./types";

export class FakeScanner implements Scanner {
  constructor(private readonly result: ScanResult) {}
  async scan(_url: string): Promise<ScanResult> {
    return this.result;
  }
}
