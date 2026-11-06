"use client";

import { EYEBROW_STYLE, FONT_SORA } from "@/lib/brand";
import { useCurrency } from "@/lib/currency";
import { getProblemDefs } from "@/lib/siteData";

/**
 * Three problems, three fixes. Replaces the old Problem + Payoff sections:
 * one card each, with a single example row from the mock data as the visual.
 */
export default function FixesSection() {
  const { p } = useCurrency();
  const defs = getProblemDefs(p);
  const pick = (num: string) => defs.find((d) => d.num === num)!;

  const cards = [
    { def: pick("01"), title: "Forgotten subscriptions", body: "Still paying for things you stopped using.", row: pick("01").rows[0], fix: "Lists every recurring charge it finds" },
    { def: pick("03"), title: "Surprise renewals", body: "Trials convert while you're not looking.", row: pick("03").rows[0], fix: "A reminder before each renewal" },
    { def: pick("02"), title: "No idea of the total", body: `${p("₹199", "$2.99")} here, ${p("₹649", "$15.49")} there…`, row: pick("02").rows[2], fix: "One monthly total + yearly projection" },
  ];

  return (
    <section style={{ maxWidth: 1200, margin: "0 auto", padding: "8px 32px 80px" }}>
      <div style={EYEBROW_STYLE}>Why people use it</div>
      <h2
        style={{
          fontFamily: FONT_SORA,
          fontSize: "clamp(28px, 3vw, 40px)",
          fontWeight: 700,
          letterSpacing: "-0.026em",
          margin: "14px 0 0",
          maxWidth: 620,
        }}
      >
        Small charges, easy to lose track of.
      </h2>

      <div className="fix-grid">
        {cards.map((c) => (
          <div key={c.title} className="fix-card">
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div className="fix-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d={c.def.iconPath} />
                </svg>
              </div>
              <h3 style={{ fontFamily: FONT_SORA, fontSize: 17, fontWeight: 600, letterSpacing: "-0.015em", margin: 0 }}>
                {c.title}
              </h3>
            </div>
            <p style={{ fontSize: 14.5, lineHeight: 1.55, color: "oklch(48% 0.012 80)", margin: "10px 0 0" }}>{c.body}</p>

            <div className="fix-row" style={{ background: c.row.bg, borderColor: c.row.border }}>
              <div
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 9,
                  background: c.row.tint,
                  color: c.row.fg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 12,
                  fontWeight: 700,
                  flexShrink: 0,
                }}
              >
                {c.row.badge}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "oklch(24% 0.01 80)" }}>{c.row.title}</div>
                <div style={{ fontSize: 11.5, color: "oklch(54% 0.01 80)" }}>{c.row.meta}</div>
              </div>
              <div style={{ fontFamily: FONT_SORA, fontSize: 13.5, fontWeight: 600, color: c.row.amountColor }}>
                {c.row.amount}
              </div>
            </div>

            <div className="fix-line">
              <span aria-hidden>→</span> {c.fix}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
