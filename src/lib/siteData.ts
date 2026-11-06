/**
 * Site copy & data — ported verbatim from design/Website A - Editorial.dc.html.
 * Currency-dependent strings take `p(inr, usd)` from the currency context.
 */

export type PriceFn = (inr: string, usd: string) => string;

const teal = "oklch(40% 0.075 175)";

/* ---------------- Hero ---------------- */

export const TRUST_FACTS = [
  { label: "Gmail access", value: "Read-only access" },
  { label: "Banking", value: "No bank login" },
  { label: "Detected items", value: "You review everything" },
];

export const getHeroPills = (p: PriceFn) => [
  { title: p("₹4,268 this month", "$74.45 this month"), meta: "8 active subscriptions", iconPath: "M3 20h18M6.5 20V11M12 20V6M17.5 20v-5", tint: "oklch(94% 0.03 175)", fg: "oklch(38% 0.075 175)", top: "18px", left: "auto", right: "-10px", delay: "0s" },
  { title: "Netflix renews in 3 days", meta: p("₹649 · reminder on", "$15.49 · reminder on"), iconPath: "M12 21a9 9 0 1 1 9-9M12 7.5V12l3 2", tint: "oklch(94% 0.04 60)", fg: "oklch(48% 0.12 55)", top: "110px", left: "-16px", right: "auto", delay: "1.8s" },
  { title: "Trial converts tomorrow", meta: p("Adobe · ₹1,949/mo", "Adobe · $22.99/mo"), iconPath: "M12 3v4M12 21a7 7 0 1 0 0-14 7 7 0 0 0 0 14ZM12 11v3l2 1.5", tint: "oklch(93% 0.05 25)", fg: "oklch(45% 0.15 25)", top: "210px", left: "auto", right: "-12px", delay: "3.6s" },
  { title: p("₹1,140 savings found", "$13.40 savings found"), meta: "Across 3 subscriptions", iconPath: "M12 5v14M12 19l-5-5M12 19l5-5", tint: "oklch(93% 0.06 160)", fg: "oklch(40% 0.11 160)", top: "340px", left: "-20px", right: "auto", delay: "5.4s" },
  { title: "Weekly insight ready", meta: "Entertainment up 9%", iconPath: "M3 20h18M6.5 20V12M12 20V7M17.5 20v-4", tint: "oklch(94% 0.04 250)", fg: "oklch(45% 0.12 250)", top: "452px", left: "auto", right: "-8px", delay: "7.2s" },
];

export const HERO_SCREEN_ORDER = [
  "dashboard",
  "renewals",
  "renewals",
  "savings",
  "analytics",
] as const;

/* ---------------- Problem section ---------------- */

const dim = "oklch(97% 0.008 80)";
const line = "oklch(93% 0.01 80)";

