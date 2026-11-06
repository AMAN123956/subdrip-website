import type { CSSProperties } from "react";

/**
 * Brand constants — single source of truth for anything brand-related.
 * Values are taken verbatim from the design handoff
 * (design/Website A - Editorial.dc.html).
 */

export const BRAND = {
  name: "SubDrip",
  shortName: "SubDrip",
  tagline: "Every subscription is a drip. We add them up.",
  description:
    "Discover subscriptions, track monthly and annual spend, and stay ahead of renewals — with a clear view of every recurring charge.",
  footerBlurb: "A clearer view of your recurring spending. Built privacy-first.",
  copyright: "© 2026 SubDrip",
  supportEmail: "support@subdrip.app",
  privacyEmail: "privacy@subdrip.app",
  platformsNote: "Android 9+ beta on Google Play · iPhone waitlist",
  availability: "Android beta · open now",
} as const;

/** Core color tokens (oklch, kept oklch — do not convert). */
export const COLORS = {
  pageBg: "oklch(97% 0.012 80)",
  surface: "#fff",
  footerBand: "oklch(96% 0.01 80)",
  border: "oklch(92% 0.01 80)",
  borderStrong: "oklch(89% 0.01 80)",
  borderInput: "oklch(87% 0.01 80)",
  textPrimary: "oklch(22% 0.01 80)",
  heading: "oklch(20% 0.01 80)",
  muted: "oklch(48% 0.012 80)",
  meta: "oklch(55% 0.012 80)",
  teal: "oklch(40% 0.075 175)",
  tealHover: "oklch(32% 0.08 175)",
  eyebrow: "oklch(48% 0.07 175)",
  tealTint: "oklch(94% 0.03 175)",
  tealTintSoft: "oklch(96% 0.022 175)",
  positive: "oklch(60% 0.13 165)",
  positiveDeep: "oklch(40% 0.12 160)",
  error: "oklch(52% 0.16 28)",
  cardShadow: "0 10px 26px oklch(30% 0.02 80 / 0.12)",
  phoneShadow: "drop-shadow(0 30px 60px oklch(30% 0.02 80 / 0.2))",
  tealButtonShadow: "0 6px 20px oklch(40% 0.075 175 / 0.25)",
} as const;

/** Logo mark colors (pure SVG — no image asset). */
export const LOGO_MARK = {
  /** Cream droplet stroke */
  drop: "oklch(96% 0.012 80)",
  /** Mint drip dot */
  dot: "oklch(82% 0.09 175)",
} as const;

/** Eyebrow label style, reused across sections. */
export const EYEBROW_STYLE: CSSProperties = {
  fontSize: 13,
  fontWeight: 600,
  letterSpacing: "0.09em",
  textTransform: "uppercase",
  color: COLORS.eyebrow,
};

export const FONT_SORA = "var(--font-sora), sans-serif";
export const FONT_WORK_SANS = "var(--font-work-sans), sans-serif";

export const NAV_LINKS = [
  { label: "How it works", href: "/how-it-works" },
  { label: "Live demo", href: "/demo" },
  { label: "Features", href: "/features" },
  { label: "Privacy", href: "/privacy" },
  { label: "FAQ", href: "/faq" },
  { label: "Support", href: "/support" },
] as const;

export const FOOTER_COLS = [
  {
    title: "Product",
    links: [
      { label: "How it works", href: "/how-it-works" },
      { label: "Features", href: "/features" },
      { label: "Join the beta", href: "/download" },
      { label: "Download the APK", href: "/download#apk" },
    ],
  },
  {
    title: "Trust",
    links: [
      { label: "Privacy & security", href: "/privacy" },
      { label: "Data deletion", href: "/data-deletion" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "Support", href: "/support" },
      { label: "Report an issue", href: "/support" },
    ],
  },
] as const;

export const STORE_BUTTONS = [
  { glyph: "▶", small: "Beta open on", big: "Google Play" },
  { glyph: "", small: "Waitlist for", big: "App Store" },
] as const;
