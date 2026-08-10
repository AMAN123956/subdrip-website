"use client";

import type { CSSProperties, ReactNode } from "react";
import {
  buildProjChart,
  buildTreeCategories,
  catColor,
  catText,
  catTint,
  CATALOG_BROWSE,
  CATALOG_POPULAR,
  daysUntil,
  fmtINR,
  fmtShortDate,
  INSIGHT_TYPE_ORDER,
  NOTIF_ROWS,
  PAYMENT_METHOD,
  SAVINGS_INSIGHTS,
  sortedByMonthlyDesc,
  STATUS_META,
  SUBSCRIPTIONS,
  TOTAL_MONTHLY,
  TREND,
  TREND_MONTHS,
  TRIALS_ENDING,
} from "@/lib/appData";
import type { DemoScreenKey } from "@/lib/siteData";

const teal = "oklch(40% 0.075 175)";
const sora = "var(--font-sora), sans-serif";
const pageBg = "oklch(97% 0.012 80)";

const h1Style: CSSProperties = {
  fontFamily: sora,
  fontSize: 19,
  fontWeight: 700,
  color: "oklch(22% 0.01 80)",
};

function BackCaret() {
  return (
    <div
      style={{
        width: 32,
        height: 32,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginLeft: -8,
      }}
    >
      <div
        style={{
          width: 8,
          height: 8,
          borderLeft: "2px solid oklch(30% 0.01 80)",
          borderBottom: "2px solid oklch(30% 0.01 80)",
          transform: "rotate(45deg)",
        }}
      />
    </div>
  );
}

function Toggle({ on }: { on: boolean }) {
  return (
    <div
      style={{
        width: 40,
        height: 24,
        borderRadius: 100,
        background: on ? teal : "oklch(90% 0.01 80)",
        display: "flex",
        alignItems: "center",
        padding: 3,
        justifyContent: on ? "flex-end" : "flex-start",
        flexShrink: 0,
      }}
    >
      <div style={{ width: 18, height: 18, borderRadius: "50%", background: "#fff" }} />
    </div>
  );
}

function TabBar({
  active,
  onNavigate,
}: {
  active: string;
  onNavigate?: (screen: DemoScreenKey) => void;
}) {
  const defs: { id: string; screen: DemoScreenKey; label: string; shapeRadius: string }[] = [
    { id: "home", screen: "dashboard", label: "Home", shapeRadius: "6px" },
    { id: "analytics", screen: "analyticsHub", label: "Analytics", shapeRadius: "50%" },
    { id: "renewals", screen: "renewals", label: "Renewals", shapeRadius: "4px" },
    { id: "subscriptions", screen: "subscriptions", label: "Subscriptions", shapeRadius: "50% 50% 50% 4px" },
  ];
  return (
    <div
      style={{
        position: "sticky",
        bottom: 0,
        zIndex: 5,
        background: "#fff",
        display: "flex",
        padding: "10px 8px 14px",
        borderTop: "1px solid oklch(94% 0.01 80)",
        flexShrink: 0,
      }}
    >
      {defs.map((tab) => {
        const color = active === tab.id ? teal : "oklch(72% 0.01 80)";
        return (
          <div
            key={tab.id}
            onClick={() => onNavigate?.(tab.screen)}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4,
              cursor: "pointer",
            }}
          >
            <div style={{ width: 22, height: 22, borderRadius: tab.shapeRadius, background: color }} />
            <span style={{ fontSize: 10.5, fontWeight: 600, color }}>{tab.label}</span>
          </div>
        );
      })}
    </div>
  );
}

/* =========================================================================
   Screens
   ========================================================================= */