export const getProblemDefs = (p: PriceFn) => [
  {
    num: "01",
    iconPath: "M4 6h16M4 12h16M4 18h9M17.5 17.5l3 3M20.5 17.5l-3 3",
    title: "Forgotten subscriptions",
    body: "You sign up once and keep paying long after you stopped using the service.",
    visualLabel: "Still charging, barely used",
    fix: "Surfaces every recurring charge it finds, with usage evidence on the ones worth dropping.",
    fixShort: "Finds every charge, with usage evidence",
    rows: [
      { badge: "N", title: "Netflix Premium", meta: "4 hrs watched this month", amount: p("₹649", "$15.49"), tint: "oklch(93% 0.05 25)", fg: "oklch(45% 0.16 25)", bg: "#fff", border: "oklch(88% 0.05 40)", amountColor: "oklch(48% 0.14 32)", opacity: "1", delay: "0s" },
      { badge: "D", title: "Dropbox Plus", meta: "Last opened in March", amount: p("₹1,000", "$11.99"), tint: "oklch(93% 0.04 250)", fg: "oklch(45% 0.13 250)", bg: dim, border: line, amountColor: "oklch(45% 0.012 80)", opacity: "0.75", delay: "0.08s" },
      { badge: "A", title: "Audible", meta: "No activity in 90 days", amount: p("₹199", "$14.95"), tint: "oklch(94% 0.04 60)", fg: "oklch(48% 0.12 55)", bg: dim, border: line, amountColor: "oklch(45% 0.012 80)", opacity: "0.55", delay: "0.16s" },
    ],
  },
  {
    num: "02",
    iconPath: "M3 20h18M6.5 20V11M12 20V6M17.5 20v-5",
    title: "Unclear total spend",
    body: "Each charge feels small until you see them added together in one place.",
    visualLabel: "Small charges, one big total",
    fix: "One monthly total and an annual projection, kept current as renewals confirm.",
    fixShort: "One monthly total, one annual projection",
    rows: [
      { badge: "5", title: "Five small charges", meta: "Each under " + p("₹700", "$16"), amount: p("₹2,986", "$52.10"), tint: "oklch(95% 0.015 80)", fg: "oklch(45% 0.012 80)", bg: dim, border: line, amountColor: "oklch(45% 0.012 80)", opacity: "1", delay: "0s" },
      { badge: "3", title: "Three larger ones", meta: "Adobe, Notion, Google One", amount: p("₹1,282", "$22.35"), tint: "oklch(95% 0.015 80)", fg: "oklch(45% 0.012 80)", bg: dim, border: line, amountColor: "oklch(45% 0.012 80)", opacity: "1", delay: "0.08s" },
      { badge: "₹", title: "What it actually is", meta: p("₹51,216 a year", "$893 a year"), amount: p("₹4,268", "$74.45"), tint: "oklch(94% 0.03 175)", fg: "oklch(38% 0.075 175)", bg: "oklch(96% 0.02 175)", border: "oklch(86% 0.04 175)", amountColor: "oklch(35% 0.075 175)", opacity: "1", delay: "0.16s" },
    ],
  },
  {
    num: "03",
    iconPath: "M12 21a9 9 0 1 1 9-9M12 7.5V12l3 2M18 16v3M18 21.5v.01",
    title: "Surprise renewals",
    body: "Renewals and trial endings arrive at the wrong moment, already charged.",
    visualLabel: "The week ahead",
    fix: "A renewal timeline with reminders — and an opt-in alarm for the big ones.",
    fixShort: "Renewal timeline with reminders",
    rows: [
      { badge: "2d", title: "Adobe trial converts", meta: "Becomes a paid plan on 11 Aug", amount: p("₹1,949", "$22.99"), tint: "oklch(93% 0.05 15)", fg: "oklch(45% 0.15 15)", bg: "#fff", border: "oklch(88% 0.05 40)", amountColor: "oklch(48% 0.14 32)", opacity: "1", delay: "0s" },
      { badge: "3d", title: "Netflix renews", meta: "Fri, 14 Aug · reminder on", amount: p("₹649", "$15.49"), tint: "oklch(93% 0.05 25)", fg: "oklch(45% 0.16 25)", bg: dim, border: line, amountColor: "oklch(45% 0.012 80)", opacity: "1", delay: "0.08s" },
      { badge: "6d", title: "Spotify renews", meta: "Mon, 17 Aug · no reminder", amount: p("₹179", "$16.99"), tint: "oklch(93% 0.06 145)", fg: "oklch(42% 0.13 145)", bg: dim, border: line, amountColor: "oklch(45% 0.012 80)", opacity: "0.8", delay: "0.16s" },
    ],
  },
  {
    num: "04",
    iconPath: "M3 5.5h8v6H3zM13 5.5h8v4h-8zM3 14h6v4.5H3zM11 12.5h10v6H11z",
    title: "Scattered billing info",
    body: "Receipts, invoices, and payment notices are spread across inboxes and apps.",
    visualLabel: "Where the evidence lives",
    fix: "Reads billing signals from your sources and turns them into one reviewed list.",
    fixShort: "Billing signals become one reviewed list",
    rows: [
      { badge: "G", title: "Gmail receipts", meta: "38 billing emails this year", amount: "Scan", tint: "oklch(93% 0.05 25)", fg: "oklch(45% 0.16 25)", bg: dim, border: line, amountColor: "oklch(45% 0.075 175)", opacity: "1", delay: "0s" },
      { badge: "↑", title: "Card statement", meta: "CSV or PDF import", amount: "Upload", tint: "oklch(93% 0.04 250)", fg: "oklch(45% 0.13 250)", bg: dim, border: line, amountColor: "oklch(45% 0.075 175)", opacity: "1", delay: "0.08s" },
      { badge: "✓", title: "One reviewed list", meta: "8 subscriptions, confirmed by you", amount: "Saved", tint: "oklch(90% 0.07 165)", fg: "oklch(38% 0.11 165)", bg: "oklch(96% 0.025 165)", border: "oklch(88% 0.05 165)", amountColor: "oklch(40% 0.11 165)", opacity: "1", delay: "0.16s" },
    ],
  },
];

/* ---------------- How it works ---------------- */

