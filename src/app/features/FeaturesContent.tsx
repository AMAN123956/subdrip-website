"use client";

import HeroPhone, { type HeroPhoneVariant } from "@/components/phone/HeroPhone";
import { FONT_SORA } from "@/lib/brand";
import { FEATURE_DETAIL } from "@/lib/siteData";

export default function FeaturesContent() {
  return (
    <main style={{ maxWidth: 1200, margin: "0 auto", padding: "72px 32px 88px" }}>
      <h1
        style={{
          fontFamily: FONT_SORA,
          fontSize: "clamp(34px, 4.2vw, 50px)",
          fontWeight: 700,
          letterSpacing: "-0.03em",
          margin: 0,
          maxWidth: 700,
          textWrap: "balance",
        }}
      >
        See the features that turn recurring charges into a clearer plan.
      </h1>
      <p
        style={{
          fontSize: 18,
          lineHeight: 1.62,
          color: "oklch(48% 0.012 80)",
          margin: "18px 0 0",
          maxWidth: 600,
        }}
      >
        Organised by the problem it solves, not by the module it lives in.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 24, marginTop: 48 }}>
        {FEATURE_DETAIL.map((f, i) => {
          const textFirst = i % 2 === 0;
          return (
            <div
              key={f.kicker}
              data-r="band cols"
              style={{
                background: "#fff",
                border: "1px solid oklch(92% 0.01 80)",
                borderRadius: 26,
                padding: 40,
                display: "grid",
                gridTemplateColumns: textFirst ? "1fr 380px" : "380px 1fr",
                gap: 48,
                alignItems: "center",
              }}
            >
              <div style={{ order: textFirst ? 1 : 2 }}>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 9,
                    background: f.tint,
                    color: f.fg,
                    fontSize: 12.5,
                    fontWeight: 600,
                    letterSpacing: "0.03em",
                    padding: "7px 13px",
                    borderRadius: 100,
                    textTransform: "uppercase",
                  }}
                >
                  {f.kicker}
                </div>
                <h2
                  style={{
                    fontFamily: FONT_SORA,
                    fontSize: 30,
                    fontWeight: 700,
                    letterSpacing: "-0.022em",
                    margin: "18px 0 0",
                    maxWidth: 460,
                    textWrap: "balance",
                  }}
                >
                  {f.title}
                </h2>
                <p
                  style={{
                    fontSize: 16,
                    lineHeight: 1.62,
                    color: "oklch(48% 0.012 80)",
                    margin: "12px 0 0",
                    maxWidth: 470,
                    textWrap: "pretty",
                  }}
                >
                  {f.body}
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 11, marginTop: 20 }}>
                  {f.points.map((pt) => (
                    <div key={pt} style={{ display: "flex", gap: 11, alignItems: "flex-start" }}>
                      <div
                        style={{
                          width: 19,
                          height: 19,
                          borderRadius: "50%",
                          background: "oklch(94% 0.03 175)",
                          color: "oklch(38% 0.075 175)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 10.5,
                          fontWeight: 700,
                          flexShrink: 0,
                          marginTop: 3,
                        }}
                      >
                        ✓
                      </div>
                      <div style={{ fontSize: 14.5, color: "oklch(40% 0.012 80)", lineHeight: 1.55 }}>{pt}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ order: textFirst ? 2 : 1, display: "flex", justifyContent: "center" }}>
                <div
                  style={{
                    filter: "drop-shadow(0 20px 44px oklch(30% 0.02 80 / 0.14))",
                    transform: "scale(0.92)",
                  }}
                >
                  <HeroPhone variant={f.variant as HeroPhoneVariant} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
