"use client";

import { useState, type FormEvent } from "react";

interface Connection {
  shopDomain: string;
  imagesTotal: number | null;
  imagesMissingAlt: number | null;
}

export function ShopifyPanel({
  storeId,
  connection,
}: {
  storeId: string;
  connection: Connection | null;
}) {
  const [conn, setConn] = useState<Connection | null>(connection);
  const [shopDomain, setShopDomain] = useState("");
  const [token, setToken] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  async function connect(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setErr("");
    setMsg("");
    try {
      const res = await fetch(`/api/stores/${storeId}/connect`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ shopDomain, accessToken: token }),
      });
      const d = (await res.json().catch(() => null)) as
        | { shop?: string; imagesTotal?: number; imagesMissingAlt?: number; error?: string }
        | null;
      if (!res.ok || !d) {
        setErr(d?.error ?? "Connection failed.");
        return;
      }
      setConn({
        shopDomain,
        imagesTotal: d.imagesTotal ?? 0,
        imagesMissingAlt: d.imagesMissingAlt ?? 0,
      });
      setMsg(`Connected to ${d.shop}. ${d.imagesMissingAlt} of ${d.imagesTotal} product images need alt text.`);
      setToken("");
    } catch {
      setErr("Connection failed.");
    } finally {
      setBusy(false);
    }
  }

  async function runFixes() {
    setBusy(true);
    setErr("");
    setMsg("");
    try {
      const res = await fetch(`/api/stores/${storeId}/fix`, { method: "POST" });
      const d = (await res.json().catch(() => null)) as
        | { fixed?: number; failed?: number; remaining?: number; error?: string }
        | null;
      if (!res.ok || !d) {
        setErr(d?.error ?? "Fix run failed.");
        return;
      }
      setMsg(
        `Wrote alt text to ${d.fixed} image${d.fixed === 1 ? "" : "s"}` +
          (d.failed ? `, ${d.failed} skipped` : "") +
          `. ${d.remaining} still need alt text.`,
      );
      setConn((c) => (c ? { ...c, imagesMissingAlt: d.remaining ?? c.imagesMissingAlt } : c));
    } catch {
      setErr("Fix run failed.");
    } finally {
      setBusy(false);
    }
  }

  if (!conn) {
    return (
      <div className="add-panel" style={{ marginTop: "12px" }}>
        <form onSubmit={connect}>
          <p className="micro" style={{ marginTop: 0 }}>
            Connect your store so we can write fixes back at the source. One-time setup (about two
            minutes):
          </p>
          <ol className="connect-steps">
            <li>
              In Shopify admin: <b>Settings → Apps and sales channels → Develop apps</b> (allow
              custom app development if asked).
            </li>
            <li>
              Click <b>Create an app</b> and name it &ldquo;StoreProof&rdquo;.
            </li>
            <li>
              Under <b>Configuration → Admin API scopes</b>, tick <b>read_products</b> and{" "}
              <b>write_products</b>, then <b>Save</b>.
            </li>
            <li>
              Open <b>API credentials → Install app</b>, then reveal and copy the{" "}
              <b>Admin API access token</b> (<code>shpat_…</code>).
            </li>
            <li>
              Paste your <code>.myshopify.com</code> domain and that token below. We store the token
              only to apply your fixes — nothing else.
            </li>
          </ol>
          <input
            className="gate-input"
            placeholder="your-store.myshopify.com"
            value={shopDomain}
            onChange={(e) => setShopDomain(e.target.value)}
            aria-label="Shopify store domain"
          />
          <input
            className="gate-input"
            placeholder="Admin API access token (shpat_…)"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            aria-label="Admin API access token"
          />
          <div style={{ marginTop: "12px" }}>
            <button className="btn" type="submit" disabled={busy}>
              {busy ? "Connecting…" : "Connect Shopify store"}
            </button>
          </div>
          {err ? (
            <p className="micro err" role="alert">
              {err}
            </p>
          ) : null}
        </form>
      </div>
    );
  }

  return (
    <div className="add-panel" style={{ marginTop: "12px" }}>
      <p className="remsum" style={{ marginTop: 0 }}>
        Connected to <b>{conn.shopDomain}</b> — {conn.imagesMissingAlt ?? 0} of{" "}
        {conn.imagesTotal ?? 0} product images need alt text.
      </p>
      <div style={{ marginTop: "12px", display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" }}>
        <button className="btn" type="button" onClick={runFixes} disabled={busy}>
          {busy ? "Writing fixes…" : "Run alt-text fixes"}
        </button>
      </div>
      {msg ? (
        <p className="fixaction" style={{ marginTop: "10px" }}>
          {msg}
        </p>
      ) : null}
      {err ? (
        <p className="micro err" role="alert">
          {err}
        </p>
      ) : null}
    </div>
  );
}