export const getHowSteps = (p: PriceFn) => [
  {
    num: "01",
    title: "Connect or add",
    panelLabel: "Choose a source",
    body: "Connect a supported source, import a statement, or add a service by hand. Source access is read-only and you can disconnect it anytime.",
    points: ["Gmail receipts and renewal notices", "Statement import for anything else", "Manual entry with no source at all"],
    rows: [
      { badge: "G", title: "Gmail", meta: "Read-only receipt scan", tag: "Connect", tint: "oklch(93% 0.05 25)", fg: "oklch(45% 0.16 25)", tagColor: teal },
      { badge: "↑", title: "Statement import", meta: "CSV or PDF", tag: "Upload", tint: "oklch(93% 0.04 250)", fg: "oklch(45% 0.13 250)", tagColor: teal },
      { badge: "+", title: "Add manually", meta: "From the catalog or free-form", tag: "Add", tint: "oklch(94% 0.01 80)", fg: "oklch(35% 0.01 80)", tagColor: teal },
    ],
  },
  {
    num: "02",
    title: "Review and organize",
    panelLabel: "Review before import",
    body: "Everything detected waits for your confirmation. Fix an amount, correct a date, or drop what is not yours before it reaches your account.",
    points: ["Nothing is saved until you approve it", "Edit plan, amount, and renewal date inline", "Reject anything that is not a subscription"],
    rows: [
      { badge: "N", title: "Netflix Premium", meta: p("₹649 · monthly", "$15.49 · monthly"), tag: "Keep", tint: "oklch(93% 0.05 25)", fg: "oklch(45% 0.16 25)", tagColor: "oklch(45% 0.12 160)" },
      { badge: "S", title: "Spotify Duo", meta: p("₹179 · monthly", "$14.99 · monthly"), tag: "Keep", tint: "oklch(93% 0.06 145)", fg: "oklch(42% 0.13 145)", tagColor: "oklch(45% 0.12 160)" },
      { badge: "?", title: "One-off purchase", meta: "Not recurring", tag: "Discard", tint: "oklch(94% 0.01 80)", fg: "oklch(45% 0.01 80)", tagColor: "oklch(55% 0.02 80)" },
    ],
  },
  {
    num: "03",
    title: "Understand and act",
    panelLabel: "Your spending, explained",
    body: "See recurring spend by month, category, and service — with renewals ahead of you and a weekly summary of what changed.",
    points: ["Monthly and annual totals kept current", "Renewal reminders on the channels you choose", "Weekly insights instead of constant alerts"],
    rows: [
      { badge: "₹", title: p("₹4,268 this month", "$74.45 this month"), meta: p("₹51,216 projected annually", "$893 projected annually"), tag: "+9%", tint: "oklch(94% 0.03 175)", fg: "oklch(38% 0.075 175)", tagColor: "oklch(55% 0.14 40)" },
      { badge: "◷", title: "2 renewals this week", meta: "Netflix 14 Aug · Spotify 17 Aug", tag: "Reminders on", tint: "oklch(94% 0.04 250)", fg: "oklch(45% 0.12 250)", tagColor: teal },
      { badge: "↓", title: p("₹1,140 possible savings", "$13.40 possible savings"), meta: "Across 3 subscriptions", tag: "Review", tint: "oklch(93% 0.06 160)", fg: "oklch(40% 0.11 160)", tagColor: "oklch(45% 0.12 160)" },
    ],
  },
];

/* ---------------- Payoff / analytics band ---------------- */

export const getAnalytics = (usd: boolean) => ({
  projEnd: usd ? "$1,001" : "₹57,400",
  projDelta: usd ? "+$108" : "+₹6,184",
  gridLines: [40, 82, 124, 166],
  months: ["Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb"].map((label, i) => ({
    label,
    weight: i === 6 ? 700 : 500,
    color: i === 6 ? "oklch(80% 0.07 175)" : "oklch(68% 0.02 175)",
  })),
  categories: [
    { name: "Entertainment", amount: usd ? "$32.20" : "₹1,847", pct: "72%", pctLabel: "43%", bg: "oklch(55% 0.13 25)", note: "3 services · Netflix carries two thirds of it" },
    { name: "Productivity", amount: usd ? "$19.50" : "₹1,120", pct: "48%", pctLabel: "26%", bg: "oklch(50% 0.09 175)", note: "2 services · one trial converts in 2 days" },
    { name: "Cloud storage", amount: usd ? "$13.10" : "₹749", pct: "32%", pctLabel: "18%", bg: "oklch(58% 0.1 250)", note: "2 services · plans overlap on the same files" },
    { name: "Music", amount: usd ? "$9.65" : "₹552", pct: "24%", pctLabel: "13%", bg: "oklch(60% 0.12 145)", note: "1 service · unchanged since March" },
  ],
  changes: [
    { initial: "N", name: "Netflix Premium", reason: "Plan price rose at renewal", delta: usd ? "+$2.50" : "+₹150", now: usd ? "now $15.49" : "now ₹649", tint: "oklch(93% 0.05 25)", fg: "oklch(45% 0.16 25)", deltaColor: "oklch(48% 0.15 32)" },
    { initial: "A", name: "Adobe CC", reason: "Trial converts on 11 Aug", delta: usd ? "+$22.99" : "+₹1,949", now: "first charge", tint: "oklch(93% 0.05 15)", fg: "oklch(45% 0.15 15)", deltaColor: "oklch(48% 0.15 32)" },
    { initial: "S", name: "Spotify Duo", reason: "Moved from Individual", delta: usd ? "+$2.00" : "+₹60", now: usd ? "now $16.99" : "now ₹179", tint: "oklch(93% 0.06 145)", fg: "oklch(42% 0.13 145)", deltaColor: "oklch(48% 0.15 32)" },
    { initial: "D", name: "Dropbox", reason: "Cancelled after review", delta: usd ? "−$11.99" : "−₹1,000", now: "removed", tint: "oklch(93% 0.04 250)", fg: "oklch(45% 0.13 250)", deltaColor: "oklch(45% 0.12 160)" },
  ],
  verdictTitle: "Entertainment is driving the whole increase.",
  verdictBody: usd
    ? "Two plans renewed higher this quarter, adding $4.60 a month. Everything else is flat — so one decision, not eight, changes your year."
    : "Two plans renewed higher this quarter, adding ₹380 a month. Everything else is flat — so one decision, not eight, changes your year.",
  stats: [
    { label: "This month", value: usd ? "$74.45" : "₹4,268", note: "Across 8 active subscriptions", color: "oklch(22% 0.01 80)" },
    { label: "Annual projection", value: usd ? "$893" : "₹51,216", note: "Updated as renewals confirm", color: "oklch(22% 0.01 80)" },
    { label: "Change vs last month", value: "+9%", note: "Two renewals came in higher", color: "oklch(52% 0.11 62)" },
    { label: "Possible savings", value: usd ? "$39" : "₹2,250", note: "Across 5 ranked ideas", color: "oklch(42% 0.12 160)" },
  ],
});

