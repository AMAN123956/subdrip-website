"use client";

import { useEffect, useState } from "react";
import HeroPhone, { type HeroPhoneVariant } from "@/components/phone/HeroPhone";
import WaitlistForm from "@/components/WaitlistForm";
import { BRAND, EYEBROW_STYLE, FONT_SORA } from "@/lib/brand";
import { useCurrency } from "@/lib/currency";
import { getHeroPills, HERO_SCREEN_ORDER, TRUST_FACTS } from "@/lib/siteData";

export default function HeroSection() {
  const { p, currency } = useCurrency();
  const [heroStep, setHeroStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroStep((s) => (s + 1) % HERO_SCREEN_ORDER.length);
    }, 1800);
    return () => clearInterval(timer);
  }, []);

  const heroScreen = HERO_SCREEN_ORDER[heroStep] as HeroPhoneVariant;
  const heroKey = `hero${heroStep}${currency}`;
  const pills = getHeroPills(p);

  return (
    <section
      data-r="hero"
      style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "88px 32px 72px",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: 56,
        alignItems: "center",
        justifyItems: "center",
      }}
    >
      <div style={{ animation: "fadeUp 0.5s ease", minWidth: 0, width: "100%", justifySelf: "start" }}>
        <div style={EYEBROW_STYLE}>{BRAND.availability}</div>
        <h1
          style={{
            fontFamily: FONT_SORA,
            fontSize: "clamp(40px, 4.6vw, 62px)",
            lineHeight: 1.04,
            fontWeight: 700,
            letterSpacing: "-0.03em",
            margin: "22px 0 0",
            color: "oklch(20% 0.01 80)",
            textWrap: "balance",
          }}
        >
          {BRAND.tagline}
        </h1>
        <p
          style={{
            fontSize: 19,
            lineHeight: 1.6,
            color: "oklch(48% 0.012 80)",
            margin: "24px 0 0",
            maxWidth: 510,
            textWrap: "pretty",
          }}
        >
          {BRAND.description}
        </p>

        <div data-r="mobonly" style={{ margin: "26px -16px 0", position: "relative", overflow: "hidden" }}>
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(120% 70% at 50% 100%, oklch(92% 0.05 175 / 0.75), transparent 70%)",
            }}
          />
          <div style={{ position: "relative", display: "flex", justifyContent: "center" }}>
            <div
              key={heroKey}
              style={{
                zoom: 0.92,
                width: 300,
                height: 280,
                overflow: "hidden",
                borderRadius: "38px 38px 0 0",
                filter: "drop-shadow(0 18px 34px oklch(30% 0.02 80 / 0.22))",
                animation: "softIn 0.35s ease",
              }}
            >
              <HeroPhone variant={heroScreen} />
            </div>
          </div>
        </div>

        <div data-r="waitlist">
          <WaitlistForm />
        </div>

        <div data-r="mobrow" style={{ flexWrap: "wrap", gap: 8, marginTop: 22 }}>
          {TRUST_FACTS.map((t) => (
            <div
              key={t.label}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 7,
                background: "#fff",
                border: "1px solid oklch(91% 0.014 80)",
                borderRadius: 100,
                padding: "7px 13px 7px 9px",
              }}
            >
              <div
                style={{
                  width: 15,
                  height: 15,
                  borderRadius: "50%",
                  background: "oklch(40% 0.075 175)",
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
              <span style={{ fontSize: 12.5, fontWeight: 600, color: "oklch(32% 0.012 80)", whiteSpace: "nowrap" }}>
                {t.value}
              </span>
            </div>
          ))}
        </div>

        <div
          data-r="deskonly"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 34,
            marginTop: 44,
            paddingTop: 26,
            borderTop: "1px solid oklch(89% 0.01 80)",
          }}
        >
          {TRUST_FACTS.map((t) => (
            <div key={t.label}>
              <div style={{ fontSize: 13, color: "oklch(55% 0.012 80)" }}>{t.label}</div>
              <div style={{ fontFamily: FONT_SORA, fontSize: 15, fontWeight: 600, marginTop: 4, color: "oklch(25% 0.01 80)" }}>
                {t.value}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        data-r="herophone"
        style={{ display: "flex", justifyContent: "center", position: "relative", width: "100%", minWidth: 0 }}
      >
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
          <div
            style={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              width: "100%",
              maxWidth: 400,
              aspectRatio: "1",
              borderRadius: "50%",
              background: "radial-gradient(circle, oklch(90% 0.05 175 / 0.6), transparent 68%)",
              top: 60,
            }}
          />
        </div>
        <div
          style={{
            position: "relative",
            filter: "drop-shadow(0 30px 60px oklch(30% 0.02 80 / 0.2))",
            animation: "fadeUp 0.6s ease",
          }}
        >
          <div key={heroKey} style={{ animation: "softIn 0.35s ease" }}>
            <HeroPhone variant={heroScreen} />
          </div>
        </div>

        {pills.map((pill) => (
          <div
            key={pill.title + pill.delay}
            data-r="pill"
            style={{
              position: "absolute",
              zIndex: 2,
              display: "flex",
              alignItems: "center",
              gap: 10,
              background: "#fff",
              border: "1px solid oklch(91% 0.014 80)",
              borderRadius: 100,
              padding: "9px 15px 9px 10px",
              boxShadow: "0 10px 26px oklch(30% 0.02 80 / 0.12)",
              whiteSpace: "nowrap",
              opacity: 0,
              top: pill.top,
              left: pill.left,
              right: pill.right,
              animation: "pillFloat 9s ease-in-out infinite",
              animationDelay: pill.delay,
            }}
          >
            <div
              style={{
                width: 24,
                height: 24,
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                background: pill.tint,
                color: pill.fg,
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
                <path d={pill.iconPath} />
              </svg>
            </div>
            <div>
              <div style={{ fontSize: 12.5, fontWeight: 600, color: "oklch(24% 0.01 80)", lineHeight: 1.2 }}>{pill.title}</div>
              <div style={{ fontSize: 11, color: "oklch(52% 0.012 80)", marginTop: 1 }}>{pill.meta}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
