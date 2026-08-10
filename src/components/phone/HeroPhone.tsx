"use client";

import type { CSSProperties } from "react";
import { useCurrency } from "@/lib/currency";

export type HeroPhoneVariant =
  | "dashboard"
  | "subscriptions"
  | "analytics"
  | "renewals"
  | "catalog"
  | "add"
  | "savings"
  | "reminders"
  | "alarm";

const teal = "oklch(40% 0.075 175)";
const sora = "var(--font-sora), sans-serif";

/* ---------- shared bits ---------- */

const toggleOn: CSSProperties = {
  width: 42,
  height: 25,
  borderRadius: 100,
  background: teal,
  display: "flex",
  alignItems: "center",
  padding: 3,
  justifyContent: "flex-end",
  flexShrink: 0,
};

function Knob({ size = 19 }: { size?: number }) {
  return (
    <div
      style={{ width: size, height: size, borderRadius: "50%", background: "#fff" }}
    />
  );
}

/* ---------- component ---------- */

export default function HeroPhone({
  variant = "dashboard",
}: {
  variant?: HeroPhoneVariant;
}) {
  const { p } = useCurrency();

  const m = {
    monthly: p("₹4,268", "$74.45"),
    annual: p("₹51,216", "$893"),
    avg: p("₹534", "$9.30"),
    netflix: p("₹649", "$15.49"),
    windowTotal: p("₹2,187", "$38.10"),
    projEnd: p("₹57,400", "$1,001"),
    projDelta: p("+₹6,184", "+$108"),
    savingsAvailable: p(
      "Up to ₹2,250/month available",
      "Up to $39/month available",
    ),
    savingsTotal: p("₹2,250", "$39.20"),
    savingsHeadline: p(
      "Save ₹410/month on duplicate storage",
      "Save $7.20/month on duplicate storage",
    ),
    startHere: p(
      "Netflix Premium costs ₹649 for 4 hrs watched",
      "Netflix Premium costs $15.49 for 4 hrs watched",
    ),
    payMethod: p("HDFC Credit Card •• 4821", "Visa •• 4821"),
    regionChip: p(
      "Prices shown for India · INR",
      "Prices shown for United States · USD",
    ),
    pushBody: p(
      "₹649 will be charged to HDFC •• 4821 on 14 Aug.",
      "$15.49 will be charged to Visa •• 4821 on 14 Aug.",
    ),
  };

  const v = variant;
  const tabScreens = ["dashboard", "subscriptions", "analytics", "renewals"];
  const showStatusBar = v !== "alarm";
  const showTabBar = tabScreens.includes(v);

  const tabDefs = [
    { key: "dashboard", label: "Home", shapeRadius: "6px" },
    { key: "analytics", label: "Analytics", shapeRadius: "50%" },
    { key: "renewals", label: "Renewals", shapeRadius: "4px" },
    { key: "subscriptions", label: "Subscriptions", shapeRadius: "50% 50% 50% 4px" },
  ];

  // August 2026 — 1 Aug is a Saturday
  const marks: Record<number, { mono: string; color: string }> = {
    14: { mono: "N", color: "oklch(56% 0.14 25)" },
    17: { mono: "S", color: "oklch(48% 0.13 145)" },
    27: { mono: "G", color: "oklch(48% 0.14 250)" },
  };
  const cells: {
    day: string;
    bg: string;
    ring: string;
    color: string;
    weight: number;
    marked: boolean;
    mono?: string;
    dotColor?: string;
  }[] = [];
  for (let i = 0; i < 6; i++)
    cells.push({
      day: "",
      bg: "transparent",
      ring: "none",
      color: "transparent",
      weight: 500,
      marked: false,
    });
  for (let d = 1; d <= 31; d++) {
    const mk = marks[d];
    const today = d === 11;
    cells.push({
      day: String(d),
      bg: mk ? "oklch(96% 0.02 175)" : "transparent",
      ring: today
        ? "1.5px solid oklch(70% 0.06 175)"
        : "1.5px solid transparent",
      color: mk ? "oklch(25% 0.03 175)" : "oklch(45% 0.01 80)",
      weight: mk || today ? 700 : 500,
      marked: !!mk,
      mono: mk ? mk.mono : "",
      dotColor: mk ? mk.color : "transparent",
    });
  }

  const catalogPopular = [
    { name: "Netflix", mono: "N", color: "oklch(52% 0.16 25)" },
    { name: "Spotify", mono: "S", color: "oklch(48% 0.14 145)" },
    { name: "Prime Video", mono: "PV", color: "oklch(52% 0.11 230)" },
    { name: "YouTube", mono: "YT", color: "oklch(50% 0.17 28)" },
    { name: "Google One", mono: "G1", color: "oklch(48% 0.14 250)" },
    { name: "Disney+", mono: "D+", color: "oklch(38% 0.13 265)" },
    { name: "Adobe CC", mono: "AC", color: "oklch(48% 0.16 15)" },
    { name: "JioHotstar", mono: "JH", color: "oklch(45% 0.13 295)" },
    { name: "iCloud+", mono: "iC", color: "oklch(50% 0.09 220)" },
  ];
  const catalogBrowse = [
    { name: "Entertainment", color: "oklch(55% 0.13 25)" },
    { name: "Music", color: "oklch(60% 0.12 145)" },
    { name: "Productivity", color: "oklch(50% 0.09 175)" },
    { name: "Cloud storage", color: "oklch(58% 0.1 250)" },
    { name: "Fitness", color: "oklch(62% 0.12 80)" },
  ];

  const subs = [
    { initial: "N", name: "Netflix", category: "Entertainment", meta: "renews 14 Aug", price: p("₹649", "$15.49"), tint: "oklch(93% 0.05 25)", fg: "oklch(45% 0.16 25)" },
    { initial: "S", name: "Spotify Duo", category: "Music", meta: "renews 17 Aug", price: p("₹179", "$16.99"), tint: "oklch(93% 0.06 145)", fg: "oklch(42% 0.13 145)" },
    { initial: "A", name: "Adobe CC", category: "Productivity", meta: "trial ends 11 Aug", price: p("₹1,949", "$22.99"), tint: "oklch(93% 0.05 15)", fg: "oklch(45% 0.15 15)" },
    { initial: "G", name: "Google One", category: "Storage", meta: "renews 27 Aug", price: p("₹210", "$2.99"), tint: "oklch(93% 0.05 250)", fg: "oklch(45% 0.14 250)" },
    { initial: "N", name: "Notion Plus", category: "Productivity", meta: "renews 5 Sep", price: p("₹420", "$10.00"), tint: "oklch(94% 0.01 80)", fg: "oklch(35% 0.01 80)" },
    { initial: "I", name: "iCloud+", category: "Storage", meta: "renews 9 Sep", price: p("₹75", "$0.99"), tint: "oklch(93% 0.03 220)", fg: "oklch(42% 0.09 220)" },
  ];

  const projLabels = ["Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb"].map(
    (label, i) => ({
      label,
      weight: i === 6 ? 700 : 500,
      color: i === 6 ? "oklch(35% 0.06 175)" : "oklch(60% 0.01 80)",
    }),
  );

  const cats = [
    { name: "Entertainment", amount: p("₹1,847", "$32.20"), pct: "72%", pctLabel: "43%", bg: "oklch(55% 0.13 25)" },
    { name: "Productivity", amount: p("₹1,120", "$19.50"), pct: "48%", pctLabel: "26%", bg: "oklch(50% 0.09 175)" },
    { name: "Cloud storage", amount: p("₹749", "$13.10"), pct: "32%", pctLabel: "18%", bg: "oklch(58% 0.1 250)" },
    { name: "Music", amount: p("₹552", "$9.65"), pct: "24%", pctLabel: "13%", bg: "oklch(60% 0.12 145)" },
  ];

  const loadBars = [
    { label: "Wk 1", amount: p("₹649", "$15"), height: 46, bg: "oklch(72% 0.06 175)", labelColor: "oklch(50% 0.01 80)" },
    { label: "Wk 2", amount: p("₹389", "$18"), height: 30, bg: "oklch(84% 0.04 175)", labelColor: "oklch(50% 0.01 80)" },
    { label: "Wk 3", amount: p("₹1,949", "$23"), height: 76, bg: "oklch(48% 0.09 175)", labelColor: "oklch(35% 0.06 175)" },
    { label: "Wk 4", amount: p("₹285", "$11"), height: 22, bg: "oklch(88% 0.03 175)", labelColor: "oklch(50% 0.01 80)" },
  ];

  const savingsItems = [
    { icon: "⊘", tint: "oklch(94% 0.04 250)", fg: "oklch(45% 0.12 250)", title: "Two cloud plans cover the same files", body: p("Drop one and save ₹410/mo", "Drop one and save $7.20/mo") },
    { icon: "↑", tint: "oklch(94% 0.05 40)", fg: "oklch(48% 0.13 40)", title: "Spotify went up at your last renewal", body: p("+₹60/mo since June", "+$2/mo since June") },
    { icon: "◷", tint: "oklch(93% 0.06 160)", fg: "oklch(40% 0.11 160)", title: "Adobe trial converts in 2 days", body: p("₹1,949/mo unless cancelled", "$22.99/mo unless cancelled") },
  ];

  const channels = [
    { icon: "◉", label: "Push", meta: "2 days before renewal", tint: "oklch(94% 0.03 175)", fg: "oklch(38% 0.075 175)", on: true },
    { icon: "✉", label: "Email", meta: "Weekly digest + renewals", tint: "oklch(94% 0.04 250)", fg: "oklch(45% 0.12 250)", on: true },
    { icon: "✆", label: "SMS", meta: "High-value charges only", tint: "oklch(94% 0.01 80)", fg: "oklch(45% 0.01 80)", on: false },
  ];

  return (
    <div
      style={{
        width: 300,
        borderRadius: 40,
        background: "oklch(20% 0.01 80)",
        padding: 9,
      }}
    >
      <div
        style={{
          borderRadius: 32,
          overflow: "hidden",
          background: "oklch(97% 0.012 80)",
          height: 582,
          display: "flex",
          flexDirection: "column",
          position: "relative",
        }}
      >
        {showStatusBar && (
          <div
            style={{
              height: 32,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 22px",
              fontSize: 11,
              fontWeight: 600,
              color: "oklch(35% 0.01 80)",
              flexShrink: 0,
            }}
          >
            <span>9:41</span>
            <span style={{ letterSpacing: 1 }}>▮▮▮</span>
          </div>
        )}

        <div
          className="phone-scroll"
          style={{
            flex: 1,
            overflowY: "auto",
            overflowX: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* ============ DASHBOARD ============ */}
          {v === "dashboard" && (
            <div style={{ flex: 1, padding: "6px 16px 16px", display: "flex", flexDirection: "column", gap: 15 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: 12, color: "oklch(52% 0.01 80)" }}>Good afternoon</div>
                  <div style={{ fontFamily: sora, fontSize: 17, fontWeight: 700, color: "oklch(22% 0.01 80)" }}>Your subscriptions</div>
                </div>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: teal, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontFamily: sora, fontWeight: 700, fontSize: 13 }}>AD</div>
              </div>

              <div style={{ position: "relative", overflow: "hidden", flexShrink: 0, borderRadius: 24, padding: 20, background: "linear-gradient(150deg, oklch(45% 0.085 172), oklch(32% 0.07 184))", color: "#fff", boxShadow: "0 14px 34px -14px oklch(40% 0.08 175 / 0.6)" }}>
                <div style={{ position: "absolute", top: -60, right: -44, width: 180, height: 180, borderRadius: "50%", background: "radial-gradient(circle, oklch(72% 0.1 168 / 0.38), transparent 70%)" }} />
                <div style={{ position: "relative", display: "flex", alignItems: "center", gap: 16 }}>
                  <div style={{ width: 78, height: 78, borderRadius: "50%", background: "conic-gradient(#fff 62%, rgba(255,255,255,0.2) 0)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <div style={{ width: 62, height: 62, borderRadius: "50%", background: "oklch(37% 0.075 178)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ fontFamily: sora, fontSize: 13, fontWeight: 800, lineHeight: 1 }}>+9%</span>
                      <span style={{ fontSize: 7.5, color: "oklch(88% 0.03 175)", marginTop: 3, textTransform: "uppercase", letterSpacing: "0.05em" }}>vs last mo</span>
                    </div>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: "oklch(88% 0.03 175)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Monthly spend</div>
                    <div style={{ fontFamily: sora, fontSize: 33, fontWeight: 800, lineHeight: 1.05, marginTop: 5 }}>{m.monthly}</div>
                    <div style={{ fontSize: 12, color: "oklch(90% 0.03 175)", marginTop: 5 }}>{m.annual} / year</div>
                  </div>
                </div>
                <div style={{ position: "relative", marginTop: 15, width: "100%", padding: 12, borderRadius: 14, border: "1px solid rgba(255,255,255,0.28)", background: "rgba(255,255,255,0.14)", textAlign: "center", fontSize: 13.5, fontWeight: 700 }}>View analytics →</div>
              </div>

              <div style={{ background: "#fff", borderRadius: 20, padding: "15px 6px", display: "flex", alignItems: "center", flexShrink: 0 }}>
                {[
                  { n: "8", l: "Active" },
                  { n: "5", l: "Categories" },
                  { n: m.avg, l: "Avg / sub" },
                ].map((st, i) => (
                  <div key={st.l} style={{ display: "contents" }}>
                    {i > 0 && (
                      <div style={{ width: 1, height: 28, background: "oklch(92% 0.008 80)" }} />
                    )}
                    <div style={{ flex: 1, textAlign: "center" }}>
                      <div style={{ fontFamily: sora, fontSize: 21, fontWeight: 800, color: "oklch(22% 0.01 80)", lineHeight: 1 }}>{st.n}</div>
                      <div style={{ fontSize: 10.5, color: "oklch(54% 0.01 80)", marginTop: 5 }}>{st.l}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ flexShrink: 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 9 }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: "oklch(22% 0.01 80)" }}>Renewal calendar</span>
                  <div style={{ width: 26, height: 26, borderRadius: 9, background: "oklch(95% 0.012 80)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ width: 7, height: 7, borderRight: "2px solid oklch(42% 0.05 175)", borderBottom: "2px solid oklch(42% 0.05 175)", transform: "rotate(45deg)", marginTop: -3 }} />
                  </div>
                </div>
                <div style={{ background: "#fff", borderRadius: 20, padding: 13 }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 9 }}>
                    <div style={{ width: 24, height: 24, borderRadius: 8, background: "oklch(96% 0.008 80)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <div style={{ width: 5, height: 5, borderLeft: "2px solid oklch(55% 0.01 80)", borderBottom: "2px solid oklch(55% 0.01 80)", transform: "rotate(45deg)", marginLeft: 2 }} />
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <div style={{ fontFamily: sora, fontSize: 13, fontWeight: 700, color: "oklch(22% 0.01 80)" }}>August 2026</div>
                      <div style={{ fontSize: 10, color: "oklch(52% 0.01 80)", marginTop: 1 }}>4 renewals · {m.windowTotal}</div>
                    </div>
                    <div style={{ width: 24, height: 24, borderRadius: 8, background: "oklch(94% 0.03 175)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <div style={{ width: 5, height: 5, borderRight: "2px solid oklch(42% 0.05 175)", borderTop: "2px solid oklch(42% 0.05 175)", transform: "rotate(45deg)", marginRight: 2 }} />
                    </div>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 1, marginBottom: 3 }}>
                    {["S", "M", "T", "W", "T", "F", "S"].map((w, i) => (
                      <div key={i} style={{ textAlign: "center", fontSize: 9, fontWeight: 700, color: "oklch(68% 0.01 80)" }}>{w}</div>
                    ))}
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 1 }}>
                    {cells.map((c, i) => (
                      <div key={i} style={{ aspectRatio: "1 / 1", borderRadius: 8, background: c.bg, border: c.ring, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 1 }}>
                        <span style={{ fontSize: 10, fontWeight: c.weight, color: c.color, lineHeight: 1 }}>{c.day}</span>
                        {c.marked && (
                          <div style={{ width: 12, height: 12, borderRadius: "50%", background: c.dotColor, color: "#fff", fontSize: 7, fontWeight: 700, fontFamily: sora, display: "flex", alignItems: "center", justifyContent: "center" }}>{c.mono}</div>
                        )}
                      </div>
                    ))}
                  </div>
                  <div style={{ height: 1, background: "oklch(94% 0.008 80)", margin: "10px 0" }} />
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 28, height: 28, borderRadius: 9, background: "oklch(56% 0.14 25)", color: "#fff", fontFamily: sora, fontWeight: 700, fontSize: 12, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>N</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 10, fontWeight: 700, color: teal, textTransform: "uppercase", letterSpacing: "0.02em" }}>Fri 14 · in 3 days</div>
                      <div style={{ fontSize: 12.5, fontWeight: 600, color: "oklch(22% 0.01 80)", marginTop: 2 }}>Netflix Premium</div>
                    </div>
                    <span style={{ fontSize: 12.5, fontWeight: 700, color: "oklch(22% 0.01 80)" }}>{m.netflix}</span>
                  </div>
                </div>
              </div>

              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "oklch(22% 0.01 80)", marginBottom: 9 }}>Savings opportunities</div>
                <div style={{ background: "oklch(95% 0.03 150)", borderRadius: 16, padding: 13 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "oklch(30% 0.08 150)" }}>{m.savingsHeadline}</div>
                  <div style={{ fontSize: 12, color: "oklch(38% 0.06 150)", marginTop: 4, lineHeight: 1.4 }}>Two plans overlap on cloud storage — keeping one covers both.</div>
                </div>
              </div>
            </div>
          )}

          {/* ============ SUBSCRIPTIONS ============ */}
          {v === "subscriptions" && (
            <div style={{ flex: 1, padding: "6px 16px 0", display: "flex", flexDirection: "column", gap: 12, overflow: "hidden" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <div style={{ fontFamily: sora, fontSize: 18, fontWeight: 700, color: "oklch(22% 0.01 80)" }}>Subscriptions</div>
                <div style={{ fontSize: 11.5, color: "oklch(52% 0.01 80)" }}>
                  8 active · <span style={{ fontWeight: 700, color: "oklch(30% 0.01 80)" }}>{m.monthly}</span>
                </div>
              </div>
              <div style={{ display: "flex", gap: 6 }}>
                {["All", "Due soon", "Trials"].map((label, i) => (
                  <span key={label} style={{ flex: 1, textAlign: "center", fontSize: 11.5, fontWeight: 600, padding: "8px 4px", borderRadius: 100, background: i === 0 ? teal : "#fff", color: i === 0 ? "#fff" : "oklch(45% 0.01 80)" }}>{label}</span>
                ))}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {subs.map((s) => (
                  <div key={s.name} style={{ background: "#fff", borderRadius: 16, padding: "12px 13px", display: "flex", alignItems: "center", gap: 11 }}>
                    <div style={{ width: 34, height: 34, borderRadius: 11, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: sora, fontWeight: 700, fontSize: 13.5, background: s.tint, color: s.fg, flexShrink: 0 }}>{s.initial}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13.5, fontWeight: 600, color: "oklch(22% 0.01 80)" }}>{s.name}</div>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 4 }}>
                        <span style={{ fontSize: 10, fontWeight: 600, padding: "2px 7px", borderRadius: 100, background: s.tint, color: s.fg }}>{s.category}</span>
                        <span style={{ fontSize: 10.5, color: "oklch(55% 0.01 80)" }}>{s.meta}</span>
                      </div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontFamily: sora, fontSize: 13.5, fontWeight: 700, color: "oklch(22% 0.01 80)" }}>{s.price}</div>
                      <div style={{ fontSize: 10, color: "oklch(58% 0.01 80)" }}>monthly</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ============ ANALYTICS ============ */}
          {v === "analytics" && (
            <div style={{ flex: 1, padding: "6px 16px 0", display: "flex", flexDirection: "column", gap: 14, overflow: "hidden" }}>
              <div style={{ fontFamily: sora, fontSize: 18, fontWeight: 700, color: "oklch(22% 0.01 80)" }}>Analytics</div>

              <div style={{ background: "#fff", borderRadius: 20, padding: 15 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                  <div>
                    <div style={{ fontSize: 13.5, fontWeight: 700, color: "oklch(22% 0.01 80)" }}>Spend projection</div>
                    <div style={{ fontSize: 11, color: "oklch(54% 0.01 80)", marginTop: 2 }}>Next 6 months</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontFamily: sora, fontSize: 17, fontWeight: 800, color: "oklch(22% 0.01 80)" }}>{m.projEnd}</div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: "oklch(48% 0.12 40)", marginTop: 2 }}>{m.projDelta} projected</div>
                  </div>
                </div>
                <svg viewBox="0 0 320 120" style={{ width: "100%", height: "auto", display: "block" }}>
                  <defs>
                    <linearGradient id="hpProjFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="oklch(45% 0.08 175)" stopOpacity="0.26" />
                      <stop offset="100%" stopColor="oklch(45% 0.08 175)" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d="M6 92 L59 80 L112 84 L165 62 L218 54 L271 34 L314 22 L314 118 L6 118 Z" fill="url(#hpProjFill)" />
                  <path d="M6 92 L59 80 L112 84 L165 62 L218 54 L271 34 L314 22" fill="none" stroke="oklch(42% 0.08 175)" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
                  <circle cx="165" cy="62" r="4" fill="#fff" stroke="oklch(42% 0.08 175)" strokeWidth="2" />
                  <circle cx="314" cy="22" r="5" fill="oklch(42% 0.08 175)" stroke="oklch(42% 0.08 175)" strokeWidth="2" />
                </svg>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
                  {projLabels.map((l) => (
                    <span key={l.label} style={{ fontSize: 9, fontWeight: l.weight, color: l.color }}>{l.label}</span>
                  ))}
                </div>
              </div>

              <div style={{ background: "#fff", borderRadius: 20, padding: 15 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                  <span style={{ fontSize: 13.5, fontWeight: 700, color: "oklch(22% 0.01 80)" }}>Spend tree</span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: teal }}>Explore →</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {cats.map((c) => (
                    <div key={c.name}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
                        <div style={{ width: 8, height: 8, borderRadius: 3, background: c.bg, flexShrink: 0 }} />
                        <span style={{ fontSize: 12, fontWeight: 600, color: "oklch(28% 0.01 80)", flex: 1 }}>{c.name}</span>
                        <span style={{ fontSize: 11.5, color: "oklch(52% 0.01 80)" }}>{c.amount}</span>
                        <span style={{ fontSize: 11.5, fontWeight: 700, color: "oklch(24% 0.01 80)", width: 32, textAlign: "right" }}>{c.pctLabel}</span>
                      </div>
                      <div style={{ height: 7, borderRadius: 100, background: "oklch(95% 0.01 80)", overflow: "hidden" }}>
                        <div style={{ height: "100%", width: c.pct, background: c.bg, borderRadius: 100 }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ background: "linear-gradient(135deg, oklch(40% 0.075 175), oklch(48% 0.09 165))", borderRadius: 20, padding: 16 }}>
                <div style={{ fontSize: 11.5, fontWeight: 700, color: "oklch(88% 0.03 175)", textTransform: "uppercase", letterSpacing: "0.02em" }}>Savings insights</div>
                <div style={{ fontSize: 14.5, fontWeight: 700, color: "#fff", marginTop: 6 }}>{m.savingsAvailable}</div>
                <div style={{ fontSize: 12, color: "oklch(90% 0.03 175)", marginTop: 4 }}>5 ideas to review →</div>
              </div>
            </div>
          )}

          {/* ============ RENEWALS ============ */}
          {v === "renewals" && (
            <div style={{ flex: 1, padding: "6px 16px 0", display: "flex", flexDirection: "column", gap: 14, overflow: "hidden" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <div style={{ fontFamily: sora, fontSize: 18, fontWeight: 700, color: "oklch(22% 0.01 80)" }}>Renewals</div>
                <div style={{ fontSize: 11.5, color: "oklch(52% 0.01 80)" }}>
                  4 in 30 days · <span style={{ fontWeight: 700, color: "oklch(30% 0.01 80)" }}>{m.windowTotal}</span>
                </div>
              </div>

              <div style={{ borderRadius: 22, padding: 17, background: "linear-gradient(150deg, oklch(42% 0.08 175), oklch(30% 0.06 195))", color: "#fff", boxShadow: "0 16px 34px -24px oklch(40% 0.075 175)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 13, background: "rgba(255,255,255,0.16)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: sora, fontSize: 17, fontWeight: 700, flexShrink: 0 }}>N</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "oklch(85% 0.04 175)" }}>Next charge</div>
                    <div style={{ fontFamily: sora, fontSize: 16, fontWeight: 700, marginTop: 2 }}>Netflix Premium</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontFamily: sora, fontSize: 21, fontWeight: 800 }}>{m.netflix}</div>
                    <div style={{ fontSize: 10.5, color: "oklch(85% 0.04 175)" }}>monthly</div>
                  </div>
                </div>
                <div style={{ marginTop: 14, display: "flex", alignItems: "center", gap: 12, background: "rgba(255,255,255,0.1)", borderRadius: 15, padding: "11px 13px" }}>
                  <div style={{ textAlign: "center", minWidth: 42 }}>
                    <div style={{ fontFamily: sora, fontSize: 21, fontWeight: 800, lineHeight: 1 }}>3</div>
                    <div style={{ fontSize: 9.5, color: "oklch(85% 0.04 175)", marginTop: 3 }}>days</div>
                  </div>
                  <div style={{ width: 1, alignSelf: "stretch", background: "rgba(255,255,255,0.2)" }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 12.5, fontWeight: 600 }}>Fri, 14 Aug</div>
                    <div style={{ fontSize: 11, color: "oklch(85% 0.04 175)", marginTop: 2 }}>{m.payMethod}</div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 9, marginTop: 12 }}>
                  <span style={{ flex: 1, textAlign: "center", padding: 10, borderRadius: 13, background: "#fff", color: "oklch(35% 0.075 175)", fontSize: 12.5, fontWeight: 700 }}>Remind me</span>
                  <span style={{ flex: 1, textAlign: "center", padding: 10, borderRadius: 13, background: "rgba(255,255,255,0.14)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", fontSize: 12.5, fontWeight: 700 }}>Manage</span>
                </div>
              </div>

              <div style={{ background: "#fff", borderRadius: 20, padding: "15px 17px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <span style={{ fontSize: 13.5, fontWeight: 700, color: "oklch(22% 0.01 80)" }}>Renewal load</span>
                  <span style={{ fontSize: 11, color: "oklch(55% 0.01 80)" }}>Next 4 weeks</span>
                </div>
                <div style={{ display: "flex", alignItems: "flex-end", gap: 10, minHeight: 104, marginTop: 12 }}>
                  {loadBars.map((b) => (
                    <div key={b.label} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6, justifyContent: "flex-end" }}>
                      <span style={{ fontSize: 10, fontWeight: 700, color: b.labelColor }}>{b.amount}</span>
                      <div style={{ width: "100%", height: b.height, borderRadius: "8px 8px 4px 4px", background: b.bg }} />
                      <span style={{ fontSize: 10, color: "oklch(55% 0.01 80)" }}>{b.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ background: "#fff", borderRadius: 20, padding: "15px 17px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <span style={{ fontSize: 13.5, fontWeight: 700, color: "oklch(22% 0.01 80)" }}>Reminder coverage</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: teal }}>5 of 8 set</span>
                </div>
                <div style={{ height: 8, borderRadius: 4, background: "oklch(93% 0.01 80)", marginTop: 11, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: "62%", borderRadius: 4, background: "oklch(52% 0.1 175)" }} />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, marginTop: 10 }}>
                  <span style={{ fontSize: 11.5, color: "oklch(50% 0.01 80)" }}>3 renewals have no reminder</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: teal, whiteSpace: "nowrap" }}>Fix this</span>
                </div>
              </div>
            </div>
          )}

          {/* ============ CATALOG START ============ */}
          {v === "catalog" && (
            <div style={{ flex: 1, padding: "4px 20px 0", display: "flex", flexDirection: "column", gap: 15, overflow: "hidden" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 8, height: 8, borderLeft: "2px solid oklch(30% 0.01 80)", borderBottom: "2px solid oklch(30% 0.01 80)", transform: "rotate(45deg)" }} />
                <div style={{ flex: 1 }} />
                <span style={{ fontSize: 13, fontWeight: 600, color: teal }}>Add custom</span>
              </div>

              <div>
                <div style={{ fontFamily: sora, fontSize: 21, fontWeight: 700, color: "oklch(22% 0.01 80)" }}>Add a subscription</div>
                <div style={{ fontSize: 13, color: "oklch(52% 0.01 80)", marginTop: 5, lineHeight: 1.5 }}>Pick a service for a faster setup, or add a custom one.</div>
              </div>

              <div style={{ background: "#fff", borderRadius: 14, padding: "13px 15px", display: "flex", alignItems: "center", gap: 10, border: "1.5px solid oklch(90% 0.01 80)", flexShrink: 0 }}>
                <div style={{ width: 14, height: 14, borderRadius: "50%", border: "2px solid oklch(60% 0.01 80)", position: "relative", flexShrink: 0 }}>
                  <div style={{ position: "absolute", width: 6, height: 2, background: "oklch(60% 0.01 80)", borderRadius: 1, transform: "rotate(45deg)", right: -4, bottom: -1 }} />
                </div>
                <span style={{ fontSize: 14, color: "oklch(55% 0.01 80)" }}>Search services</span>
              </div>

              <div style={{ display: "inline-flex", alignSelf: "flex-start", alignItems: "center", gap: 6, background: "oklch(94% 0.03 175)", borderRadius: 100, padding: "6px 12px", flexShrink: 0 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "oklch(45% 0.09 175)" }} />
                <span style={{ fontSize: 11.5, fontWeight: 600, color: "oklch(38% 0.075 175)" }}>{m.regionChip}</span>
              </div>

              <div style={{ flexShrink: 0 }}>
                <div style={{ fontSize: 12.5, fontWeight: 700, color: "oklch(30% 0.01 80)", marginBottom: 10 }}>Popular near you</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
                  {catalogPopular.slice(0, 6).map((svc) => (
                    <div key={svc.name} style={{ background: "#fff", borderRadius: 16, padding: "12px 6px", display: "flex", flexDirection: "column", alignItems: "center", gap: 7, border: "1px solid oklch(93% 0.008 80)" }}>
                      <div style={{ width: 42, height: 42, borderRadius: 13, background: svc.color, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: sora, fontSize: 15, fontWeight: 800, letterSpacing: "-0.02em" }}>{svc.mono}</div>
                      <span style={{ fontSize: 11, fontWeight: 600, color: "oklch(30% 0.01 80)", textAlign: "center", lineHeight: 1.2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "100%" }}>{svc.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ flexShrink: 0 }}>
                <div style={{ fontSize: 12.5, fontWeight: 700, color: "oklch(30% 0.01 80)", marginBottom: 10 }}>Browse by category</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {catalogBrowse.map((cat) => (
                    <div key={cat.name} style={{ display: "flex", alignItems: "center", gap: 7, background: "#fff", borderRadius: 100, padding: "8px 13px", border: "1px solid oklch(93% 0.008 80)" }}>
                      <div style={{ width: 7, height: 7, borderRadius: "50%", background: cat.color }} />
                      <span style={{ fontSize: 12, fontWeight: 600, color: "oklch(30% 0.01 80)" }}>{cat.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ============ ADD (catalog quick-add confirm) ============ */}
          {v === "add" && (
            <div style={{ flex: 1, padding: "6px 16px 0", display: "flex", flexDirection: "column", gap: 14, overflow: "hidden" }}>
              <div>
                <div style={{ fontFamily: sora, fontSize: 18, fontWeight: 700, color: "oklch(22% 0.01 80)" }}>Confirm subscription</div>
                <div style={{ fontSize: 12, color: "oklch(52% 0.01 80)", marginTop: 3 }}>Step 3 of 3 · everything stays editable</div>
              </div>

              <div style={{ background: "#fff", borderRadius: 20, padding: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 13, background: "oklch(93% 0.05 25)", color: "oklch(45% 0.16 25)", fontFamily: sora, fontWeight: 700, fontSize: 17, display: "flex", alignItems: "center", justifyContent: "center" }}>N</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 15, fontWeight: 700, color: "oklch(22% 0.01 80)" }}>Netflix · Premium</div>
                    <div style={{ fontSize: 12, color: "oklch(52% 0.01 80)", marginTop: 2 }}>Entertainment · Monthly</div>
                  </div>
                </div>

                <div style={{ marginTop: 12 }}>
                  <div style={{ padding: "12px 0", borderBottom: "1px solid oklch(94% 0.008 80)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 600, color: "oklch(52% 0.01 80)" }}>Amount</div>
                      <div style={{ fontSize: 14.5, fontWeight: 600, color: "oklch(22% 0.01 80)", marginTop: 3 }}>{m.netflix} / month</div>
                    </div>
                    <span style={{ fontSize: 12, fontWeight: 600, color: teal }}>Edit</span>
                  </div>
                  <div style={{ padding: "12px 0", borderBottom: "1px solid oklch(94% 0.008 80)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 600, color: "oklch(52% 0.01 80)" }}>Next renewal</div>
                      <div style={{ fontSize: 14.5, fontWeight: 600, color: "oklch(22% 0.01 80)", marginTop: 3 }}>14 Aug 2026</div>
                    </div>
                    <span style={{ fontSize: 9.5, fontWeight: 700, color: "oklch(38% 0.075 175)", background: "oklch(94% 0.03 175)", borderRadius: 100, padding: "3px 8px" }}>✦ AI estimate</span>
                  </div>
                  <div style={{ padding: "12px 0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ fontSize: 13.5, fontWeight: 600, color: "oklch(22% 0.01 80)" }}>Reminder</div>
                      <div style={{ fontSize: 11.5, color: "oklch(52% 0.01 80)", marginTop: 2 }}>Remind me 2 days before renewal</div>
                    </div>
                    <div style={toggleOn}>
                      <Knob />
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ background: "oklch(94% 0.03 175)", borderRadius: 16, padding: 13, fontSize: 12, color: "oklch(35% 0.05 175)", lineHeight: 1.45 }}>
                Catalog prices are suggestions. Confirm the amount against your own billing.
              </div>

              <div style={{ width: "100%", padding: 14, borderRadius: 14, background: teal, color: "#fff", textAlign: "center", fontSize: 14.5, fontWeight: 700 }}>Add subscription</div>
            </div>
          )}

          {/* ============ SAVINGS ============ */}
          {v === "savings" && (
            <div style={{ flex: 1, padding: "6px 16px 0", display: "flex", flexDirection: "column", gap: 13, overflow: "hidden" }}>
              <div style={{ fontFamily: sora, fontSize: 18, fontWeight: 700, color: "oklch(22% 0.01 80)" }}>Savings &amp; insights</div>

              <div style={{ background: "linear-gradient(135deg, oklch(40% 0.075 175), oklch(48% 0.09 165))", borderRadius: 22, padding: 20, color: "#fff" }}>
                <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "oklch(88% 0.03 175)" }}>Possible savings</div>
                <div style={{ fontFamily: sora, fontSize: 34, fontWeight: 800, marginTop: 6 }}>{m.savingsTotal}</div>
                <div style={{ fontSize: 12.5, color: "oklch(90% 0.03 175)", marginTop: 2 }}>a month across 5 ideas</div>
              </div>

              <div style={{ background: "#fff", borderRadius: 18, padding: 15, border: "1.5px solid oklch(88% 0.05 160)" }}>
                <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "oklch(45% 0.11 160)" }}>Start here</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "oklch(22% 0.01 80)", marginTop: 6, lineHeight: 1.35 }}>{m.startHere}</div>
                <div style={{ fontSize: 12, color: "oklch(52% 0.01 80)", marginTop: 5, lineHeight: 1.45 }}>You watched 4 hrs this month — your lowest since March.</div>
                <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                  <span style={{ flex: 1, textAlign: "center", padding: 9, borderRadius: 11, background: teal, color: "#fff", fontSize: 12, fontWeight: 700 }}>See evidence</span>
                  <span style={{ flex: 1, textAlign: "center", padding: 9, borderRadius: 11, background: "oklch(96% 0.01 80)", color: "oklch(35% 0.01 80)", fontSize: 12, fontWeight: 700 }}>Keep it</span>
                </div>
              </div>

              {savingsItems.map((i) => (
                <div key={i.title} style={{ background: "#fff", borderRadius: 16, padding: 13, display: "flex", gap: 11, alignItems: "flex-start" }}>
                  <div style={{ width: 28, height: 28, borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, flexShrink: 0, background: i.tint, color: i.fg }}>{i.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12.5, fontWeight: 600, color: "oklch(22% 0.01 80)", lineHeight: 1.35 }}>{i.title}</div>
                    <div style={{ fontSize: 11.5, color: "oklch(52% 0.01 80)", marginTop: 3 }}>{i.body}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ============ REMINDERS ============ */}
          {v === "reminders" && (
            <div style={{ flex: 1, padding: "6px 16px 0", display: "flex", flexDirection: "column", gap: 12, overflow: "hidden", background: "oklch(97% 0.012 80)" }}>
              <div style={{ fontFamily: sora, fontSize: 18, fontWeight: 700, color: "oklch(22% 0.01 80)" }}>Reminders</div>

              <div style={{ background: "#fff", borderRadius: 18, padding: 14, boxShadow: "0 2px 12px oklch(30% 0.02 80 / 0.06)" }}>
                <div style={{ display: "flex", gap: 11, alignItems: "flex-start" }}>
                  <div style={{ width: 30, height: 30, borderRadius: 9, background: "oklch(56% 0.1 190)", color: "#fff", fontFamily: sora, fontWeight: 700, fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>S</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                      <span style={{ fontSize: 11, fontWeight: 700, color: "oklch(45% 0.01 80)" }}>PUSH</span>
                      <span style={{ fontSize: 10.5, color: "oklch(58% 0.01 80)" }}>now</span>
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "oklch(20% 0.01 80)", marginTop: 3 }}>Netflix renews in 2 days</div>
                    <div style={{ fontSize: 12, color: "oklch(44% 0.01 80)", marginTop: 3, lineHeight: 1.45 }}>{m.pushBody}</div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 7, marginTop: 11 }}>
                  <div style={{ flex: 1, textAlign: "center", padding: 9, borderRadius: 11, background: "oklch(94% 0.03 175)", fontSize: 11.5, fontWeight: 700, color: "oklch(34% 0.075 175)" }}>Snooze 1 day</div>
                  <div style={{ flex: 1, textAlign: "center", padding: 9, borderRadius: 11, background: "oklch(94% 0.03 175)", fontSize: 11.5, fontWeight: 700, color: "oklch(34% 0.075 175)" }}>Review</div>
                  <div style={{ flex: 1, textAlign: "center", padding: 9, borderRadius: 11, background: "oklch(95% 0.025 25)", fontSize: 11.5, fontWeight: 700, color: "oklch(50% 0.11 25)" }}>Cancel it</div>
                </div>
              </div>

              <div style={{ background: "#fff", borderRadius: 18, padding: 14, display: "flex", gap: 12, alignItems: "center" }}>
                <div style={{ width: 34, height: 34, borderRadius: 11, background: "oklch(95% 0.04 62)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="oklch(50% 0.13 62)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="13" r="8" />
                    <path d="M12 9v4l2.5 2" />
                    <path d="M5 3 2.5 5.5" />
                    <path d="m19 3 2.5 2.5" />
                  </svg>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "oklch(20% 0.01 80)" }}>Alarm me before this charge</div>
                  <div style={{ fontSize: 11.5, color: "oklch(50% 0.01 80)", marginTop: 2, lineHeight: 1.4 }}>Rings through silent &amp; Do Not Disturb</div>
                </div>
                <div style={toggleOn}>
                  <Knob />
                </div>
              </div>

              <div style={{ background: "#fff", borderRadius: 18, padding: 14, display: "flex", flexDirection: "column", gap: 11 }}>
                <div style={{ fontSize: 12.5, fontWeight: 700, color: "oklch(22% 0.01 80)" }}>Delivery channels</div>
                {channels.map((c) => (
                  <div key={c.label} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 26, height: 26, borderRadius: 8, background: c.tint, color: c.fg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, flexShrink: 0 }}>{c.icon}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 12.5, fontWeight: 600, color: "oklch(24% 0.01 80)" }}>{c.label}</div>
                      <div style={{ fontSize: 11, color: "oklch(55% 0.01 80)" }}>{c.meta}</div>
                    </div>
                    <div style={{ width: 36, height: 21, borderRadius: 100, background: c.on ? teal : "oklch(88% 0.01 80)", display: "flex", alignItems: "center", padding: 2.5, justifyContent: c.on ? "flex-end" : "flex-start" }}>
                      <Knob size={16} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ============ ALARM ============ */}
          {v === "alarm" && (
            <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "30px 22px 26px", background: "linear-gradient(168deg, oklch(30% 0.075 178), oklch(17% 0.05 200))", color: "#fff" }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 30, height: 30, borderRadius: 9, background: "rgba(255,255,255,0.14)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="oklch(80% 0.09 62)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="13" r="8" />
                      <path d="M12 9v4l2.5 2" />
                      <path d="M5 3 2.5 5.5" />
                      <path d="m19 3 2.5 2.5" />
                    </svg>
                  </div>
                  <div style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "oklch(80% 0.09 62)" }}>Renewal alarm</div>
                </div>
                <div style={{ textAlign: "center", marginTop: 30 }}>
                  <div style={{ fontFamily: sora, fontSize: 25, fontWeight: 800, lineHeight: 1.2 }}>
                    Netflix renewal due
                    <br />
                    Fri, 14 August
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "oklch(80% 0.09 62)", marginTop: 7 }}>In less than 2 days</div>
                  <div style={{ fontFamily: sora, fontSize: 42, fontWeight: 800, marginTop: 14, letterSpacing: "-0.02em" }}>{m.netflix}</div>
                  <div style={{ fontSize: 12.5, color: "oklch(84% 0.03 175)", marginTop: 6, lineHeight: 1.5 }}>
                    {m.payMethod}
                    <br />
                    You asked to be alarmed before this one.
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ borderRadius: 18, background: "oklch(58% 0.16 25)", padding: 16, textAlign: "center", fontSize: 14.5, fontWeight: 700 }}>Slide to cancel Netflix →</div>
                <div style={{ display: "flex", gap: 10 }}>
                  <div style={{ flex: 1, textAlign: "center", padding: 14, borderRadius: 16, background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)", fontSize: 13.5, fontWeight: 700 }}>Snooze</div>
                  <div style={{ flex: 1, textAlign: "center", padding: 14, borderRadius: 16, background: "#fff", color: "oklch(30% 0.06 178)", fontSize: 13.5, fontWeight: 700 }}>Keep it</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {showTabBar && (
          <div
            style={{
              flexShrink: 0,
              background: "#fff",
              borderTop: "1px solid oklch(94% 0.01 80)",
              display: "flex",
              padding: "10px 8px 14px",
            }}
          >
            {tabDefs.map((t) => {
              const active = t.key === v;
              const color = active ? teal : "oklch(72% 0.01 80)";
              return (
                <div
                  key={t.key}
                  style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}
                >
                  <div style={{ width: 22, height: 22, borderRadius: t.shapeRadius, background: color }} />
                  <span style={{ fontSize: 10.5, fontWeight: 600, color }}>{t.label}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