/* ---------------- Features (home grid) ---------------- */

export const FEATURES_GRID = [
  { icon: "◎", title: "Subscription discovery", body: "Source-assisted detection that proposes services, then waits for your review.", tint: "oklch(94% 0.03 175)", fg: "oklch(38% 0.075 175)" },
  { icon: "⊞", title: "Regional plan catalog", body: "Add a known service in three taps, with a suggested plan and amount you can edit.", tint: "oklch(94% 0.04 250)", fg: "oklch(42% 0.12 250)" },
  { icon: "✎", title: "Manual entry", body: "Anything the catalog does not cover, added by hand with any billing cycle.", tint: "oklch(94% 0.01 80)", fg: "oklch(38% 0.01 80)" },
  { icon: "◱", title: "Spend analytics", body: "Monthly, annual, category, and per-service views built from confirmed data.", tint: "oklch(94% 0.05 100)", fg: "oklch(46% 0.1 80)" },
  { icon: "◷", title: "Renewal tracking", body: "A timeline of what is next, trials flagged before they convert to paid.", tint: "oklch(94% 0.04 60)", fg: "oklch(48% 0.12 55)" },
  { icon: "◉", title: "Reminders that act", body: "Push, email, or SMS per subscription — snooze, review, or cancel from the notification.", tint: "oklch(94% 0.03 175)", fg: "oklch(38% 0.075 175)" },
  { icon: "◑", title: "Renewal alarms", body: "Opt-in full-screen alarm for the charges you cannot afford to miss.", tint: "oklch(95% 0.04 62)", fg: "oklch(50% 0.13 62)" },
  { icon: "◈", title: "Savings & insights", body: "Ranked savings ideas with the evidence behind each one, and a weekly recap.", tint: "oklch(93% 0.06 160)", fg: "oklch(40% 0.11 160)" },
];

/* ---------------- Features page (detail rows) ---------------- */

