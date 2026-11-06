/**
 * Homepage v3 data. Every price is a real plan price from the SubDrip catalog
 * (dataset/india_subscription_master_list_v2.csv); the "account" built from
 * them is an example and is labelled as one on the page.
 */

/** Brand logos come from the catalog logo repo, pinned to a commit (immutable). */
const LOGO_BASE = "https://cdn.jsdelivr.net/gh/AMAN123956/subspend-logos@4b92da5b01cb7ae960515e9bdbde8472238a92bb/icons";
export const logo = (slug: string) => `${LOGO_BASE}/${slug}.png`;

export type Brand = { name: string; slug: string };

export const STRIP_BRANDS: Brand[] = [
  { name: "Netflix", slug: "netflix" },
  { name: "JioHotstar", slug: "jiohotstar" },
  { name: "Prime Video", slug: "amazon-prime-video" },
  { name: "Spotify", slug: "spotify" },
  { name: "YouTube Premium", slug: "youtube-premium" },
  { name: "ChatGPT", slug: "chatgpt" },
  { name: "Google One", slug: "google-one" },
  { name: "iCloud+", slug: "icloud" },
  { name: "Adobe CC", slug: "adobe-creative-cloud" },
  { name: "Notion", slug: "notion" },
  { name: "SonyLIV", slug: "sonyliv" },
  { name: "Zee5", slug: "zee5" },
  { name: "Canva", slug: "canva" },
  { name: "Microsoft 365", slug: "microsoft-365" },
  { name: "Duolingo", slug: "duolingo" },
  { name: "LinkedIn", slug: "linkedin" },
  { name: "Claude", slug: "claude" },
  { name: "Perplexity", slug: "perplexity" },
];

/** The example month: 6 plans, ₹3,065 / month, ₹36,780 / year. */
export const EXAMPLE_MONTH = [
  { name: "Netflix", plan: "Standard", slug: "netflix", amount: 499 },
  { name: "Spotify", plan: "Premium", slug: "spotify", amount: 139 },
  { name: "YouTube Premium", plan: "Individual", slug: "youtube-premium", amount: 149 },
  { name: "JioHotstar", plan: "Super", slug: "jiohotstar", amount: 149 },
  { name: "ChatGPT", plan: "Plus", slug: "chatgpt", amount: 1999 },
  { name: "Google One", plan: "100 GB", slug: "google-one", amount: 130 },
];
export const EXAMPLE_MONTHLY = EXAMPLE_MONTH.reduce((s, r) => s + r.amount, 0);
export const EXAMPLE_YEARLY = EXAMPLE_MONTHLY * 12;

export const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

/** "Add by hand" demo — real catalog plans. */
export const CATALOG_DEMO: { name: string; slug: string; plans: { name: string; meta: string; amount: number }[] }[] = [
  {
    name: "Netflix",
    slug: "netflix",
    plans: [
      { name: "Mobile", meta: "480p · 1 phone", amount: 149 },
      { name: "Basic", meta: "720p · 1 screen", amount: 199 },
      { name: "Standard", meta: "1080p · 2 screens", amount: 499 },
      { name: "Premium", meta: "4K · 4 screens", amount: 649 },
    ],
  },
  {
    name: "Spotify",
    slug: "spotify",
    plans: [
      { name: "Premium Student", meta: "Monthly", amount: 69 },
      { name: "Premium Standard", meta: "Monthly", amount: 139 },
      { name: "Premium Platinum", meta: "Monthly", amount: 299 },
    ],
  },
  {
    name: "YouTube",
    slug: "youtube-premium",
    plans: [
      { name: "Student", meta: "Monthly", amount: 89 },
      { name: "Individual", meta: "Monthly", amount: 149 },
      { name: "Two-person", meta: "Monthly", amount: 219 },
      { name: "Family", meta: "Monthly", amount: 299 },
    ],
  },
  {
    name: "JioHotstar",
    slug: "jiohotstar",
    plans: [
      { name: "Mobile", meta: "Monthly", amount: 79 },
      { name: "Super", meta: "Monthly", amount: 149 },
      { name: "Premium", meta: "Monthly", amount: 299 },
    ],
  },
  {
    name: "ChatGPT",
    slug: "chatgpt",
    plans: [
      { name: "Go", meta: "Monthly", amount: 399 },
      { name: "Plus", meta: "Monthly", amount: 1999 },
    ],
  },
  {
    name: "Google One",
    slug: "google-one",
    plans: [
      { name: "Lite · 30 GB", meta: "Monthly", amount: 59 },
      { name: "Basic · 100 GB", meta: "Monthly", amount: 130 },
      { name: "Standard · 200 GB", meta: "Monthly", amount: 210 },
    ],
  },
];

export const HOME_FAQ_IDS = ["free", "q2", "personal", "apk"] as const;
