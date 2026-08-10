"use client";

import { EYEBROW_STYLE, FONT_SORA } from "@/lib/brand";
import { useCurrency, type Currency } from "@/lib/currency";
import { getAnalytics } from "@/lib/siteData";

export default function PayoffSection() {
  const { currency, setCurrency } = useCurrency();
  const an = getAnalytics(currency === "USD");

  return (
    <section style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px 24px" }}>
      <div style={{ borderTop: "1px solid oklch(89% 0.01 80)", paddingTop: 64 }}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: 20,
          }}
        >
          <div style={{ maxWidth: 620 }}>
            <div style={EYEBROW_STYLE}>The payoff</div>
            <h2
              style={{
                fontFamily: FONT_SORA,
                fontSize: "clamp(28px, 3vw, 40px)",
                fontWeight: 700,
                letterSpacing: "-0.026em",
                margin: "14px 0 0",
                textWrap: "balance",
              }}
            >
              Your charges, turned into decisions you can act on.
            </h2>
            <p style={{ fontSize: 16.5, lineHeight: 1.6, color: "oklch(48% 0.012 80)", margin: "12px 0 0" }}>
              Once your subscriptions are confirmed, the app projects where the year is heading, shows which category is
              driving it, and names the service behind the change.
            </p>
          </div>
          <div style={{ display: "flex", gap: 5, background: "oklch(94% 0.008 80)", borderRadius: 10, padding: 4 }}>
            {(["INR", "USD"] as Currency[]).map((c) => {
              const selected = currency === c;
              return (
                <button
                  key={c}
                  onClick={() => setCurrency(c)}
                  aria-pressed={selected}
                  style={{
                    border: "none",
                    fontFamily: "var(--font-work-sans), sans-serif",
                    fontSize: 13,
                    fontWeight: 600,
                    padding: "8px 14px",
                    borderRadius: 7,
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    transition: "all 0.18s ease",
                    background: selected ? "#fff" : "transparent",
                    color: selected ? "oklch(28% 0.01 80)" : "oklch(55% 0.012 80)",
                    boxShadow: selected ? "0 1px 3px oklch(30% 0.02 80 / 0.14)" : "none",
                  }}
                >
                  {c === "INR" ? "₹ INR" : "$ USD"}
                </button>
              );
            })}
          </div>
        </div>

        <div
          data-r="band"
          style={{
            marginTop: 36,
            borderRadius: 30,
            background: "oklch(24% 0.02 175)",
            color: "#fff",
            padding: 40,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: -180,
              right: -80,
              width: 560,
              height: 560,
              borderRadius: "50%",
              background: "radial-gradient(circle, oklch(50% 0.075 175 / 0.35), transparent 68%)",
            }}
          />

          <div
            data-r="cols"
            style={{
              position: "relative",
              display: "grid",
              gridTemplateColumns: "300px 1fr",
              gap: 48,
              alignItems: "center",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 11.5,
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "oklch(76% 0.08 175)",
                }}
              >
                Projected 12-month spend
              </div>
              <div
                style={{
                  fontFamily: FONT_SORA,
                  fontSize: "clamp(42px, 4.6vw, 58px)",
                  fontWeight: 800,
                  letterSpacing: "-0.03em",
                  lineHeight: 1,
                  marginTop: 14,
                }}
              >
                {an.projEnd}
              </div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  marginTop: 14,
                  background: "oklch(32% 0.035 175)",
                  border: "1px solid oklch(42% 0.045 175)",
                  borderRadius: 100,
                  padding: "7px 13px",
                }}
              >
                <span style={{ fontFamily: FONT_SORA, fontSize: 13, fontWeight: 700, color: "oklch(84% 0.09 70)" }}>
                  {an.projDelta}
                </span>
                <span style={{ fontSize: 12.5, color: "oklch(88% 0.02 175)" }}>vs holding flat</span>
              </div>
              <p style={{ fontSize: 14.5, lineHeight: 1.6, color: "oklch(78% 0.02 175)", margin: "20px 0 0" }}>
                Built only from renewals you confirmed — no estimates of what you might buy next.
              </p>
            </div>

            <div>
              <svg viewBox="0 0 760 260" style={{ width: "100%", height: "auto", display: "block" }}>
                <defs>
                  <linearGradient id="webProjFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(62% 0.085 175)" stopOpacity="0.36" />
                    <stop offset="100%" stopColor="oklch(62% 0.085 175)" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {an.gridLines.map((y) => (
                  <line key={y} x1="0" y1={y} x2="760" y2={y} stroke="oklch(33% 0.025 175)" strokeWidth="1" />
                ))}
                <path
                  d="M10 196 L135 176 L260 184 L385 134 L510 114 L635 74 L750 44 L750 244 L10 244 Z"
                  fill="url(#webProjFill)"
                />
                <path
                  d="M385 134 L510 130 L635 126 L750 122"
                  fill="none"
                  stroke="oklch(52% 0.025 175)"
                  strokeWidth="2.5"
                  strokeDasharray="7 8"
                  strokeLinecap="round"
                />
                <path
                  d="M10 196 L135 176 L260 184 L385 134 L510 114 L635 74 L750 44"
                  fill="none"
                  stroke="oklch(74% 0.09 175)"
                  strokeWidth="3.5"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
                <circle cx="385" cy="134" r="6" fill="oklch(24% 0.02 175)" stroke="oklch(74% 0.09 175)" strokeWidth="3.5" />
                <circle cx="750" cy="44" r="7" fill="oklch(74% 0.09 175)" />
              </svg>
              <div data-r="months" style={{ display: "flex", justifyContent: "space-between", marginTop: 10 }}>
                {an.months.map((mo) => (
                  <span key={mo.label} style={{ fontSize: 12, fontWeight: mo.weight, color: mo.color }}>
                    {mo.label}
                  </span>
                ))}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 20, marginTop: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "oklch(76% 0.02 175)" }}>
                  <div style={{ width: 20, height: 3, borderRadius: 2, background: "oklch(74% 0.09 175)" }} />
                  With the price rises already announced
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "oklch(70% 0.02 175)" }}>
                  <div style={{ width: 20, height: 3, borderRadius: 2, background: "oklch(52% 0.025 175)" }} />
                  If nothing changed
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          data-r="stats deskonly"
          style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginTop: 16 }}
        >
          {an.stats.map((st) => (
            <div
              key={st.label}
              style={{ background: "#fff", border: "1px solid oklch(92% 0.01 80)", borderRadius: 20, padding: 24 }}
            >
              <div style={{ fontSize: 13, color: "oklch(52% 0.012 80)" }}>{st.label}</div>
              <div
                style={{
                  fontFamily: FONT_SORA,
                  fontSize: 26,
                  fontWeight: 800,
                  letterSpacing: "-0.02em",
                  marginTop: 7,
                  color: st.color,
                }}
              >
                {st.value}
              </div>
              <div style={{ fontSize: 13, color: "oklch(52% 0.012 80)", marginTop: 5, lineHeight: 1.45 }}>{st.note}</div>
            </div>
          ))}
        </div>

        <div
          data-r="mobonly"
          style={{
            background: "#fff",
            border: "1px solid oklch(92% 0.01 80)",
            borderRadius: 22,
            padding: "6px 20px",
            marginTop: 16,
          }}
        >
          {an.stats.map((st) => (
            <div
              key={st.label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                padding: "16px 0",
                borderBottom: "1px solid oklch(95% 0.008 80)",
              }}
            >
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13.5, fontWeight: 600, color: "oklch(30% 0.01 80)" }}>{st.label}</div>
                <div style={{ fontSize: 12.5, color: "oklch(55% 0.012 80)", marginTop: 3, lineHeight: 1.4 }}>{st.note}</div>
              </div>
              <div
                style={{
                  fontFamily: FONT_SORA,
                  fontSize: 21,
                  fontWeight: 800,
                  letterSpacing: "-0.02em",
                  whiteSpace: "nowrap",
                  color: st.color,
                }}
              >
                {st.value}
              </div>
            </div>
          ))}
        </div>

        <div data-r="cols" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 16 }}>
          <div style={{ background: "#fff", border: "1px solid oklch(92% 0.01 80)", borderRadius: 24, padding: 30 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <div style={{ fontFamily: FONT_SORA, fontSize: 18, fontWeight: 600 }}>Where the money goes</div>
              <div style={{ fontSize: 13, color: "oklch(55% 0.012 80)" }}>per month</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 18, marginTop: 22 }}>
              {an.categories.map((c) => (
                <div key={c.name}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 8 }}>
                    <div style={{ width: 9, height: 9, borderRadius: 3, background: c.bg }} />
                    <span style={{ fontSize: 14.5, fontWeight: 500, flex: 1 }}>{c.name}</span>
                    <span style={{ fontFamily: FONT_SORA, fontSize: 15, fontWeight: 700 }}>{c.amount}</span>
                    <span style={{ fontSize: 13, color: "oklch(55% 0.012 80)", width: 38, textAlign: "right" }}>
                      {c.pctLabel}
                    </span>
                  </div>
                  <div style={{ height: 10, borderRadius: 100, background: "oklch(95% 0.01 80)", overflow: "hidden" }}>
                    <div style={{ height: "100%", width: c.pct, background: c.bg, borderRadius: 100 }} />
                  </div>
                  <div style={{ fontSize: 12.5, color: "oklch(58% 0.012 80)", marginTop: 6 }}>{c.note}</div>
                </div>
              ))}
            </div>
          </div>

          <div
            style={{
              background: "#fff",
              border: "1px solid oklch(92% 0.01 80)",
              borderRadius: 24,
              padding: 30,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <div style={{ fontFamily: FONT_SORA, fontSize: 18, fontWeight: 600 }}>What changed this month</div>
              <div style={{ fontSize: 13, color: "oklch(55% 0.012 80)" }}>vs July</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", marginTop: 10 }}>
              {an.changes.map((ch) => (
                <div
                  key={ch.name}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    padding: "15px 0",
                    borderBottom: "1px solid oklch(95% 0.008 80)",
                  }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 11,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: FONT_SORA,
                      fontWeight: 700,
                      fontSize: 14,
                      background: ch.tint,
                      color: ch.fg,
                      flexShrink: 0,
                    }}
                  >
                    {ch.initial}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14.5, fontWeight: 600 }}>{ch.name}</div>
                    <div style={{ fontSize: 12.5, color: "oklch(55% 0.012 80)", marginTop: 2 }}>{ch.reason}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontFamily: FONT_SORA, fontSize: 15, fontWeight: 700, color: ch.deltaColor }}>
                      {ch.delta}
                    </div>
                    <div style={{ fontSize: 12, color: "oklch(58% 0.012 80)" }}>{ch.now}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: "auto", paddingTop: 20 }}>
              <div style={{ background: "oklch(96% 0.02 175)", borderRadius: 16, padding: 18 }}>
                <div style={{ fontFamily: FONT_SORA, fontSize: 15, fontWeight: 600, color: "oklch(30% 0.06 175)" }}>
                  {an.verdictTitle}
                </div>
                <p style={{ fontSize: 13.5, lineHeight: 1.55, color: "oklch(42% 0.04 175)", margin: "6px 0 0" }}>
                  {an.verdictBody}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