export const FEATURE_DETAIL = [
  { kicker: "Discover", title: "Find the subscriptions you forgot about.", body: "Source-assisted discovery reads billing signals you already receive and proposes the services behind them. You decide what is real.", points: ["Read-only source access", "Every suggestion reviewed before import", "Reject anything that is not a subscription"], variant: "subscriptions", tint: "oklch(94% 0.03 175)", fg: "oklch(38% 0.075 175)" },
  { kicker: "Add faster", title: "The catalog fills in the boring parts.", body: "Pick a service, pick the regional plan, confirm the renewal — done. The suggested plan and amount stay editable, because pricing changes.", points: ["Popular services in your region, one tap each", "Suggested plan and amount you can override", "Add custom for anything not listed"], variant: "catalog", tint: "oklch(94% 0.04 250)", fg: "oklch(42% 0.12 250)" },
  { kicker: "Understand", title: "See the full spending picture.", body: "Monthly, annual, category, and service views built from the same confirmed data — so the totals always agree with each other.", points: ["Six-month trend at a glance", "Category breakdown, drillable to a service", "Annual projection kept current"], variant: "analytics", tint: "oklch(94% 0.05 100)", fg: "oklch(46% 0.1 80)" },
  { kicker: "Stay ahead", title: "Renewals and trials, before they bill.", body: "A timeline of what is coming with reminder coverage shown per subscription, so you can see which ones would catch you off guard.", points: ["Trial endings surfaced early", "Reminders by push, email, or SMS", "Per-subscription lead time"], variant: "renewals", tint: "oklch(94% 0.04 60)", fg: "oklch(48% 0.12 55)" },
  { kicker: "Reminders", title: "A reminder you can act on, not just read.", body: "Push, email, or SMS per subscription with the lead time you choose — and the notification itself carries snooze, review, and cancel.", points: ["Channel and lead time set per subscription", "Coverage gaps shown on the renewals screen", "Weekly email digest instead of daily noise"], variant: "reminders", tint: "oklch(94% 0.03 175)", fg: "oklch(38% 0.075 175)" },
  { kicker: "Renewal alarm", title: "For charges you cannot miss, an alarm.", body: "Opt-in per subscription and reserved for renewals above your threshold. It rings through silent and Do Not Disturb — at most twice, and “Keep it” ends it in one tap.", points: ["Opt-in only, never on by default", "Maximum two rings per renewal", "Cancel, snooze, or keep from the alarm itself"], variant: "alarm", tint: "oklch(95% 0.04 62)", fg: "oklch(50% 0.13 62)" },
  { kicker: "Savings & insights", title: "Savings ideas, ranked and evidenced.", body: "The app totals what you could save, promotes one place to start, and shows the usage or price history behind every suggestion. Snooze or keep anything — undo is always there.", points: ["One promoted card so you know where to begin", "Evidence attached to every insight", "Weekly recap of what changed"], variant: "savings", tint: "oklch(93% 0.06 160)", fg: "oklch(40% 0.11 160)" },
] as const;

/* ---------------- FAQ ---------------- */

export const ALL_FAQS = [
  { id: "free", cat: "Product", q: "Is it free?", a: "Yes. The beta is completely free, with no card and no trial clock. If paid extras arrive later, everything you use today keeps working." },
  { id: "personal", cat: "Privacy", q: "Does it read my personal emails?", a: "It only searches for billing emails such as receipts, invoices and renewal notices, and it never reads the rest of your inbox. Gmail access is read-only, so it can't send, delete or change anything, and you can disconnect it anytime." },
  { id: "iphone", cat: "Product", q: "When is the iPhone app coming?", a: "Android is in beta now and iPhone is next. Join the iPhone waitlist and we'll email you once, the day it's ready." },
  { id: "apk", cat: "Product", q: "Can I install it without the Play Store?", a: "Yes. Download the APK from the download page and open it on your phone (Android 9 or newer). If you later switch to the Play Store version, uninstall the APK first, since the two are signed differently." },
  { id: "q1", cat: "Product", q: "What does SubDrip do?", a: "It brings your recurring subscriptions into one place, shows what they cost monthly and annually, tracks upcoming renewals and trials, and summarises what changed each week." },
  { id: "q2", cat: "Product", q: "Can I use it without connecting Gmail?", a: "Yes. Pick the service and the plan, and the current Indian price is already filled in, so it takes two taps. Anything not in the catalog can be typed in. You still get the calendar, the reminders and the monthly total, with no inbox access at all." },
  { id: "q3", cat: "Product", q: "Can I add services that are not in the catalog?", a: "Yes. Manual entry accepts any name, amount, billing cycle, and renewal date, including services with unusual billing periods." },
  { id: "q4", cat: "Sources", q: "What happens when I connect Gmail?", a: "The app looks for receipts and renewal notices to suggest subscriptions. Access is read-only, suggestions are shown to you for review, and nothing is imported until you approve it." },
  { id: "q5", cat: "Sources", q: "Do I need to connect a bank account?", a: "No. The app never asks for banking credentials and does not connect to bank accounts." },
  { id: "q6", cat: "Sources", q: "Can I disconnect a source later?", a: "Yes. Disconnecting is available in settings at any time, and it stops any further scanning immediately. Subscriptions you already confirmed stay in your list unless you delete them." },
  { id: "q7", cat: "Privacy", q: "What information is stored?", a: "The subscriptions you confirm, the details you edit, your reminder preferences, and basic account information. The privacy page explains each category in plain language." },
  { id: "q8", cat: "Privacy", q: "How do I delete my data?", a: "Delete your account from inside the app, or email the privacy address if you cannot access it. The data deletion page walks through both routes and what each removes." },
  { id: "q9", cat: "Behavior", q: "Can I change an amount or renewal date?", a: "Yes. Every field on a subscription is editable, including ones the app detected for you. Your edit always wins over the detected value." },
  { id: "q10", cat: "Behavior", q: "Are catalog plan prices guaranteed to be current?", a: "No. Catalog prices are suggestions to speed up adding a service; providers change pricing without notice. Always confirm the amount against your own billing." },
  { id: "q11", cat: "Behavior", q: "How are reminders created?", a: "Each subscription can carry a reminder ahead of its renewal, delivered by push, email, or SMS. You choose the lead time and the channel per subscription." },
  { id: "q12", cat: "Support", q: "What should I do if a sync fails?", a: "Retry the source from settings first. If it keeps failing, send us the service name and roughly when it started — the support form has a topic for exactly this." },
  { id: "q13", cat: "Support", q: "How do I report an incorrect subscription?", a: "Open the subscription, use “Report incorrect detail”, and tell us what is wrong. You can also correct it yourself immediately — the report helps us improve detection." },
];

