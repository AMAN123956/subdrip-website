"use client";

import HeroPhone from "@/components/phone/HeroPhone";
import JoinBetaButton from "@/components/signup/JoinBetaButton";
import { FONT_SORA } from "@/lib/brand";

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
            Android beta · open now
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
            Try it before everyone else.
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
            Free during beta. On iPhone? Join the waitlist and we&rsquo;ll email you the day it&rsquo;s ready.
          </p>
          <JoinBetaButton placement="band" variant="light" className="band-cta" style={{ marginTop: 26 }} />
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
