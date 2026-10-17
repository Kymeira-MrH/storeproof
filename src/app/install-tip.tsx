// On-site explainer for installing StoreProof as a phone app (PWA). Shown on the
// dashboard so clients can add it to their home screen for app-like access.
export function InstallTip() {
  return (
    <div className="install-tip">
      <div className="install-tip-h">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="6" y="2.5" width="12" height="19" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
          <path d="M12 17.5h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        Use StoreProof on your phone
      </div>
      <p>
        Add StoreProof to your home screen and it opens full-screen like an app — your dashboard,
        scans and evidence packs, on the go.
      </p>
      <ul>
        <li>
          <b>iPhone / iPad:</b> open StoreProof in Safari → tap <b>Share</b> → <b>Add to Home Screen</b>.
        </li>
        <li>
          <b>Android:</b> open it in Chrome → tap the <b>⋮</b> menu → <b>Install app</b>.
        </li>
      </ul>
    </div>
  );
}