export const FAQ_CAT_LABELS = ["All", "Product", "Sources", "Privacy", "Behavior", "Support"];

/* ---------------- Privacy ---------------- */

export const PRIVACY_PRACTICES = [
  { title: "Read-only, always", body: "A connected source is read for receipts and renewal notices. Nothing is sent, changed, or deleted." },
  { title: "Nothing lands without your approval", body: "Detections arrive as suggestions. You confirm, edit, or reject each one before it becomes a subscription." },
  { title: "No bank credentials, ever", body: "The app does not ask for banking logins or card numbers, and does not connect to bank accounts." },
  { title: "Leave whenever you want", body: "Disconnect a source, export your list, or delete your account and data from inside the app." },
];

export const PRIVACY_FLOW = [
  { badge: "G", title: "Gmail connected", meta: "Read-only receipt scan", tag: "Read-only", bg: "#fff", border: "oklch(92% 0.01 80)", tint: "oklch(93% 0.05 25)", fg: "oklch(45% 0.16 25)", tagColor: "oklch(45% 0.075 175)", delay: "0s" },
  { badge: "3", title: "3 subscriptions detected", meta: "Waiting for your review", tag: "Pending", bg: "#fff", border: "oklch(92% 0.01 80)", tint: "oklch(94% 0.04 250)", fg: "oklch(45% 0.12 250)", tagColor: "oklch(55% 0.09 62)", delay: "0.12s" },
  { badge: "✓", title: "2 added, 1 discarded", meta: "Exactly what you approved", tag: "Saved", bg: "oklch(96% 0.025 165)", border: "oklch(88% 0.05 165)", tint: "oklch(90% 0.07 165)", fg: "oklch(38% 0.11 165)", tagColor: "oklch(42% 0.11 165)", delay: "0.24s" },
];

export const PRIVACY_PILLARS = [
  { icon: "◉", title: "Read-only access", body: "Sources are read, never written to or modified." },
  { icon: "✓", title: "Review before import", body: "Nothing enters your list without your confirmation." },
  { icon: "⊘", title: "No bank logins", body: "Banking credentials are never requested." },
  { icon: "⊗", title: "Delete anytime", body: "Remove your account and data whenever you choose." },
];

export const PRIVACY_SECTIONS = [
  { id: "p1", title: "What a source connection means", items: ["A source is a place billing information already reaches you — for example, your email receipts.", "Access is read-only: the app reads, it does not send, delete, or modify anything.", "You choose when to connect, and you can disconnect at any time from settings."] },
  { id: "p2", title: "What the app may access", items: ["Messages that look like receipts, invoices, or renewal notices, to identify a service, amount, and date.", "Basic account information used to sign you in.", "Device and diagnostic information needed to keep the app running correctly."] },
  { id: "p3", title: "What the app does not access", items: ["Bank logins, card numbers, or payment credentials of any kind.", "Personal messages unrelated to billing.", "Your contacts, photos, or location."] },
  { id: "p4", title: "Review before anything is imported", items: ["Detected subscriptions are shown as suggestions, not entries.", "You confirm, edit, or reject each one before it enters your list.", "A rejected suggestion is not stored as a subscription."] },
  { id: "p5", title: "Storage, retention, and processors", items: ["Confirmed subscriptions and your preferences are stored so the app can show them across your devices.", "Third-party processors are used for infrastructure and delivery of reminders; each is bound by contract.", "The full privacy policy names the categories and the retention behavior in detail."] },
  { id: "p6", title: "Your controls", items: ["Disconnect any source at any time.", "Export your subscription list.", "Delete your account and associated data from inside the app."] },
  { id: "p7", title: "Google user data & Limited Use", items: ["SubDrip's use and transfer of information received from Google APIs adheres to the Google API Services User Data Policy, including the Limited Use requirements.", "Gmail data is used only to detect subscriptions and recurring charges for you — never for advertising, and it is never sold.", "Humans do not read your messages except with your explicit consent for support, when required for security, or to comply with law."] },
];