function WelcomeAuthScreen() {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: pageBg, padding: "56px 26px 32px" }}>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 22, textAlign: "center" }}>
        <div style={{ width: 60, height: 60, borderRadius: 18, background: teal, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: 24, height: 24, borderRadius: 6, border: "2.5px solid #fff" }} />
        </div>
        <div>
          <div style={{ fontFamily: sora, fontSize: 24, fontWeight: 700, color: "oklch(22% 0.01 80)", lineHeight: 1.3 }}>
            See the real cost of
            <br />
            your subscriptions.
          </div>
          <div style={{ fontSize: 14.5, color: "oklch(52% 0.01 80)", marginTop: 14, lineHeight: 1.5, padding: "0 8px" }}>
            Sign in to track recurring spend, renewals, and savings insights.
          </div>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <div
          style={{
            width: "100%",
            padding: 16,
            borderRadius: 16,
            background: teal,
            color: "#fff",
            fontSize: 15.5,
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
          }}
        >
          <span
            style={{
              width: 20,
              height: 20,
              borderRadius: "50%",
              background: "#fff",
              color: teal,
              fontSize: 12,
              fontWeight: 800,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: sora,
            }}
          >
            G
          </span>
          Continue with Google
        </div>
        <div
          style={{
            width: "100%",
            padding: 16,
            borderRadius: 16,
            background: "#fff",
            color: "oklch(30% 0.01 80)",
            border: "1.5px solid oklch(85% 0.01 80)",
            fontSize: 15.5,
            fontWeight: 600,
            textAlign: "center",
          }}
        >
          Continue with email
        </div>
        <span style={{ textAlign: "center", fontSize: 14, fontWeight: 600, color: teal, marginTop: 2 }}>Use passkey</span>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "6px 14px", marginTop: 26 }}>
        {["Read-only Gmail access", "No bank login required", "You can disconnect anytime"].map((t) => (
          <span key={t} style={{ fontSize: 12, color: "oklch(56% 0.01 80)" }}>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

function DashboardScreen({ onNavigate }: { onNavigate?: (s: DemoScreenKey) => void }) {
  const trendPct = ((TREND[11] - TREND[10]) / TREND[10]) * 100;
  const dashTrendLabel = `+${trendPct.toFixed(1)}%`;
  const ringPct = Math.round(trendPct * 8);
  const subCount = SUBSCRIPTIONS.length;
  const subCategoryCount = new Set(SUBSCRIPTIONS.map((x) => x.category)).size;
  const avgPerSub = fmtINR(TOTAL_MONTHLY / subCount);

  const treeCategories = buildTreeCategories();
  const topCategory = treeCategories[0];
  const next30Total = SUBSCRIPTIONS.filter((x) => daysUntil(x.renewDate) <= 30).reduce((s, x) => s + x.billedAmount, 0);
  const top3Sum = sortedByMonthlyDesc.slice(0, 3).reduce((s, x) => s + x.monthly, 0);
  const top3Pct = Math.round((top3Sum / TOTAL_MONTHLY) * 100);

  const insightMeta = [
    { kind: "pie", accent: "oklch(44% 0.08 175)", tint: "oklch(93% 0.03 175)", tintDeep: "oklch(84% 0.05 175)" },
    { kind: "calendar", accent: "oklch(58% 0.12 70)", tint: "oklch(94% 0.05 78)", tintDeep: "" },
    { kind: "bars", accent: "oklch(50% 0.1 285)", tint: "oklch(94% 0.04 285)", tintDeep: "" },
  ];
  const insightCards = [
    `${topCategory.name} makes up ${topCategory.pct}% of your monthly spend.`,
    `You'll pay ${fmtINR(next30Total)} across renewals in the next 30 days.`,
    `Your top 3 services make up ${top3Pct}% of your recurring spend.`,
  ];

  // July 2026 calendar, selected day = next renewal (14 Jul)
  const calSelected = "2026-07-14";
  const weekdays = ["S", "M", "T", "W", "T", "F", "S"];
  const firstDow = new Date(2026, 6, 1).getDay();
  const daysInMonth = new Date(2026, 7, 0).getDate();
  const cells: ReactNode[] = [];
  for (let i = 0; i < firstDow; i++) cells.push(<div key={`b${i}`} style={{ aspectRatio: "1 / 1" }} />);
  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `2026-07-${String(day).padStart(2, "0")}`;
    const rens = SUBSCRIPTIONS.filter((x) => x.renewDate === dateStr);
    const isToday = dateStr === "2026-07-11";
    const isSel = dateStr === calSelected;
    const primary = rens.length
      ? [...rens].sort((a, b) => b.billedAmount - a.billedAmount)[0]
      : null;
    cells.push(
      <div
        key={dateStr}
        style={{
          aspectRatio: "1 / 1",
          borderRadius: 10,
          background: isSel ? "oklch(94% 0.03 175)" : "transparent",
          border: isSel
            ? "1.5px solid oklch(48% 0.075 175)"
            : isToday
              ? "1.5px solid oklch(84% 0.04 175)"
              : "1.5px solid transparent",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
        }}
      >
        <span
          style={{
            fontSize: 11.5,
            fontWeight: isToday || rens.length ? 700 : 500,
            color: isSel ? "oklch(34% 0.07 175)" : isToday ? teal : "oklch(35% 0.01 80)",
            lineHeight: 1,
          }}
        >
          {day}
        </span>
        {primary && (
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: "50%",
              background: catColor(primary.category),
              color: "#fff",
              fontSize: 8,
              fontWeight: 700,
              fontFamily: sora,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {primary.name[0]}
          </div>
        )}
      </div>,
    );
  }
  const julySubs = SUBSCRIPTIONS.filter((x) => x.renewDate.startsWith("2026-07"));
  const julyTotal = julySubs.reduce((a, x) => a + x.billedAmount, 0);
  const detailSub = SUBSCRIPTIONS.find((x) => x.renewDate === calSelected)!;
  const detailDu = daysUntil(calSelected);

  const topDrains = sortedByMonthlyDesc.slice(0, 3);
  const savingsCards = [
    { headline: "Switch Adobe to annual billing", detail: `Save roughly ${fmtINR(799 * 12 * 0.15)}/yr by switching Adobe Photography Plan to an annual plan.` },
    { headline: "Possible overlap", detail: "ChatGPT Plus and Notion Plus both offer AI writing features — worth checking if you need both." },
  ];

  return (
    <div style={{ minHeight: "100%", display: "flex", flexDirection: "column", background: pageBg }}>
      <div style={{ flex: 1, padding: "22px 18px 16px", display: "flex", flexDirection: "column", gap: 18 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 13, color: "oklch(52% 0.01 80)" }}>Good afternoon</div>
            <div style={{ fontFamily: sora, fontSize: 18, fontWeight: 700, color: "oklch(22% 0.01 80)" }}>Your subscriptions</div>
          </div>
          <div style={{ width: 38, height: 38, borderRadius: "50%", background: teal, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontFamily: sora, fontWeight: 700, fontSize: 14 }}>AD</div>
        </div>
        <div style={{ fontSize: 11.5, color: "oklch(55% 0.01 80)", marginTop: -10 }}>
          Last synced 2 days ago · <span style={{ fontWeight: 700, color: teal }}>Scan again</span>
        </div>

        {/* HERO B (primary masthead) */}
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            borderRadius: 26,
            padding: 22,
            background: "linear-gradient(150deg, oklch(45% 0.085 172), oklch(32% 0.07 184))",
            color: "#fff",
            boxShadow: "0 14px 34px -14px oklch(40% 0.08 175 / 0.6)",
          }}
        >
          <div style={{ position: "absolute", top: -60, right: -44, width: 190, height: 190, borderRadius: "50%", background: "radial-gradient(circle, oklch(72% 0.1 168 / 0.38), transparent 70%)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: -80, left: -34, width: 170, height: 170, borderRadius: "50%", background: "radial-gradient(circle, oklch(62% 0.08 195 / 0.22), transparent 70%)", pointerEvents: "none" }} />
          <div style={{ position: "relative", display: "flex", alignItems: "center", gap: 18 }}>
            <div style={{ width: 84, height: 84, borderRadius: "50%", background: `conic-gradient(#fff ${ringPct}%, rgba(255,255,255,0.2) 0)`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <div style={{ width: 66, height: 66, borderRadius: "50%", background: "oklch(37% 0.075 178)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontFamily: sora, fontSize: 14, fontWeight: 800, color: "#fff", lineHeight: 1 }}>{dashTrendLabel}</span>
                <span style={{ fontSize: 8, color: "oklch(88% 0.03 175)", marginTop: 3, textTransform: "uppercase", letterSpacing: "0.05em" }}>vs last mo</span>
              </div>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 11.5, fontWeight: 700, color: "oklch(88% 0.03 175)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Monthly spend</div>
              <div style={{ fontFamily: sora, fontSize: 36, fontWeight: 800, lineHeight: 1.05, marginTop: 5 }}>{fmtINR(TOTAL_MONTHLY)}</div>
              <div style={{ fontSize: 12.5, color: "oklch(90% 0.03 175)", marginTop: 5 }}>{fmtINR(TOTAL_MONTHLY * 12)} / year</div>
            </div>
          </div>
          <button
            onClick={() => onNavigate?.("analyticsHub")}
            style={{
              position: "relative",
              marginTop: 18,
              width: "100%",
              padding: 13,
              borderRadius: 14,
              border: "1px solid rgba(255,255,255,0.28)",
              background: "rgba(255,255,255,0.14)",
              color: "#fff",
              fontFamily: "var(--font-work-sans), sans-serif",
              fontSize: 14,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            View analytics →
          </button>
        </div>

        {/* Summary stats */}
        <div style={{ background: "#fff", borderRadius: 20, padding: "16px 6px", display: "flex", alignItems: "center" }}>
          {[
            { n: String(subCount), l: "Active" },
            { n: String(subCategoryCount), l: "Categories" },
            { n: avgPerSub, l: "Avg / sub" },
          ].map((st, i) => (
            <div key={st.l} style={{ display: "contents" }}>
              {i > 0 && <div style={{ width: 1, height: 30, background: "oklch(92% 0.008 80)" }} />}
              <div style={{ flex: 1, textAlign: "center" }}>
                <div style={{ fontFamily: sora, fontSize: 22, fontWeight: 800, color: "oklch(22% 0.01 80)", lineHeight: 1 }}>{st.n}</div>
                <div style={{ fontSize: 11, color: "oklch(54% 0.01 80)", marginTop: 5 }}>{st.l}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Renewal calendar */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <span style={{ fontSize: 15, fontWeight: 700, color: "oklch(22% 0.01 80)" }}>Renewal calendar</span>
            <div style={{ width: 28, height: 28, borderRadius: 9, background: "oklch(95% 0.012 80)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: 8, height: 8, borderRight: "2px solid oklch(42% 0.05 175)", borderBottom: "2px solid oklch(42% 0.05 175)", transform: "rotate(-135deg)", marginTop: 3 }} />
            </div>
          </div>
          <div style={{ background: "#fff", borderRadius: 20, padding: 14 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
              <div style={{ width: 28, height: 28, borderRadius: 9, background: "oklch(96% 0.008 80)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: 6, height: 6, borderLeft: "2px solid oklch(80% 0.01 80)", borderBottom: "2px solid oklch(80% 0.01 80)", transform: "rotate(45deg)", marginLeft: 3 }} />
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontFamily: sora, fontSize: 14, fontWeight: 700, color: "oklch(22% 0.01 80)" }}>July 2026</div>
                <div style={{ fontSize: 11, color: "oklch(52% 0.01 80)", marginTop: 1 }}>
                  {julySubs.length} renewals · {fmtINR(julyTotal)}
                </div>
              </div>
              <div style={{ width: 28, height: 28, borderRadius: 9, background: "oklch(94% 0.03 175)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: 6, height: 6, borderRight: "2px solid oklch(42% 0.05 175)", borderTop: "2px solid oklch(42% 0.05 175)", transform: "rotate(45deg)", marginRight: 3 }} />
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 1, marginBottom: 4 }}>
              {weekdays.map((w, i) => (
                <div key={i} style={{ textAlign: "center", fontSize: 10, fontWeight: 700, color: "oklch(68% 0.01 80)" }}>{w}</div>
              ))}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 1 }}>{cells}</div>
            <div style={{ height: 1, background: "oklch(94% 0.008 80)", margin: "10px 0" }} />
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: teal, textTransform: "uppercase", letterSpacing: "0.02em", marginBottom: 8 }}>
                {new Date(calSelected + "T00:00:00").toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" })}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
                <div style={{ width: 30, height: 30, borderRadius: 9, background: catColor(detailSub.category), color: "#fff", fontFamily: sora, fontWeight: 700, fontSize: 12.5, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{detailSub.name[0]}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "oklch(22% 0.01 80)" }}>{detailSub.name}</div>
                  <div style={{ fontSize: 11, color: "oklch(52% 0.01 80)", marginTop: 1 }}>
                    Renews in {detailDu} day{detailDu === 1 ? "" : "s"}
                  </div>
                </div>
                <span style={{ fontSize: 13, fontWeight: 700, color: "oklch(22% 0.01 80)" }}>{fmtINR(detailSub.billedAmount)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Insights */}
        <div>
          <div style={{ fontSize: 15, fontWeight: 700, color: "oklch(22% 0.01 80)", marginBottom: 10 }}>Insights</div>
          <div style={{ background: "#fff", borderRadius: 20, padding: "4px 16px" }}>
            {insightCards.map((text, i) => {
              const meta = insightMeta[i];
              return (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "13px 0", borderBottom: i < insightCards.length - 1 ? "1px solid oklch(94% 0.008 80)" : "none" }}>
                  <div style={{ width: 30, height: 30, borderRadius: 9, background: meta.tint, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                    {meta.kind === "pie" && (
                      <div style={{ width: 15, height: 15, borderRadius: "50%", background: `conic-gradient(${meta.accent} 0 62%, ${meta.tintDeep} 62% 100%)` }} />
                    )}
                    {meta.kind === "calendar" && (
                      <div style={{ width: 15, height: 14, border: `2px solid ${meta.accent}`, borderRadius: 4, overflow: "hidden" }}>
                        <div style={{ height: 4, background: meta.accent }} />
                      </div>
                    )}
                    {meta.kind === "bars" && (
                      <div style={{ display: "flex", alignItems: "flex-end", gap: 2, height: 14 }}>
                        <div style={{ width: 3, height: 6, background: meta.accent, borderRadius: 1 }} />
                        <div style={{ width: 3, height: 10, background: meta.accent, borderRadius: 1 }} />
                        <div style={{ width: 3, height: 14, background: meta.accent, borderRadius: 1 }} />
                      </div>
                    )}
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 500, color: "oklch(28% 0.01 80)", lineHeight: 1.45 }}>{text}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top drains */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 10 }}>
            <span style={{ fontSize: 15, fontWeight: 700, color: "oklch(22% 0.01 80)" }}>Top drains</span>
            <span onClick={() => onNavigate?.("subscriptions")} style={{ fontSize: 12.5, fontWeight: 600, color: teal, cursor: "pointer" }}>See all</span>
          </div>
          <div style={{ background: "#fff", borderRadius: 16, padding: "6px 14px" }}>
            {topDrains.map((d, i) => (
              <div key={d.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: i < 2 ? "1px solid oklch(93% 0.01 80)" : "none" }}>
                <div style={{ width: 34, height: 34, borderRadius: 10, background: catTint(d.category), color: catText(d.category), display: "flex", alignItems: "center", justifyContent: "center", fontFamily: sora, fontWeight: 700, fontSize: 13, flexShrink: 0 }}>{d.name[0]}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13.5, fontWeight: 600, color: "oklch(22% 0.01 80)" }}>{d.name}</div>
                  <div style={{ fontSize: 12, color: "oklch(52% 0.01 80)" }}>{fmtINR(d.monthly * 12)}/year</div>
                </div>
                <div style={{ fontSize: 13.5, fontWeight: 700, color: "oklch(22% 0.01 80)" }}>{fmtINR(d.monthly)}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Savings opportunities */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 10 }}>
            <span style={{ fontSize: 15, fontWeight: 700, color: "oklch(22% 0.01 80)" }}>Savings opportunities</span>
            <span onClick={() => onNavigate?.("savingsInsights")} style={{ fontSize: 12.5, fontWeight: 600, color: teal, cursor: "pointer" }}>See all</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {savingsCards.map((sv) => (
              <div key={sv.headline} onClick={() => onNavigate?.("savingsInsights")} style={{ background: "oklch(95% 0.03 150)", borderRadius: 16, padding: 14, cursor: "pointer" }}>
                <div style={{ fontSize: 13.5, fontWeight: 700, color: "oklch(30% 0.08 150)" }}>{sv.headline}</div>
                <div style={{ fontSize: 12.5, color: "oklch(38% 0.06 150)", marginTop: 4, lineHeight: 1.4 }}>{sv.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <TabBar active="home" onNavigate={onNavigate} />
    </div>
  );
}

function AnalyticsHubScreen({ onNavigate }: { onNavigate?: (s: DemoScreenKey) => void }) {
  const proj = buildProjChart();
  const treeCategories = buildTreeCategories();
  const treePreview = treeCategories.slice(0, 5).map((c) => ({
    ...c,
    widthPct: Math.max(8, Math.round((c.total / treeCategories[0].total) * 100)),
  }));
  const donutStops = treeCategories.reduce<{ acc: number; stops: string[] }>(
    (state, cat) => ({
      acc: state.acc + cat.pct,
      stops: [...state.stops, `${cat.color} ${state.acc}% ${state.acc + cat.pct}%`],
    }),
    { acc: 0, stops: [] },
  ).stops;
  const donutGradient = `conic-gradient(${donutStops.join(", ")})`;

  const trendSlice = TREND.slice(-3);
  const trendMonthsSlice = TREND_MONTHS.slice(-3);
  const trendMax = Math.max(...trendSlice);
  const projChips = ["Total", ...Object.keys(
    SUBSCRIPTIONS.reduce<Record<string, true>>((a, s) => ({ ...a, [s.category]: true }), {}),
  )];

  const leaderboard = sortedByMonthlyDesc;
  const topCategory = treeCategories[0];
  const analyticsInsights = [
    `${topCategory.name} is your biggest category at ${topCategory.pct}% of total spend — ${leaderboard[0].name} alone is ${fmtINR(leaderboard[0].monthly)}/month.`,
    `Spend has grown ${Math.round(((TREND[11] - TREND[0]) / TREND[0]) * 100)}% over the last 12 months.`,
  ];

  return (
    <div style={{ minHeight: "100%", display: "flex", flexDirection: "column", background: pageBg }}>
      <div style={{ flex: 1, padding: "22px 18px 16px", display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={h1Style}>Analytics</div>

        <div style={{ background: "#fff", borderRadius: 20, padding: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
            <div>
              <div style={{ fontSize: 14.5, fontWeight: 700, color: "oklch(22% 0.01 80)" }}>Spend projection</div>
              <div style={{ fontSize: 11.5, color: "oklch(54% 0.01 80)", marginTop: 2 }}>Next 6 months</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontFamily: sora, fontSize: 18, fontWeight: 800, color: "oklch(22% 0.01 80)" }}>{proj.endLabel}</div>
              <div style={{ fontSize: 11.5, fontWeight: 700, color: "oklch(48% 0.12 40)", marginTop: 2 }}>{proj.deltaLabel} projected</div>
            </div>
          </div>
          <div className="phone-scroll" style={{ display: "flex", gap: 6, overflowX: "auto", margin: "0 -4px 12px", padding: "0 4px" }}>
            {projChips.map((c, i) => (
              <span
                key={c}
                style={{
                  fontSize: 11.5,
                  fontWeight: 700,
                  padding: "6px 12px",
                  borderRadius: 100,
                  background: i === 0 ? teal : "#fff",
                  color: i === 0 ? "#fff" : "oklch(38% 0.03 175)",
                  border: `1px solid ${i === 0 ? teal : "oklch(88% 0.015 80)"}`,
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                }}
              >
                {c}
              </span>
            ))}
          </div>
          <svg viewBox="0 0 320 132" style={{ width: "100%", height: "auto", display: "block" }}>
            <defs>
              <linearGradient id="projFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="oklch(45% 0.08 175)" stopOpacity="0.26" />
                <stop offset="100%" stopColor="oklch(45% 0.08 175)" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d={proj.area} fill="url(#projFill)" />
            <path d={proj.line} fill="none" stroke="oklch(42% 0.08 175)" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
            {proj.dots.map((d, i) => (
              <circle key={i} cx={d.cx} cy={d.cy} r={d.r} fill={d.fill} stroke="oklch(42% 0.08 175)" strokeWidth="2" />
            ))}
          </svg>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
            {proj.labelItems.map((l) => (
              <span key={l.label} style={{ fontSize: 9.5, fontWeight: l.weight, color: l.color }}>{l.label}</span>
            ))}
          </div>
          <div style={{ fontSize: 11, color: "oklch(55% 0.01 80)", marginTop: 10, lineHeight: 1.4 }}>
            Projected from your current run-rate, incl. Adobe&rsquo;s ₹150 rise from Sep.
          </div>
        </div>

        <div style={{ background: "#fff", borderRadius: 20, padding: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <span style={{ fontSize: 14.5, fontWeight: 700, color: "oklch(22% 0.01 80)" }}>Spend tree</span>
            <span style={{ fontSize: 12.5, fontWeight: 600, color: teal }}>Explore →</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
            {treePreview.map((c) => (
              <div key={c.name}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
                  <div style={{ width: 8, height: 8, borderRadius: 3, background: c.color, flexShrink: 0 }} />
                  <span style={{ fontSize: 12.5, fontWeight: 600, color: "oklch(28% 0.01 80)", flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.name}</span>
                  <span style={{ fontSize: 12, color: "oklch(52% 0.01 80)" }}>{fmtINR(c.total)}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "oklch(24% 0.01 80)", width: 34, textAlign: "right" }}>{c.pct}%</span>
                </div>
                <div style={{ height: 7, borderRadius: 100, background: c.tint, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${c.widthPct}%`, background: c.color, borderRadius: 100 }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: "#fff", borderRadius: 20, padding: 16 }}>
          <div style={{ fontSize: 14.5, fontWeight: 700, color: "oklch(22% 0.01 80)", marginBottom: 14 }}>Category breakdown</div>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div style={{ width: 108, height: 108, borderRadius: "50%", background: donutGradient, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <div style={{ width: 66, height: 66, borderRadius: "50%", background: "#fff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: 15, fontWeight: 800, color: "oklch(22% 0.01 80)", fontFamily: sora }}>{fmtINR(TOTAL_MONTHLY)}</span>
                <span style={{ fontSize: 9.5, color: "oklch(52% 0.01 80)" }}>per month</span>
              </div>
            </div>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8, minWidth: 0 }}>
              {treeCategories.map((cat) => (
                <div key={cat.name} style={{ display: "flex", alignItems: "center", gap: 7 }}>
                  <div style={{ width: 8, height: 8, borderRadius: 2, background: cat.color, flexShrink: 0 }} />
                  <span style={{ fontSize: 12, color: "oklch(30% 0.01 80)", flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{cat.name}</span>
                  <span style={{ fontSize: 11.5, fontWeight: 600, color: "oklch(50% 0.01 80)" }}>{cat.pct}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ background: "#fff", borderRadius: 20, padding: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <span style={{ fontSize: 14.5, fontWeight: 700, color: "oklch(22% 0.01 80)" }}>Monthly trend</span>
            <div style={{ display: "flex", gap: 4, background: "oklch(94% 0.01 80)", borderRadius: 100, padding: 3 }}>
              {["3M", "6M", "12M"].map((f, i) => (
                <span key={f} style={{ fontSize: 11, fontWeight: 700, padding: "5px 10px", borderRadius: 100, background: i === 0 ? teal : "transparent", color: i === 0 ? "#fff" : "oklch(45% 0.01 80)" }}>{f}</span>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 90 }}>
            {trendSlice.map((v, i) => (
              <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6, height: "100%", justifyContent: "flex-end" }}>
                <div style={{ width: "100%", borderRadius: 4, height: `${Math.round((v / trendMax) * 100)}%`, background: i === trendSlice.length - 1 ? teal : "oklch(88% 0.02 175)" }} />
                <span style={{ fontSize: 9.5, color: "oklch(55% 0.01 80)" }}>{trendMonthsSlice[i]}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: "#fff", borderRadius: 20, padding: 16 }}>
          <div style={{ fontSize: 14.5, fontWeight: 700, color: "oklch(22% 0.01 80)", marginBottom: 8 }}>Annual cost leaderboard</div>
          {leaderboard.map((lb, i) => (
            <div key={lb.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 0", borderBottom: i < leaderboard.length - 1 ? "1px solid oklch(95% 0.01 80)" : "none" }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: "oklch(60% 0.01 80)", width: 16 }}>{i + 1}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "oklch(22% 0.01 80)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{lb.name}</div>
              </div>
              <span style={{ fontSize: 13, fontWeight: 700, color: "oklch(22% 0.01 80)" }}>{fmtINR(lb.monthly * 12)}</span>
            </div>
          ))}
        </div>

        <div
          onClick={() => onNavigate?.("savingsInsights")}
          style={{ background: "linear-gradient(135deg, oklch(40% 0.075 175), oklch(48% 0.09 165))", borderRadius: 20, padding: 18, cursor: "pointer", display: "flex", alignItems: "center", gap: 14 }}
        >
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12.5, fontWeight: 700, color: "oklch(88% 0.03 175)", textTransform: "uppercase", letterSpacing: "0.02em" }}>Savings insights</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginTop: 6 }}>Up to ₹2,250/month available</div>
            <div style={{ fontSize: 12.5, color: "oklch(90% 0.03 175)", marginTop: 4 }}>{SAVINGS_INSIGHTS.length} ideas to review →</div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {analyticsInsights.map((text) => (
            <div key={text} style={{ background: "#fff", borderRadius: 16, padding: 14 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: "oklch(22% 0.01 80)", lineHeight: 1.4 }}>{text}</div>
            </div>
          ))}
        </div>
      </div>
      <TabBar active="analytics" onNavigate={onNavigate} />
    </div>
  );
}

function RenewalsScreen({ onNavigate }: { onNavigate?: (s: DemoScreenKey) => void }) {
  const upcoming = SUBSCRIPTIONS.filter((x) => daysUntil(x.renewDate) >= 0).sort(
    (a, b) => daysUntil(a.renewDate) - daysUntil(b.renewDate),
  );
  const windowSubs = upcoming.filter((x) => daysUntil(x.renewDate) <= 30);
  const windowTotal = fmtINR(windowSubs.reduce((a, x) => a + x.billedAmount, 0));
  const next = upcoming[0];
  const nd = daysUntil(next.renewDate);
  const nextDate = new Date(next.renewDate + "T00:00:00");

  const barBuckets = [0, 1, 2, 3].map((i) => {
    const from = i * 7;
    const to = from + 6;
    const items = upcoming.filter((x) => {
      const d = daysUntil(x.renewDate);
      return d >= from && d <= to;
    });
    return { i, total: items.reduce((a, x) => a + x.billedAmount, 0), count: items.length };
  });
  const barMax = Math.max(1, ...barBuckets.map((b) => b.total));
  const loadPeak = barBuckets.reduce((a, b) => (b.total > a.total ? b : a), barBuckets[0]);
  const loadHint = loadPeak.total
    ? loadPeak.i === 0
      ? `Heaviest week is this one — ${fmtINR(loadPeak.total)} across ${loadPeak.count}${loadPeak.count === 1 ? " renewal." : " renewals."}`
      : `Biggest hit lands in week ${loadPeak.i + 1} — ${fmtINR(loadPeak.total)}.`
    : "Nothing due in the next four weeks.";

  const covTotal = windowSubs.length;
  const covSet = windowSubs.filter((x) => daysUntil(x.renewDate) <= 3).length;

  const weekLabelFor = (d: number) =>
    d <= 0 ? "Today" : d <= 7 ? "This week" : d <= 14 ? "Next week" : d <= 30 ? "This month" : "Later";
  const groupsMap: Record<string, typeof SUBSCRIPTIONS> = {};
  windowSubs.forEach((sub) => {
    const wk = weekLabelFor(daysUntil(sub.renewDate));
    (groupsMap[wk] = groupsMap[wk] || []).push(sub);
  });

  const trials = TRIALS_ENDING.map((t) => ({ ...t, daysLabel: `Ends in ${daysUntil(t.endDate)}d` }));

  return (
    <div style={{ minHeight: "100%", display: "flex", flexDirection: "column", background: pageBg }}>
      <div style={{ flex: 1, padding: "22px 18px 16px", display: "flex", flexDirection: "column", gap: 18 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <div style={h1Style}>Renewals</div>
          <div style={{ fontSize: 12.5, color: "oklch(52% 0.01 80)" }}>
            {windowSubs.length} renewals · <span style={{ fontWeight: 700, color: "oklch(30% 0.01 80)" }}>{windowTotal}</span>
          </div>
        </div>

        {/* Next charge */}
        <div style={{ borderRadius: 22, padding: 18, background: "linear-gradient(150deg, oklch(42% 0.08 175), oklch(30% 0.06 195))", color: "#fff", boxShadow: "0 16px 34px -24px oklch(40% 0.075 175)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 42, height: 42, borderRadius: 13, background: "rgba(255,255,255,0.16)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: sora, fontSize: 18, fontWeight: 700, flexShrink: 0 }}>{next.name[0]}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "oklch(85% 0.04 175)" }}>Next charge</div>
              <div style={{ fontFamily: sora, fontSize: 17, fontWeight: 700, marginTop: 2 }}>{next.name}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontFamily: sora, fontSize: 22, fontWeight: 800 }}>{fmtINR(next.billedAmount)}</div>
              <div style={{ fontSize: 11, color: "oklch(85% 0.04 175)" }}>per {next.billedCycle}</div>
            </div>
          </div>
          <div style={{ marginTop: 16, display: "flex", alignItems: "center", gap: 12, background: "rgba(255,255,255,0.1)", borderRadius: 15, padding: "12px 14px" }}>
            <div style={{ textAlign: "center", minWidth: 46 }}>
              <div style={{ fontFamily: sora, fontSize: 22, fontWeight: 800, lineHeight: 1 }}>{nd === 0 ? "Today" : nd}</div>
              <div style={{ fontSize: 10, color: "oklch(85% 0.04 175)", marginTop: 3 }}>
                {nd === 0 ? "charges today" : nd === 1 ? "day away" : "days away"}
              </div>
            </div>
            <div style={{ width: 1, alignSelf: "stretch", background: "rgba(255,255,255,0.2)" }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 600 }}>
                {nextDate.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" })}
              </div>
              <div style={{ fontSize: 11.5, color: "oklch(85% 0.04 175)", marginTop: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{PAYMENT_METHOD}</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 9, marginTop: 13 }}>
            <span style={{ flex: 1, textAlign: "center", padding: 11, borderRadius: 13, background: "#fff", color: "oklch(35% 0.075 175)", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Remind me</span>
            <span style={{ flex: 1, textAlign: "center", padding: 11, borderRadius: 13, background: "rgba(255,255,255,0.14)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Manage</span>
          </div>
        </div>

        {/* Renewal load */}
        <div style={{ background: "#fff", borderRadius: 20, padding: "16px 18px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: "oklch(22% 0.01 80)" }}>Renewal load</span>
            <span style={{ fontSize: 11.5, color: "oklch(55% 0.01 80)" }}>Next 4 weeks</span>
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 10, minHeight: 116, marginTop: 14 }}>
            {barBuckets.map((b) => (
              <div key={b.i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6, justifyContent: "flex-end" }}>
                <span style={{ fontSize: 10.5, fontWeight: 700, color: b.i === 0 ? "oklch(35% 0.075 175)" : "oklch(55% 0.01 80)" }}>{b.total ? fmtINR(b.total) : "—"}</span>
                <div style={{ width: "100%", height: Math.max(6, Math.round((b.total / barMax) * 74)), borderRadius: "8px 8px 4px 4px", background: b.i === 0 ? "oklch(48% 0.09 175)" : "oklch(84% 0.05 175)" }} />
                <span style={{ fontSize: 10.5, color: "oklch(55% 0.01 80)" }}>{b.i === 0 ? "This wk" : `Wk ${b.i + 1}`}</span>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 12, color: "oklch(48% 0.01 80)", marginTop: 12, paddingTop: 12, borderTop: "1px solid oklch(94% 0.008 80)", lineHeight: 1.45 }}>{loadHint}</div>
        </div>

        {/* Reminder coverage */}
        <div style={{ background: "#fff", borderRadius: 20, padding: "16px 18px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: "oklch(22% 0.01 80)" }}>Reminder coverage</span>
            <span style={{ fontSize: 12.5, fontWeight: 700, color: teal }}>
              {covSet} of {covTotal}
            </span>
          </div>
          <div style={{ height: 8, borderRadius: 4, background: "oklch(93% 0.01 80)", marginTop: 12, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${covTotal ? Math.round((covSet / covTotal) * 100) : 0}%`, borderRadius: 4, background: "oklch(52% 0.1 175)" }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, marginTop: 11 }}>
            <span style={{ fontSize: 12, color: "oklch(50% 0.01 80)", lineHeight: 1.4 }}>
              {covTotal - covSet === 0 ? "Every upcoming renewal is covered." : `${covTotal - covSet} renewals will charge without warning.`}
            </span>
            {covTotal - covSet > 0 && (
              <span style={{ fontSize: 12.5, fontWeight: 700, color: teal, whiteSpace: "nowrap", cursor: "pointer" }}>Fix this</span>
            )}
          </div>
        </div>

        {/* Window filter chips */}
        <div style={{ display: "flex", gap: 8 }}>
          {["Next 7 days", "Next 30 days", "Next 90 days"].map((label, i) => (
            <span key={label} style={{ flex: 1, textAlign: "center", fontSize: 12.5, fontWeight: 600, padding: "10px 6px", borderRadius: 100, background: i === 1 ? teal : "#fff", color: i === 1 ? "#fff" : "oklch(40% 0.01 80)" }}>{label}</span>
          ))}
        </div>

        {/* Trials ending soon */}
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: "oklch(50% 0.11 25)", marginBottom: 10 }}>Trials ending soon</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {trials.map((trial) => (
              <div key={trial.id} style={{ background: "oklch(94% 0.03 25)", borderRadius: 14, padding: "13px 15px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "oklch(30% 0.08 25)" }}>{trial.name}</div>
                  <div style={{ fontSize: 11.5, color: "oklch(40% 0.08 25)", marginTop: 2 }}>{trial.category}</div>
                </div>
                <span style={{ fontSize: 12, fontWeight: 700, color: "oklch(45% 0.13 25)", background: "#fff", padding: "5px 10px", borderRadius: 100 }}>{trial.daysLabel}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {Object.keys(groupsMap).map((label) => {
            const items = groupsMap[label];
            return (
              <div key={label}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 10 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: "oklch(45% 0.01 80)" }}>{label}</span>
                  <span style={{ fontSize: 11.5, fontWeight: 600, color: "oklch(58% 0.01 80)" }}>
                    {items.length} · {fmtINR(items.reduce((a, x) => a + x.billedAmount, 0))}
                  </span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {items.map((sub) => {
                    const d = daysUntil(sub.renewDate);
                    const date = new Date(sub.renewDate + "T00:00:00");
                    const urgent = d <= 3;
                    return (
                      <div key={sub.id} style={{ background: "#fff", borderRadius: 16, padding: "13px 14px", display: "flex", gap: 12, alignItems: "center" }}>
                        <div style={{ width: 44, flexShrink: 0, borderRadius: 12, background: urgent ? "oklch(95% 0.04 30)" : "oklch(96% 0.012 80)", padding: "7px 0", textAlign: "center" }}>
                          <div style={{ fontFamily: sora, fontSize: 17, fontWeight: 800, lineHeight: 1, color: urgent ? "oklch(48% 0.13 30)" : "oklch(38% 0.01 80)" }}>{date.getDate()}</div>
                          <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.06em", color: urgent ? "oklch(48% 0.13 30)" : "oklch(38% 0.01 80)", marginTop: 3 }}>
                            {date.toLocaleDateString("en-IN", { month: "short" }).toUpperCase()}
                          </div>
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 8 }}>
                            <span style={{ fontSize: 14.5, fontWeight: 600, color: "oklch(22% 0.01 80)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{sub.name}</span>
                            <span style={{ fontSize: 15, fontWeight: 700, color: "oklch(22% 0.01 80)", whiteSpace: "nowrap" }}>{fmtINR(sub.billedAmount)}</span>
                          </div>
                          <div style={{ display: "flex", alignItems: "center", gap: 7, marginTop: 5, flexWrap: "wrap" }}>
                            <span style={{ fontSize: 10.5, fontWeight: 600, padding: "2px 8px", borderRadius: 100, background: catTint(sub.category), color: catText(sub.category) }}>{sub.category}</span>
                            <span style={{ fontSize: 11.5, color: "oklch(55% 0.01 80)" }}>
                              {d === 0 ? "today" : d === 1 ? "in 1 day" : `in ${d} days`}
                            </span>
                            <span style={{ fontSize: 10.5, fontWeight: 600, padding: "2px 8px", borderRadius: 100, background: urgent ? "oklch(94% 0.04 150)" : "oklch(93% 0.01 80)", color: urgent ? "oklch(38% 0.1 150)" : "oklch(55% 0.01 80)" }}>
                              {urgent ? "Reminder set" : "No reminder"}
                            </span>
                          </div>
                          <div style={{ display: "flex", gap: 16, marginTop: 10, paddingTop: 10, borderTop: "1px solid oklch(95% 0.008 80)" }}>
                            <span style={{ fontSize: 12, fontWeight: 600, color: teal, cursor: "pointer" }}>Remind me</span>
                            <span style={{ fontSize: 12, fontWeight: 600, color: "oklch(45% 0.01 80)", cursor: "pointer" }}>Edit</span>
                            <span style={{ fontSize: 12, fontWeight: 600, color: "oklch(50% 0.11 25)", cursor: "pointer" }}>Cancel</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <TabBar active="renewals" onNavigate={onNavigate} />
    </div>
  );
}

function SubscriptionsScreen({ onNavigate }: { onNavigate?: (s: DemoScreenKey) => void }) {
  const items = [...SUBSCRIPTIONS].sort((a, b) => b.monthly - a.monthly);
  const filters = ["All", "Active", "Trials", "Annual", "Monthly", "Needs review"];
  return (
    <div style={{ minHeight: "100%", display: "flex", flexDirection: "column", background: pageBg, position: "relative" }}>
      <div style={{ flex: 1, padding: "22px 18px 16px", display: "flex", flexDirection: "column", gap: 14 }}>
        <div style={h1Style}>Subscriptions</div>

        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <div style={{ flex: 1, background: "#fff", borderRadius: 100, padding: "11px 16px", fontSize: 13.5, color: "oklch(55% 0.01 80)" }}>Search subscriptions</div>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <div style={{ width: 14, height: 10, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div style={{ height: 2, background: "oklch(45% 0.01 80)", borderRadius: 1 }} />
              <div style={{ height: 2, background: "oklch(45% 0.01 80)", borderRadius: 1, width: "70%" }} />
              <div style={{ height: 2, background: "oklch(45% 0.01 80)", borderRadius: 1, width: "40%" }} />
            </div>
          </div>
        </div>

        <div className="phone-scroll" style={{ display: "flex", gap: 8, overflowX: "auto", margin: "0 -18px", padding: "0 18px" }}>
          {filters.map((f, i) => (
            <span key={f} style={{ whiteSpace: "nowrap", fontSize: 12.5, fontWeight: 600, padding: "9px 14px", borderRadius: 100, background: i === 0 ? teal : "#fff", color: i === 0 ? "#fff" : "oklch(40% 0.01 80)", flexShrink: 0 }}>{f}</span>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {items.map((item) => {
            const status = STATUS_META[item.status];
            return (
              <div key={item.id} style={{ background: "#fff", borderRadius: 16, padding: 14, display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 38, height: 38, borderRadius: 11, background: catTint(item.category), color: catText(item.category), display: "flex", alignItems: "center", justifyContent: "center", fontFamily: sora, fontWeight: 700, fontSize: 14, flexShrink: 0 }}>{item.name[0]}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 14.5, fontWeight: 600, color: "oklch(22% 0.01 80)" }}>{item.name}</span>
                    <span style={{ fontSize: 10.5, fontWeight: 700, padding: "2px 8px", borderRadius: 100, background: status.bg, color: status.color }}>{status.label}</span>
                  </div>
                  <div style={{ fontSize: 12, color: "oklch(52% 0.01 80)", marginTop: 3 }}>
                    {item.category} · Renews {fmtShortDate(item.renewDate)}
                  </div>
                </div>
                <span style={{ fontSize: 14.5, fontWeight: 700, color: "oklch(22% 0.01 80)", whiteSpace: "nowrap" }}>
                  {fmtINR(item.billedAmount)}/{item.billedCycle}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div
        onClick={() => onNavigate?.("catalogStart")}
        style={{
          position: "sticky",
          bottom: 86,
          alignSelf: "flex-end",
          marginRight: 20,
          width: 54,
          height: 54,
          borderRadius: "50%",
          background: teal,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          boxShadow: "0 8px 20px rgba(0,0,0,0.18)",
        }}
      >
        <div style={{ width: 18, height: 18, position: "relative" }}>
          <div style={{ position: "absolute", left: 8, top: 0, width: 2, height: 18, background: "#fff", borderRadius: 1 }} />
          <div style={{ position: "absolute", left: 0, top: 8, width: 18, height: 2, background: "#fff", borderRadius: 1 }} />
        </div>
      </div>

      <TabBar active="subscriptions" onNavigate={onNavigate} />
    </div>
  );
}

function CatalogStartScreen() {
  return (
    <div style={{ minHeight: "100%", display: "flex", flexDirection: "column", background: pageBg }}>
      <div style={{ padding: "18px 22px 0", display: "flex", alignItems: "center", gap: 12 }}>
        <BackCaret />
        <div style={{ flex: 1 }} />
        <span style={{ fontSize: 13.5, fontWeight: 600, color: teal, cursor: "pointer" }}>Add custom</span>
      </div>

      <div style={{ flex: 1, padding: "10px 22px 20px", display: "flex", flexDirection: "column", gap: 18 }}>
        <div>
          <div style={{ fontFamily: sora, fontSize: 23, fontWeight: 700, color: "oklch(22% 0.01 80)" }}>Add a subscription</div>
          <div style={{ fontSize: 14, color: "oklch(52% 0.01 80)", marginTop: 6, lineHeight: 1.5 }}>Pick a service for a faster setup, or add a custom one.</div>
        </div>

        <div style={{ background: "#fff", borderRadius: 14, padding: "14px 16px", display: "flex", alignItems: "center", gap: 10, border: "1.5px solid oklch(90% 0.01 80)" }}>
          <div style={{ width: 15, height: 15, borderRadius: "50%", border: "2px solid oklch(60% 0.01 80)", position: "relative" }}>
            <div style={{ position: "absolute", width: 6, height: 2, background: "oklch(60% 0.01 80)", borderRadius: 1, transform: "rotate(45deg)", right: -4, bottom: -1 }} />
          </div>
          <span style={{ fontSize: 14.5, color: "oklch(55% 0.01 80)" }}>Search services</span>
        </div>

        <div style={{ display: "inline-flex", alignSelf: "flex-start", alignItems: "center", gap: 6, background: "oklch(94% 0.03 175)", borderRadius: 100, padding: "6px 12px" }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "oklch(45% 0.09 175)" }} />
          <span style={{ fontSize: 12, fontWeight: 600, color: "oklch(38% 0.075 175)" }}>Prices shown for India · INR</span>
        </div>

        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: "oklch(30% 0.01 80)", marginBottom: 12 }}>Popular near you</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
            {CATALOG_POPULAR.map((svc) => (
              <div key={svc.id} style={{ background: "#fff", borderRadius: 16, padding: "14px 8px", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, cursor: "pointer", border: "1px solid oklch(93% 0.008 80)" }}>
                <div style={{ width: 46, height: 46, borderRadius: 13, background: svc.color, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: sora, fontSize: 16, fontWeight: 800, letterSpacing: "-0.02em" }}>{svc.mono}</div>
                <span style={{ fontSize: 11.5, fontWeight: 600, color: "oklch(30% 0.01 80)", textAlign: "center", lineHeight: 1.2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "100%" }}>{svc.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: "oklch(30% 0.01 80)", marginBottom: 12 }}>Browse by category</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {CATALOG_BROWSE.map((cat) => (
              <div key={cat.name} style={{ display: "flex", alignItems: "center", gap: 8, background: "#fff", borderRadius: 100, padding: "10px 15px", cursor: "pointer", border: "1px solid oklch(93% 0.008 80)" }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: cat.color }} />
                <span style={{ fontSize: 13, fontWeight: 600, color: "oklch(30% 0.01 80)" }}>{cat.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ padding: "12px 22px 22px", background: pageBg }}>
        <div style={{ textAlign: "center", fontSize: 13, color: "oklch(52% 0.01 80)", marginBottom: 10 }}>Can&rsquo;t find your service?</div>
        <div style={{ width: "100%", padding: 15, borderRadius: 16, background: "#fff", color: "oklch(38% 0.075 175)", border: "1.5px solid oklch(85% 0.02 175)", fontSize: 15, fontWeight: 600, textAlign: "center", cursor: "pointer" }}>Add custom subscription</div>
      </div>
    </div>
  );
}

function SavingsInsightsScreen() {
  const groups = INSIGHT_TYPE_ORDER.map((type) => ({
    type,
    items: SAVINGS_INSIGHTS.filter((i) => i.type === type),
  })).filter((g) => g.items.length > 0);

  return (
    <div style={{ minHeight: "100%", display: "flex", flexDirection: "column", background: pageBg }}>
      <div style={{ padding: "20px 18px 0", display: "flex", alignItems: "center", gap: 12 }}>
        <BackCaret />
        <div style={{ fontFamily: sora, fontSize: 18, fontWeight: 700, color: "oklch(22% 0.01 80)" }}>Savings insights</div>
      </div>

      <div style={{ padding: "16px 18px", display: "flex", flexDirection: "column", gap: 20, flex: 1 }}>
        <div style={{ background: "oklch(95% 0.03 150)", borderRadius: 20, padding: 20 }}>
          <div style={{ fontSize: 12.5, fontWeight: 700, color: "oklch(38% 0.08 150)", textTransform: "uppercase", letterSpacing: "0.02em" }}>Potential savings</div>
          <div style={{ fontFamily: sora, fontSize: 28, fontWeight: 800, color: "oklch(28% 0.1 150)", marginTop: 6 }}>Up to ₹2,250/month</div>
          <div style={{ fontSize: 13, color: "oklch(35% 0.07 150)", marginTop: 6, lineHeight: 1.5 }}>
            {SAVINGS_INSIGHTS.length} ideas worth a quick look — no pressure, just options.
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {groups.map((grp) => (
            <div key={grp.type}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "oklch(45% 0.01 80)", textTransform: "uppercase", letterSpacing: "0.02em", marginBottom: 10 }}>{grp.type}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {grp.items.map((ins) => (
                  <div key={ins.headline} style={{ background: "#fff", borderRadius: 18, padding: 16 }}>
                    <div style={{ fontSize: 14.5, fontWeight: 600, color: "oklch(22% 0.01 80)", lineHeight: 1.4 }}>{ins.headline}</div>
                    <div style={{ fontSize: 12.5, color: "oklch(52% 0.01 80)", marginTop: 6, lineHeight: 1.5 }}>{ins.explanation}</div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 12 }}>
                      <span style={{ fontSize: 12.5, fontWeight: 700, color: "oklch(38% 0.08 150)", background: "oklch(95% 0.03 150)", padding: "5px 11px", borderRadius: 100 }}>{ins.savingsLabel}</span>
                      <div style={{ display: "flex", gap: 14 }}>
                        <span style={{ fontSize: 12.5, fontWeight: 600, color: "oklch(52% 0.01 80)", cursor: "pointer" }}>Dismiss</span>
                        <span style={{ fontSize: 12.5, fontWeight: 700, color: teal, cursor: "pointer" }}>
                          {ins.type === "Price increase detected" ? "Review" : "View"}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProfileNotificationsScreen() {
  return (
    <div style={{ minHeight: "100%", display: "flex", flexDirection: "column", background: pageBg, padding: "20px 18px 24px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <BackCaret />
        <div style={{ fontFamily: sora, fontSize: 18, fontWeight: 700, color: "oklch(22% 0.01 80)" }}>Notifications</div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 18 }}>
        {NOTIF_ROWS.map((n) => (
          <div key={n.key} style={{ background: "#fff", borderRadius: 16, padding: 15, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: "oklch(22% 0.01 80)" }}>{n.label}</div>
              <div style={{ fontSize: 12, color: "oklch(52% 0.01 80)", marginTop: 3 }}>{n.detail}</div>
            </div>
            <Toggle on={n.on} />
          </div>
        ))}
      </div>
    </div>
  );
}

/* =========================================================================
   Phone shell
   ========================================================================= */

export default function DemoPhone({
  screen,
  onNavigate,
}: {
  screen: DemoScreenKey;
  onNavigate?: (screen: DemoScreenKey) => void;
}) {
  return (
    <div
      style={{
        width: 412,
        borderRadius: 44,
        background: "oklch(20% 0.01 80)",
        padding: 10,
      }}
    >
      <div
        style={{
          borderRadius: 36,
          overflow: "hidden",
          background: pageBg,
          height: 872,
          display: "flex",
          flexDirection: "column",
          position: "relative",
        }}
      >
        <div
          style={{
            height: 34,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 24px",
            fontSize: 12,
            fontWeight: 600,
            color: "oklch(35% 0.01 80)",
            flexShrink: 0,
            background: pageBg,
          }}
        >
          <span>9:41</span>
          <span style={{ letterSpacing: 1 }}>▮▮▮</span>
        </div>

        <div
          key={screen}
          className="phone-scroll"
          style={{
            flex: 1,
            overflowY: "auto",
            overflowX: "hidden",
            display: "flex",
            flexDirection: "column",
            animation: "softIn 0.35s ease",
          }}
        >
          {screen === "welcomeAuth" && <WelcomeAuthScreen />}
          {screen === "dashboard" && <DashboardScreen onNavigate={onNavigate} />}
          {screen === "subscriptions" && <SubscriptionsScreen onNavigate={onNavigate} />}
          {screen === "analyticsHub" && <AnalyticsHubScreen onNavigate={onNavigate} />}
          {screen === "renewals" && <RenewalsScreen onNavigate={onNavigate} />}
          {screen === "catalogStart" && <CatalogStartScreen />}
          {screen === "savingsInsights" && <SavingsInsightsScreen />}
          {screen === "profileNotifications" && <ProfileNotificationsScreen />}
        </div>
      </div>
    </div>
  );
}
