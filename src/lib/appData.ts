/**
 * Sample in-app data for the /demo phone — ported verbatim from
 * design/AppDemo.dc.html. INR only, frozen "today" of 2026-07-11,
 * exactly like the design prototype.
 */

export const TODAY = new Date("2026-07-11T00:00:00");

const CATS: Record<string, number> = {
  Entertainment: 190,
  Productivity: 260,
  Utilities: 230,
  Shopping: 60,
  Food: 30,
  "AI Tools": 280,
  "Cloud Storage": 220,
  Education: 100,
  Wellness: 150,
  Creativity: 40,
  Finance: 10,
  Other: 0,
};

export const catColor = (cat: string) => `oklch(56% 0.1 ${CATS[cat]})`;
export const catTint = (cat: string) => `oklch(93% 0.03 ${CATS[cat]})`;
export const catText = (cat: string) => `oklch(32% 0.08 ${CATS[cat]})`;

export type Subscription = {
  id: string;
  name: string;
  category: string;
  monthly: number;
  billedAmount: number;
  billedCycle: "month" | "year";
  renewDate: string;
  status: "active" | "needsReview" | "annual";
  confidence: number;
  source: "Gmail" | "SMS";
  snippet: string;
};

export const SUBSCRIPTIONS: Subscription[] = [
  { id: "netflix", name: "Netflix Premium", category: "Entertainment", monthly: 649, billedAmount: 649, billedCycle: "month", renewDate: "2026-07-14", status: "active", confidence: 98, source: "Gmail", snippet: "Your Netflix bill: ₹649 charged on Jul 14 statement" },
  { id: "chatgpt", name: "ChatGPT Plus", category: "Productivity", monthly: 1650, billedAmount: 1650, billedCycle: "month", renewDate: "2026-07-16", status: "active", confidence: 95, source: "Gmail", snippet: "OpenAI: ChatGPT Plus subscription payment ₹1,650" },
  { id: "icloud", name: "iCloud+ 200GB", category: "Utilities", monthly: 219, billedAmount: 219, billedCycle: "month", renewDate: "2026-07-18", status: "active", confidence: 99, source: "Gmail", snippet: "Apple: iCloud+ 200GB storage — ₹219 monthly" },
  { id: "spotify", name: "Spotify Premium", category: "Entertainment", monthly: 119, billedAmount: 119, billedCycle: "month", renewDate: "2026-07-20", status: "active", confidence: 96, source: "Gmail", snippet: "Payment confirmation: Spotify Premium ₹119/mo" },
  { id: "swiggy", name: "Swiggy One", category: "Food", monthly: 138, billedAmount: 138, billedCycle: "month", renewDate: "2026-07-22", status: "needsReview", confidence: 85, source: "SMS", snippet: "Swiggy One membership fee debited — ₹138" },
  { id: "youtube", name: "YouTube Premium", category: "Entertainment", monthly: 129, billedAmount: 129, billedCycle: "month", renewDate: "2026-07-25", status: "active", confidence: 94, source: "Gmail", snippet: "Receipt: YouTube Premium renewed for ₹129" },
  { id: "googleone", name: "Google One 2TB", category: "Utilities", monthly: 325, billedAmount: 325, billedCycle: "month", renewDate: "2026-07-30", status: "active", confidence: 97, source: "Gmail", snippet: "Google One 2TB — payment receipt ₹325" },
  { id: "disney", name: "Disney+ Hotstar", category: "Entertainment", monthly: 299, billedAmount: 299, billedCycle: "month", renewDate: "2026-08-02", status: "active", confidence: 91, source: "Gmail", snippet: "Disney+ Hotstar — payment successful, ₹299" },
  { id: "notion", name: "Notion Plus", category: "Productivity", monthly: 400, billedAmount: 400, billedCycle: "month", renewDate: "2026-08-05", status: "active", confidence: 90, source: "Gmail", snippet: "Notion: Plus plan payment received ₹400" },
  { id: "adobe", name: "Adobe Photography Plan", category: "Productivity", monthly: 799, billedAmount: 799, billedCycle: "month", renewDate: "2026-08-10", status: "active", confidence: 93, source: "Gmail", snippet: "Adobe: Photography Plan renewed at ₹799" },
  { id: "amazon", name: "Amazon Prime", category: "Shopping", monthly: 133, billedAmount: 1596, billedCycle: "year", renewDate: "2026-12-04", status: "annual", confidence: 87, source: "SMS", snippet: "Your Prime membership renews at ₹1,596/yr" },
];