/* ---------------- Terms of service ---------------- */

export const TERMS_EFFECTIVE = "16 August 2026";

export const TERMS_SECTIONS = [
  { id: "t1", title: "Agreement", items: ["These terms are an agreement between you and SubDrip. By creating an account or using the app or website, you accept them.", "SubDrip is in early access: features are still being built, and parts of the service may change or be withdrawn."] },
  { id: "t2", title: "What SubDrip is — and is not", items: ["SubDrip finds and organizes recurring charges from sources you connect and entries you add, and reminds you before renewals.", "It is an informational tool. It is not financial, legal, or tax advice, and it never moves money, cancels services, or transacts on your behalf.", "Detected amounts, cycles, and dates can be wrong or incomplete. Verify with the service provider before making decisions."] },
  { id: "t3", title: "Your account", items: ["Sign in with an email address or Google account you control, and keep that access secure — activity under your account is your responsibility.", "You must be at least 18, or the age of majority where you live.", "One account per person; don't share or transfer it."] },
  { id: "t4", title: "Connected sources & Google data", items: ["Connecting Gmail grants SubDrip a read-only scope. The app reads messages that match billing patterns — receipts, invoices, renewal notices — to suggest subscriptions you then confirm or reject.", "SubDrip's use and transfer of information received from Google APIs adheres to the Google API Services User Data Policy, including the Limited Use requirements.", "You can disconnect a source at any time from settings; disconnection stops all further reading."] },
  { id: "t5", title: "Acceptable use", items: ["Don't misuse the service: no unlawful use, no probing or disrupting our systems, no automated scraping, and no reverse engineering except where the law allows it.", "Don't use SubDrip to process someone else's mailbox or data without their permission.", "Don't resell or white-label the service without a written agreement."] },
  { id: "t6", title: "Fees", items: ["SubDrip is free during early access.", "Paid features may be introduced later. If they are, pricing will be shown clearly in the app first — nothing converts to paid silently."] },
  { id: "t7", title: "Your data", items: ["Your data stays yours. You grant SubDrip permission to process it solely to run the service for you, as described in the privacy policy.", "You can delete your account and everything associated with it at any time — see the data-deletion page for both routes."] },
  { id: "t8", title: "Availability & changes", items: ["The service is provided on an early-access basis and may be interrupted for maintenance or updates.", "Features may change, be paused by a remote switch, or be removed as the product evolves."] },
  { id: "t9", title: "Disclaimers & limitation of liability", items: ["The service is provided “as is” and “as available”, without warranties of any kind, to the extent permitted by law.", "SubDrip is not liable for losses that result from relying on detected data, missed or incorrect reminders, or third-party charges — renewal decisions and payments remain between you and the service provider.", "To the extent permitted by law, SubDrip's total liability for any claim is limited to the greater of the amount you paid for the service in the past 12 months, or ₹1,000."] },
  { id: "t10", title: "Termination", items: ["You can stop using SubDrip and delete your account at any time.", "We may suspend or terminate accounts that violate these terms or put the service or other users at risk, with notice where practical."] },
  { id: "t11", title: "Governing law", items: ["These terms are governed by the laws of India, and disputes are subject to the jurisdiction of the courts at New Delhi, India."] },
  { id: "t12", title: "Changes to these terms", items: ["We may update these terms as the product evolves. The effective date above always reflects the current version.", "For material changes we'll tell you in the app before they take effect; continuing to use SubDrip after that means you accept the updated terms."] },
  { id: "t13", title: "Contact", items: ["Questions about these terms: support@subdrip.app.", "Privacy and data requests: privacy@subdrip.app."] },
];

/* ---------------- Data deletion ---------------- */

export const DELETION_ROUTES = [
  { kicker: "In the app", title: "Delete from settings", steps: ["Open Profile, then Data & privacy.", "Choose Delete account.", "Confirm — deletion happens immediately.", "You are signed out on every device."] },
  { kicker: "No app access", title: "Request by email", steps: ["Email privacy@subdrip.app from your account address.", "Include the email address the account uses.", "We confirm receipt and process the deletion.", "You get a confirmation when it completes."] },
];

export const DELETED_ITEMS = [
  "Your account and sign-in identity.",
  "Every subscription, amount, and renewal date you saved.",
  "Reminder settings and delivery preferences.",
  "Source connections and their access tokens.",
];

export const RETAINED_ITEMS = [
  "Records we are legally required to keep, for as long as required.",
  "Aggregated, non-identifying usage statistics.",
  "Support correspondence, where needed to resolve a dispute.",
];

/* ---------------- Support ---------------- */

