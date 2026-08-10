"use client";

import Link from "next/link";
import { useState } from "react";
import { EYEBROW_STYLE, FONT_SORA } from "@/lib/brand";
import { useCurrency } from "@/lib/currency";
import { getHowSteps } from "@/lib/siteData";

export default function HowItWorksSection() {
  const { p, currency } = useCurrency();
  const [step, setStep] = useState(0);
  const steps = getHowSteps(p);
  const active = steps[step];

  return (
    <section style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px 88px" }}>
      <div style={{ borderTop: "1px solid oklch(89% 0.01 80)", paddingTop: 64 }}>
        <div style={EYEBROW_STYLE}>How it works</div>
        <h2
          style={{
            fontFamily: FONT_SORA,
            fontSize: "clamp(28px, 3vw, 40px)",
            fontWeight: 700,
            letterSpacing: "-0.026em",
            margin: "14px 0 0",
            maxWidth: 660,
            textWrap: "balance",
          }}
        >
          From scattered billing signals to clear decisions.
        </h2>
        <p style={{ fontSize: 16.5, lineHeight: 1.6, color: "oklch(48% 0.012 80)", margin: "12px 0 0", maxWidth: 560 }}>
          Three steps, and you stay in control at every one. Pick a step to see what the app shows you.
        </p>

        <div
          data-r="cols"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 400px",
            gap: 32,
            marginTop: 36,
            alignItems: "stretch",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {steps.map((st, i) => {
              const selected = step === i;
              return (
                <button
                  key={st.num}
                  data-r="stepcard"
                  onClick={() => setStep(i)}
                  style={{
                    textAlign: "left",
                    fontFamily: "var(--font-work-sans), sans-serif",
                    borderRadius: 20,
                    padding: "24px 26px",
                    cursor: "pointer",
                    display: "flex",
                    gap: 22,
                    alignItems: "flex-start",
                    transition: "all 0.22s ease",
                    background: "#fff",
                    border: `1.5px solid ${selected ? "oklch(65% 0.07 175)" : "oklch(92% 0.01 80)"}`,
                    boxShadow: selected ? "0 12px 30px oklch(40% 0.075 175 / 0.12)" : "none",
                  }}
                >
                  <div
                    style={{
                      fontFamily: FONT_SORA,
                      fontSize: 13,
                      fontWeight: 700,
                      letterSpacing: "0.04em",
                      paddingTop: 5,
                      color: selected ? "oklch(45% 0.09 175)" : "oklch(70% 0.03 175)",
                    }}
                  >
                    {st.num}
                  </div>
                  <div>
                    <div style={{ fontFamily: FONT_SORA, fontSize: 19.5, fontWeight: 600, color: "oklch(22% 0.01 80)" }}>
                      {st.title}
                    </div>
                    <div
                      data-r="stepbody"
                      style={{
                        fontSize: 14.5,
                        lineHeight: 1.6,
                        marginTop: 7,
                        color: selected ? "oklch(45% 0.012 80)" : "oklch(58% 0.012 80)",
                      }}
                    >
                      {st.body}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12, height: "100%" }}>
            <div
              data-r="deskonly"
              style={{ flex: 1, background: "#fff", border: "1px solid oklch(92% 0.01 80)", borderRadius: 22, padding: 26 }}
            >
              <div key={`step${step}${currency}`} style={{ animation: "softIn 0.3s ease" }}>
                <div
                  style={{
                    fontSize: 11.5,
                    fontWeight: 600,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color: "oklch(48% 0.07 175)",
                  }}
                >
                  {active.panelLabel}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 18 }}>
                  {active.rows.map((row, i) => (
                    <div
                      key={i}
                      style={{
                        background: "oklch(97% 0.012 80)",
                        borderRadius: 14,
                        padding: "13px 14px",
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                      }}
                    >
                      <div
                        style={{
                          width: 30,
                          height: 30,
                          borderRadius: 9,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 12.5,
                          fontWeight: 700,
                          fontFamily: FONT_SORA,
                          flexShrink: 0,
                          background: row.tint,
                          color: row.fg,
                        }}
                      >
                        {row.badge}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 13, fontWeight: 600, color: "oklch(22% 0.01 80)" }}>{row.title}</div>
                        <div style={{ fontSize: 11.5, color: "oklch(52% 0.01 80)", marginTop: 2 }}>{row.meta}</div>
                      </div>
                      <div style={{ fontSize: 11.5, fontWeight: 600, whiteSpace: "nowrap", color: row.tagColor }}>
                        {row.tag}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <Link
              href="/demo"
              className="hov-teal-dark-lift"
              style={{
                width: "100%",
                textAlign: "left",
                fontFamily: "var(--font-work-sans), sans-serif",
                background: "oklch(40% 0.075 175)",
                border: "none",
                borderRadius: 22,
                padding: "24px 26px",
                cursor: "pointer",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                gap: 16,
                transition: "transform 0.14s ease, background 0.2s ease",
                textDecoration: "none",
              }}
            >
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontSize: 11.5,
                    fontWeight: 700,
                    letterSpacing: "0.09em",
                    textTransform: "uppercase",
                    color: "oklch(86% 0.06 175)",
                  }}
                >
                  Live demo
                </div>
                <div style={{ fontFamily: FONT_SORA, fontSize: 17, fontWeight: 600, marginTop: 7, lineHeight: 1.35 }}>
                  Walk these three steps yourself.
                </div>
                <div style={{ fontSize: 13.5, color: "oklch(90% 0.03 175)", marginTop: 5, lineHeight: 1.45 }}>
                  The real app, sample data, no sign-up.
                </div>
              </div>
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: "50%",
                  background: "#fff",
                  color: "oklch(35% 0.075 175)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 16,
                  fontWeight: 700,
                  flexShrink: 0,
                }}
              >
                →
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