export const GMAIL_PERMISSION_LINES = [
  "Reads receipts and renewal emails only.",
  "Never modifies or deletes anything in your inbox.",
  "You review every detected subscription before it saves.",
];

export const SCAN_STEP_LABELS = [
  "Searching receipts and renewal emails",
  "Grouping recurring merchants",
  "Estimating billing cycles",
  "Preparing your spend overview",
];

export const TOTAL_MONTHLY = SUBSCRIPTIONS.reduce((s, x) => s + x.monthly, 0);
export const TREND = [3980, 4050, 4120, 4200, 4300, 4390, 4450, 4520, 4610, 4700, 4790, 4860];
export const TREND_MONTHS = ["Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];

export const PROJ_MONTHS = ["Aug", "Sep", "Oct", "Nov", "Dec", "Jan"];

export const PROJECTION = (() => {
  const base: Record<string, number> = {};
  SUBSCRIPTIONS.forEach((s) => {
    base[s.category] = (base[s.category] || 0) + s.monthly;
  });
  const series: Record<string, number[]> = {};
  Object.keys(base).forEach((cat) => {
    series[cat] = PROJ_MONTHS.map((_, i) => {
      const g = cat === "Entertainment" ? 0.02 : cat === "Productivity" ? 0.012 : 0.006;
      let v = base[cat] * Math.pow(1 + g, i + 1);
      if (cat === "Productivity" && i >= 1) v += 150; // Adobe price rise from Sep
      return Math.round(v);
    });
  });
  const total = PROJ_MONTHS.map((_, i) =>
    Math.round(Object.keys(series).reduce((a, c) => a + series[c][i], 0)),
  );
  return { base, series, total };
})();

export function fmtINR(n: number) {
  return "₹" + Math.round(n).toLocaleString("en-IN");
}

export function daysUntil(dateStr: string) {
  const d = new Date(dateStr + "T00:00:00");
  return Math.round((d.getTime() - TODAY.getTime()) / 86400000);
}

export function fmtShortDate(dateStr: string) {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
}

export const STATUS_META: Record<string, { label: string; bg: string; color: string }> = {
  active: { label: "Active", bg: "oklch(94% 0.04 150)", color: "oklch(38% 0.1 150)" },
  trial: { label: "Trial", bg: "oklch(94% 0.04 80)", color: "oklch(45% 0.06 80)" },
  annual: { label: "Annual", bg: "oklch(93% 0.03 260)", color: "oklch(38% 0.08 260)" },
  needsReview: { label: "Needs review", bg: "oklch(94% 0.04 25)", color: "oklch(50% 0.11 25)" },
};

export const CATALOG_POPULAR = [
  { id: "netflix", name: "Netflix", color: "#E50914", mono: "N" },
  { id: "spotify", name: "Spotify", color: "#1DB954", mono: "S" },
  { id: "youtube", name: "YouTube Premium", color: "#FF0000", mono: "YT" },
  { id: "prime", name: "Amazon Prime Video", color: "#00A8E1", mono: "pv" },
  { id: "googleone", name: "Google One", color: "#1A73E8", mono: "G1" },
  { id: "adobe", name: "Adobe", color: "#FA0F00", mono: "Ai" },
];

export const CATALOG_BROWSE = [
  { name: "Entertainment", color: "#E50914" },
  { name: "Music", color: "#1DB954" },
  { name: "Cloud Storage", color: "#1A73E8" },
  { name: "Productivity", color: "#6C2BD9" },
  { name: "AI Tools", color: "#10A37F" },
  { name: "Shopping", color: "#00A8E1" },
];

export const SAVINGS_INSIGHTS = [
  { type: "Duplicate subscriptions", headline: "ChatGPT Plus and Notion AI may overlap", explanation: "Both offer AI writing and brainstorming features — worth checking if you need both.", savingsLabel: "Up to ₹800/mo" },
  { type: "Upcoming trial expiry", headline: "Sleep Cycle trial ends tomorrow", explanation: "Decide now to avoid an unexpected charge when the trial converts.", savingsLabel: "Avoid new charge" },
  { type: "Upcoming trial expiry", headline: "Mubi trial ends in 4 days", explanation: "You have not opened Mubi since the trial started.", savingsLabel: "Avoid new charge" },
  { type: "High-cost, low-priority", headline: "ChatGPT Plus is your biggest recurring cost", explanation: "It make up a large share of your monthly spend — worth confirming it still earns its place.", savingsLabel: "₹1,650/mo at stake" },
  { type: "Annual plan cheaper than monthly", headline: "Switch Adobe Photography Plan to annual", explanation: "Adobe’s annual plan works out cheaper than paying monthly.", savingsLabel: "Save ₹1,438/yr" },
  { type: "Price increase detected", headline: "Adobe Express got more expensive", explanation: "Your monthly charge rose from ₹499 to ₹557 last cycle.", savingsLabel: "+₹696/yr impact" },
];

export const INSIGHT_TYPE_ORDER = [
  "Duplicate subscriptions",
  "Upcoming trial expiry",
  "High-cost, low-priority",
  "Annual plan cheaper than monthly",
  "Price increase detected",
];

export const NOTIF_ROWS = [
  { key: "renewals", label: "Renewal reminders", detail: "Get notified before a charge hits", on: true },
  { key: "priceChanges", label: "Price change alerts", detail: "Know when a service gets more expensive", on: true },
  { key: "weeklySummary", label: "Weekly summary", detail: "A recap of your spend every Monday", on: false },
  { key: "savingsTips", label: "Savings tips", detail: "Suggestions to reduce recurring spend", on: true },
  { key: "resyncUpdates", label: "Resync updates", detail: "Alerts when a scan finds something new", on: false },
];

export const TRIALS_ENDING = [
  { id: "mubi", name: "Mubi Trial", category: "Entertainment", endDate: "2026-07-19" },
  { id: "sleepcycle", name: "Sleep Cycle Trial", category: "Wellness", endDate: "2026-07-15" },
];

export const PAYMENT_METHOD = "HDFC Credit Card •••• 4821";

/* ---------- Derived (default prototype state) ---------- */

export const sortedByMonthlyDesc = [...SUBSCRIPTIONS].sort((a, b) => b.monthly - a.monthly);

export function buildTreeCategories() {
  const groups: Record<string, Subscription[]> = {};
  SUBSCRIPTIONS.forEach((sub) => {
    (groups[sub.category] = groups[sub.category] || []).push(sub);
  });
  return Object.keys(groups)
    .map((name) => {
      const services = groups[name].sort((a, b) => b.monthly - a.monthly);
      const total = services.reduce((s, x) => s + x.monthly, 0);
      return {
        name,
        total,
        pct: Math.round((total / TOTAL_MONTHLY) * 100),
        color: catColor(name),
        tint: catTint(name),
      };
    })
    .sort((a, b) => b.total - a.total);
}

/** Projection chart geometry (Total series), same math as the prototype. */
export function buildProjChart() {
  const projSeries = [Math.round(TOTAL_MONTHLY), ...PROJECTION.total];
  const projLabels = ["Now", ...PROJ_MONTHS];
  const W = 320, H = 132, padX = 10, padTop = 16, padBot = 12;
  const n = projSeries.length;
  const vmax = Math.max(...projSeries);
  const vmin = Math.min(...projSeries);
  const span = vmax - vmin || 1;
  const xs = (i: number) => padX + (i / (n - 1)) * (W - 2 * padX);
  const ys = (v: number) => padTop + (1 - (v - vmin) / span) * (H - padTop - padBot);
  const pts = projSeries.map((v, i) => [xs(i), ys(v)] as const);
  const line = pts.map((p, i) => (i ? "L" : "M") + p[0].toFixed(1) + " " + p[1].toFixed(1)).join(" ");
  const area = line + ` L ${xs(n - 1).toFixed(1)} ${(H - padBot).toFixed(1)} L ${xs(0).toFixed(1)} ${(H - padBot).toFixed(1)} Z`;
  const dots = pts.map((p, i) => ({
    cx: p[0].toFixed(1),
    cy: p[1].toFixed(1),
    r: i === n - 1 ? 4 : i === 0 ? 3.5 : 0,
    fill: i === n - 1 ? "oklch(42% 0.08 175)" : "#fff",
  }));
  const labelItems = projLabels.map((label, i) => ({
    label,
    color: i === 0 || i === n - 1 ? "oklch(40% 0.075 175)" : "oklch(60% 0.01 80)",
    weight: i === 0 || i === n - 1 ? 700 : 500,
  }));
  const end = projSeries[n - 1];
  const deltaPct = Math.round(((end - projSeries[0]) / projSeries[0]) * 100);
  return {
    line,
    area,
    dots,
    labelItems,
    endLabel: fmtINR(end),
    deltaLabel: (deltaPct >= 0 ? "+" : "") + deltaPct + "%",
  };
}