export const SUPPORT_TOPICS = [
  "Gmail connection",
  "Incorrect subscription",
  "Account or sign-in",
  "Data deletion",
  "Something else",
];

export const SUPPORT_LINKS = [
  { title: "Gmail connection trouble", body: "Reconnect, re-scan, or disconnect a source that stopped working.", href: "/faq" },
  { title: "Fix an incorrect subscription", body: "Correct a detected amount, cycle, or renewal date.", href: "/faq" },
  { title: "Delete my data", body: "Both routes, and exactly what each one removes.", href: "/data-deletion" },
  { title: "Privacy & security", body: "What is accessed, what is not, and who processes it.", href: "/privacy" },
];

/* ---------------- Live demo ---------------- */

export const DEMO_SCREENS = [
  { k: "dashboard", l: "Dashboard", d: "Spend, calendar, savings" },
  { k: "subscriptions", l: "Subscriptions", d: "Every service, filtered" },
  { k: "analyticsHub", l: "Analytics", d: "Projection and spend tree" },
  { k: "renewals", l: "Renewals", d: "Next charge, reminders" },
  { k: "catalogStart", l: "Add a service", d: "Brand catalog quick-add" },
  { k: "savingsInsights", l: "Savings", d: "Ranked ideas with evidence" },
  { k: "profileNotifications", l: "Reminders", d: "Channels and alarms" },
] as const;

export type DemoScreenKey =
  | (typeof DEMO_SCREENS)[number]["k"]
  | "welcomeAuth"
  | "googleSignIn"
  | "emailOtp"
  | "passkeySignIn"
  | "gmailConnect"
  | "scan"
  | "review"
  | "reveal";

export const DEMO_TIPS: Record<
  string,
  { title: string; body: string; tries: string[] }
> = {
  flow: {
    title: "Start at sign-in and walk the whole thing.",
    body: "The demo opens where a new user would. Take it in order, or use the chips above to jump straight to a screen.",
    tries: ["Sign in with Google — no real account is touched", "Connect Gmail and watch the scan run", "Review what it found, then see your total"],
  },
  dashboard: {
    title: "The one number, then the detail.",
    body: "Monthly spend with the trend ring, a stat row, the renewal calendar, and savings opportunities.",
    tries: ["Scroll down to the renewal calendar", "Tap a highlighted day to see what renews", "Open a savings card from the bottom"],
  },
  subscriptions: {
    title: "Every recurring service in one list.",
    body: "Filter by trials, annual, monthly, or the ones that still need review.",
    tries: ["Switch to the Trials filter", "Open a subscription for its full detail", "Use the add button to enter the catalog"],
  },
  analyticsHub: {
    title: "Where the year is heading.",
    body: "Projection curve, spend tree, category breakdown, monthly trend, and the annual cost leaderboard.",
    tries: ["Change the projection horizon chips", "Open the spend tree and drill into a category", "Tap the savings insights banner"],
  },
  renewals: {
    title: "Nothing renews by surprise.",
    body: "Next charge with a countdown, renewal load for the next four weeks, and reminder coverage.",
    tries: ["Tap “Remind me” on the next charge", "Set a channel in the reminder sheet", "Check which renewals have no reminder yet"],
  },
  catalogStart: {
    title: "Add a service in three taps.",
    body: "The catalog opens on the brands popular in your region, with search and category browsing.",
    tries: ["Pick Netflix, then choose a plan", "Edit the suggested amount on the confirm sheet", "Try “Add custom” for something unlisted"],
  },
  savingsInsights: {
    title: "Savings, ranked and evidenced.",
    body: "One promoted card tells you where to start; each idea carries the usage or price history behind it.",
    tries: ["Open the promoted card for its evidence", "Snooze one and undo it from the toast", "Walk the monthly recap story"],
  },
  profileNotifications: {
    title: "Reminders on your terms.",
    body: "Push, email, and SMS per subscription — plus the opt-in alarm for charges you cannot miss.",
    tries: ["Toggle a delivery channel", "Turn on the alarm for a high-value renewal", "Change the reminder lead time"],
  },
};

export const DEMO_NOTES = [
  "Every number is sample data — no account is created and nothing is connected.",
  "Screens scroll: swipe or scroll inside the phone to reach the rest of a page.",
  "The bottom tab bar works, so you can wander off any jump point.",
];

export const DEMO_FLOWS = [
  { num: "01", title: "Sign in and set up", body: "Google, email code, or passkey — then currency and account confirmation." },
  { num: "02", title: "Find your subscriptions", body: "Connect Gmail and watch the scan, or skip it and add services manually." },
  { num: "03", title: "Review before import", body: "Confirm, edit, or discard each detected subscription, then see your total." },
  { num: "04", title: "Live with it", body: "Renewals, reminders and alarms, catalog quick-add, analytics, savings recap." },
];
