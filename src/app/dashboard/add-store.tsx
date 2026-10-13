"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

export function AddStore() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/stores", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const data = (await res.json().catch(() => null)) as { error?: string } | null;
      if (!res.ok) {
        setError(data?.error ?? "Could not add the store.");
        return;
      }
      setUrl("");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="field">
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="your-store.com"
          aria-label="Store URL"
          autoComplete="url"
          inputMode="url"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Scanning…" : "Add & scan"}
        </button>
      </div>
      {error ? (
        <p className="micro err" role="alert">
          {error}
        </p>
      ) : null}
      <p className="micro">Adds the store and runs its first scan (about 20 seconds).</p>
    </form>
  );
}
