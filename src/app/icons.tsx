// Original line-art icons (owned art, no third-party sets). currentColor so they
// inherit the surrounding colour. 24×24, 1.7 stroke.
type P = { className?: string };
const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export function IconCode(p: P) {
  return (
    <svg {...base} className={p.className}>
      <path d="M9 8l-4 4 4 4" />
      <path d="M15 8l4 4-4 4" />
    </svg>
  );
}
export function IconDoc(p: P) {
  return (
    <svg {...base} className={p.className}>
      <path d="M7 3h7l4 4v14H7z" />
      <path d="M14 3v4h4" />
      <path d="M10 13h5M10 16.5h5" />
    </svg>
  );
}
export function IconShieldCheck(p: P) {
  return (
    <svg {...base} className={p.className}>
      <path d="M12 3l7 3v5c0 4.8-3.3 7.8-7 9.6C8.3 18.8 5 15.8 5 11V6z" />
      <path d="M9 11.5l2 2 4-4" />
    </svg>
  );
}
export function IconBolt(p: P) {
  return (
    <svg {...base} className={p.className}>
      <path d="M13 2L5 13h6l-1 9 9-12h-7z" />
    </svg>
  );
}
export function IconEye(p: P) {
  return (
    <svg {...base} className={p.className}>
      <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
export function IconBuilding(p: P) {
  return (
    <svg {...base} className={p.className}>
      <path d="M4 21V5l8-3 8 3v16" />
      <path d="M9.5 21v-5h5v5" />
      <path d="M8 9h.01M12 9h.01M16 9h.01M8 13h.01M16 13h.01" />
    </svg>
  );
}
export function IconSearch(p: P) {
  return (
    <svg {...base} className={p.className}>
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.3-4.3" />
    </svg>
  );
}
export function IconWrench(p: P) {
  return (
    <svg {...base} className={p.className}>
      <path d="M15 4a4.5 4.5 0 0 0-5.7 5.7L3 16v3h3l6.3-6.3A4.5 4.5 0 0 0 18 7l-2.5 2.5L13 7l2-3z" />
    </svg>
  );
}
export function IconSeal(p: P) {
  return (
    <svg {...base} className={p.className}>
      <circle cx="12" cy="9" r="5.5" />
      <path d="M9 13.5L8 21l4-2 4 2-1-7.5" />
      <path d="M12 6.5l.9 1.8 2 .3-1.5 1.4.4 2-1.8-1-1.8 1 .4-2-1.5-1.4 2-.3z" />
    </svg>
  );
}
