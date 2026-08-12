"use client";

import { useState } from "react";
import { EYEBROW_STYLE, FONT_SORA } from "@/lib/brand";
import { useCurrency } from "@/lib/currency";
import { getProblemDefs } from "@/lib/siteData";

const teal = "oklch(40% 0.075 175)";

export default function ProblemSection() {
  const { p, currency } = useCurrency();
  const [problem, setProblem] = useState(0);
  const problems = getProblemDefs(p);
  const active = problems[problem];

  return (
    <section style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 32px 88px" }}>
      <div style={{ borderTop: "1px solid oklch(89% 0.01 80)", paddingTop: 64 }}>
        <div style={EYEBROW_STYLE}>The problem</div>
        <h2
          style={{
            fontFamily: FONT_SORA,
            fontSize: "clamp(28px, 3vw, 40px)",
            fontWeight: 700,
            letterSpacing: "-0.026em",
            margin: "14px 0 0",
            maxWidth: 620,
            textWrap: "balance",
          }}
        >
          Recurring spending is easy to lose track of.
        </h2>
        <p style={{ fontSize: 16.5, lineHeight: 1.6, color: "oklch(48% 0.012 80)", margin: "12px 0 0", maxWidth: 560 }}>
          Four small problems that quietly add up to one large number at the end of the year.
        </p>

        <div
          data-r="probgrid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(320px, 100%), 1fr))",
            gap: 48,
            marginTop: 36,
            alignItems: "stretch",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", minWidth: 0, width: "100%" }}>
            {problems.map((pr, i) => {
              const selected = problem === i;
              return (
                <button
                  key={pr.num}
                  data-r="probcard"
                  onClick={() => setProblem(i)}
                  className="hov-border-teal-strong"
                  style={{
                    textAlign: "left",
                    fontFamily: "var(--font-work-sans), sans-serif",
                    border: `1px solid ${selected ? "oklch(70% 0.06 175)" : "oklch(88% 0.014 80)"}`,
                    background: selected ? "#fff" : "oklch(98% 0.008 80)",
                    borderRadius: 18,
                    padding: "20px 22px",
                    marginBottom: 12,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    transition: "all 0.2s ease",
                    boxShadow: selected
                      ? "0 12px 28px oklch(40% 0.075 175 / 0.12)"
                      : "0 1px 2px oklch(30% 0.02 80 / 0.04)",
                  }}
                >
                  <div
                    data-r="probicon"
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 13,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      transition: "all 0.2s ease",
                      background: selected ? teal : "oklch(93% 0.016 80)",
                      color: selected ? "#fff" : "oklch(50% 0.012 80)",
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                      <path d={pr.iconPath} />
                    </svg>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      data-r="probtitle"
                      style={{
                        fontFamily: FONT_SORA,
                        fontSize: 16.5,
                        fontWeight: 600,
                        color: selected ? "oklch(20% 0.01 80)" : "oklch(26% 0.012 80)",
                        transition: "color 0.2s ease",
                      }}
                    >
                      {pr.title}
                    </div>
                    <p
                      style={{
                        fontSize: 14,
                        lineHeight: 1.5,
                        color: selected ? "oklch(42% 0.012 80)" : "oklch(46% 0.012 80)",
                        margin: "4px 0 0",
                        transition: "color 0.2s ease",
                      }}
                    >
                      {pr.body}
                    </p>
                    <div
                      data-r="mobflex"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 7,
                        marginTop: 11,
                        background: "oklch(96% 0.022 175)",
                        borderRadius: 100,
                        padding: "7px 13px 7px 10px",
                      }}
                    >
                      <div
                        style={{
                          width: 15,
                          height: 15,
                          borderRadius: "50%",
                          background: teal,
                          color: "#fff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 8.5,
                          fontWeight: 700,
                          flexShrink: 0,
                        }}
                      >
                        ✓
                      </div>
                      <div style={{ fontSize: 12.5, fontWeight: 600, lineHeight: 1.35, color: "oklch(34% 0.06 175)" }}>
                        {pr.fixShort}
                      </div>
                    </div>
                  </div>
                  <div
                    data-r="deskonly"
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 12,
                      fontWeight: 700,
                      flexShrink: 0,
                      transition: "all 0.2s ease",
                      background: selected ? "oklch(94% 0.03 175)" : "transparent",
                      color: selected ? teal : "oklch(78% 0.012 80)",
                    }}
                  >
                    →
                  </div>
                </button>
              );
            })}
          </div>

          <div data-r="deskonly" style={{ justifySelf: "stretch", width: "100%", display: "flex" }}>
            <div
              style={{
                position: "relative",
                flex: 1,
                background: "#fff",
                border: "1px solid oklch(92% 0.01 80)",
                borderRadius: 26,
                padding: "26px 30px",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: 18,
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: -130,
                  right: -60,
                  width: 340,
                  height: 340,
                  borderRadius: "50%",
                  background: "radial-gradient(circle, oklch(93% 0.04 175 / 0.85), transparent 68%)",
                }}
              />

              <div key={`prob${problem}${currency}`} style={{ position: "relative", animation: "fadeUp 0.32s ease" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    paddingBottom: 18,
                    borderBottom: "1px solid oklch(94% 0.01 80)",
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                      width: 44,
                      height: 44,
                      flexShrink: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        borderRadius: "50%",
                        border: "1.5px solid oklch(88% 0.05 175)",
                        animation: "pulseRing 3s ease-in-out infinite",
                      }}
                    />
                    <div
                      style={{
                        position: "relative",
                        width: 32,
                        height: 32,
                        borderRadius: 11,
                        background: "oklch(94% 0.03 175)",
                        color: "oklch(38% 0.075 175)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                        <path d={active.iconPath} />
                      </svg>
                    </div>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontSize: 11.5,
                        fontWeight: 700,
                        letterSpacing: "0.09em",
                        textTransform: "uppercase",
                        color: "oklch(52% 0.06 175)",
                      }}
                    >
                      {active.visualLabel}
                    </div>
                    <div style={{ fontFamily: FONT_SORA, fontSize: 16, fontWeight: 600, marginTop: 4 }}>{active.title}</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 24 }}>
                    {[
                      { h: "40%", bg: "oklch(84% 0.05 175)", d: "0s" },
                      { h: "70%", bg: "oklch(70% 0.07 175)", d: "0.2s" },
                      { h: "100%", bg: "oklch(45% 0.085 175)", d: "0.4s" },
                    ].map((b, i) => (
                      <div
                        key={i}
                        style={{
                          width: 4,
                          height: b.h,
                          borderRadius: 2,
                          background: b.bg,
                          transformOrigin: "bottom",
                          animation: "growBar 1.4s ease-in-out infinite alternate",
                          animationDelay: b.d,
                        }}
                      />
                    ))}
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 18 }}>
                  {active.rows.map((r, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 13,
                        background: r.bg,
                        border: `1.5px solid ${r.border}`,
                        borderRadius: 16,
                        padding: "14px 16px",
                        opacity: Number(r.opacity),
                        animation: "fadeUp 0.45s ease backwards",
                        animationDelay: r.delay,
                      }}
                    >
                      <div
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: 10,
                          background: r.tint,
                          color: r.fg,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontFamily: FONT_SORA,
                          fontSize: 13,
                          fontWeight: 700,
                          flexShrink: 0,
                        }}
                      >
                        {r.badge}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 14, fontWeight: 600, color: "oklch(24% 0.01 80)" }}>{r.title}</div>
                        <div style={{ fontSize: 12, color: "oklch(54% 0.012 80)", marginTop: 2 }}>{r.meta}</div>
                      </div>
                      <div
                        style={{
                          fontFamily: FONT_SORA,
                          fontSize: 13.5,
                          fontWeight: 700,
                          color: r.amountColor,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {r.amount}
                      </div>
                    </div>
                  ))}
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: 12,
                    alignItems: "flex-start",
                    marginTop: 22,
                    paddingTop: 18,
                    borderTop: "1px solid oklch(94% 0.01 80)",
                  }}
                >
                  <div
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: "50%",
                      background: "oklch(94% 0.03 175)",
                      color: "oklch(38% 0.075 175)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 11,
                      fontWeight: 700,
                      flexShrink: 0,
                      marginTop: 1,
                    }}
                  >
                    ✓
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: "oklch(52% 0.06 175)",
                      }}
                    >
                      What the app does
                    </div>
                    <div style={{ fontSize: 14.5, lineHeight: 1.55, color: "oklch(32% 0.02 175)", marginTop: 4 }}>
                      {active.fix}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
