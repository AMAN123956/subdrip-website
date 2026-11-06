"use client";

import JoinBetaButton from "@/components/signup/JoinBetaButton";
import { EYEBROW_STYLE, FONT_SORA } from "@/lib/brand";
import { useCurrency } from "@/lib/currency";
import { getHowSteps } from "@/lib/siteData";

export default function HowItWorksContent() {
  const { p } = useCurrency();
  const steps = getHowSteps(p);

  return (
    <main style={{ maxWidth: 1080, margin: "0 auto", padding: "72px 32px 88px" }}>
      <div style={EYEBROW_STYLE}>How it works</div>
      <h1
        style={{
          fontFamily: FONT_SORA,
          fontSize: "clamp(34px, 4.2vw, 50px)",
          fontWeight: 700,
          letterSpacing: "-0.03em",
          margin: "14px 0 0",
          maxWidth: 720,
          textWrap: "balance",
        }}
      >
        From scattered billing signals to clear decisions.
      </h1>
      <p
        style={{
          fontSize: 18,
          lineHeight: 1.62,
          color: "oklch(48% 0.012 80)",
          margin: "18px 0 0",
          maxWidth: 620,
        }}
      >
        Three steps, and you keep control at every one of them. Nothing is imported without your review.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 20, marginTop: 48 }}>
        {steps.map((h) => (
          <div
            key={h.num}
            data-r="cols"
            style={{
              display: "grid",
              gridTemplateColumns: "90px 1fr 320px",
              gap: 32,
              alignItems: "center",
              background: "#fff",
              border: "1px solid oklch(92% 0.01 80)",
              borderRadius: 24,
              padding: 32,
            }}
          >
            <div
              style={{
                fontFamily: FONT_SORA,
                fontSize: 42,
                fontWeight: 700,
                color: "oklch(88% 0.05 175)",
                letterSpacing: "-0.02em",
              }}
            >
              {h.num}
            </div>
            <div>
              <div style={{ fontFamily: FONT_SORA, fontSize: 24, fontWeight: 600, letterSpacing: "-0.015em" }}>
                {h.title}
              </div>
              <p
                style={{
                  fontSize: 15.5,
                  lineHeight: 1.62,
                  color: "oklch(48% 0.012 80)",
                  margin: "10px 0 0",
                  maxWidth: 460,
                }}
              >
                {h.body}
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 9, marginTop: 16 }}>
                {h.points.map((pt) => (
                  <div key={pt} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <div
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: "oklch(60% 0.08 175)",
                        marginTop: 8,
                        flexShrink: 0,
                      }}
                    />
                    <div style={{ fontSize: 14.5, lineHeight: 1.55, color: "oklch(42% 0.012 80)" }}>{pt}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background: "oklch(97% 0.012 80)", borderRadius: 18, padding: 18 }}>
              <div
                style={{
                  fontSize: 11.5,
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: "oklch(52% 0.05 175)",
                }}
              >
                {h.panelLabel}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 14 }}>
                {h.rows.map((row, i) => (
                  <div
                    key={i}
                    style={{
                      background: "#fff",
                      borderRadius: 12,
                      padding: "11px 12px",
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <div
                      style={{
                        width: 26,
                        height: 26,
                        borderRadius: 8,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 11.5,
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
                      <div style={{ fontSize: 12.5, fontWeight: 600 }}>{row.title}</div>
                      <div style={{ fontSize: 11, color: "oklch(54% 0.01 80)" }}>{row.meta}</div>
                    </div>
                    <div style={{ fontSize: 11, fontWeight: 600, whiteSpace: "nowrap", color: row.tagColor }}>
                      {row.tag}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 40, display: "flex", justifyContent: "center" }}>
        <JoinBetaButton placement="how-it-works" label="Join the beta. It's free." />
      </div>
    </main>
  );
}
