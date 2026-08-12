"use client";

import HeroPhone from "@/components/phone/HeroPhone";
import WaitlistForm from "@/components/WaitlistForm";
import { FONT_SORA } from "@/lib/brand";
import { TRUST_FACTS } from "@/lib/siteData";

export default function BetaBand() {
  return (
    <section style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px 72px" }}>
      <div
        data-r="band betaband"
        style={{
          background: "oklch(40% 0.075 175)",
          borderRadius: 28,
          padding: 48,
          color: "#fff",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(300px, 100%), 1fr))",
          gap: 48,
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -220,
            right: 60,
            width: 560,
            height: 560,
            borderRadius: "50%",
            background: "radial-gradient(circle, oklch(58% 0.09 168 / 0.32), transparent 68%)",
          }}
        />

        <div style={{ position: "relative" }}>
          <div
            style={{
              fontSize: 12.5,
              fontWeight: 600,
              letterSpacing: "0.09em",
              textTransform: "uppercase",
              color: "oklch(85% 0.06 175)",
            }}
          >
            Private beta
          </div>
          <h2
            style={{
              fontFamily: FONT_SORA,
              fontSize: "clamp(28px, 3vw, 38px)",
              fontWeight: 700,
              letterSpacing: "-0.028em",
              lineHeight: 1.1,
              margin: "12px 0 0",
              maxWidth: 420,
              textWrap: "balance",
            }}
          >
            Get your invite the day it lands.
          </h2>
          <p
            style={{
              fontSize: 16,
              lineHeight: 1.6,
              color: "oklch(92% 0.03 175)",
              margin: "12px 0 0",
              maxWidth: 400,
            }}
          >
            Android and iOS at launch. One email, nothing else.
          </p>

          <div style={{ maxWidth: 440 }}>
            <WaitlistForm tone="dark" />
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px 20px",
              marginTop: 24,
              paddingTop: 20,
              borderTop: "1px solid oklch(52% 0.06 175)",
            }}
          >
            {TRUST_FACTS.map((t) => (
              <div key={t.label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div
                  style={{
                    width: 16,
                    height: 16,
                    borderRadius: "50%",
                    background: "oklch(52% 0.07 175)",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 9,
                    fontWeight: 700,
                  }}
                >
                  ✓
                </div>
                <span style={{ fontSize: 13.5, color: "oklch(92% 0.03 175)" }}>{t.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div data-r="betaphonewrap" style={{ position: "relative", justifySelf: "center" }}>
          <div
            data-r="betaphone"
            style={{
              width: 300,
              height: 330,
              overflow: "hidden",
              borderRadius: "40px 40px 0 0",
              filter: "drop-shadow(0 30px 54px oklch(16% 0.04 175 / 0.45))",
            }}
          >
            <HeroPhone variant="dashboard" />
          </div>
        </div>
      </div>
    </section>
  );
}
