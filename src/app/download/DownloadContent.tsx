"use client";

import Link from "next/link";
import Logo from "@/components/Logo";
import HeroPhone, { type HeroPhoneVariant } from "@/components/phone/HeroPhone";
import WaitlistForm from "@/components/WaitlistForm";
import { BRAND, FONT_SORA, STORE_BUTTONS } from "@/lib/brand";

const teal = "oklch(40% 0.075 175)";
const SHOTS: HeroPhoneVariant[] = ["dashboard", "renewals", "savings"];

export default function DownloadContent() {
  return (
    <main
      style={{ maxWidth: 1000, margin: "0 auto", padding: "72px 32px 88px", textAlign: "center" }}
    >
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Logo size={64} />
      </div>
      <h1
        style={{
          fontFamily: FONT_SORA,
          fontSize: "clamp(32px, 4vw, 46px)",
          fontWeight: 700,
          letterSpacing: "-0.03em",
          margin: "26px auto 0",
          maxWidth: 620,
          textWrap: "balance",
        }}
      >
        Get {BRAND.name} first.
      </h1>
      <p
        style={{
          fontSize: 17.5,
          lineHeight: 1.62,
          color: "oklch(48% 0.012 80)",
          margin: "16px auto 0",
          maxWidth: 520,
        }}
      >
        The app is in private beta on iOS and Android. Join the list and we&rsquo;ll send your invite the day it opens.
      </p>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <WaitlistForm align="center" />
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12, marginTop: 34 }}>
        {STORE_BUTTONS.map((sb) => (
          <div
            key={sb.big}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 13,
              borderRadius: 14,
              padding: "13px 22px",
              background: "oklch(96% 0.008 80)",
              border: "1.5px dashed oklch(85% 0.01 80)",
              color: "oklch(52% 0.012 80)",
            }}
          >
            <div style={{ fontSize: 19 }}>{sb.glyph}</div>
            <div style={{ textAlign: "left" }}>
              <div style={{ fontSize: 11 }}>{sb.small}</div>
              <div style={{ fontFamily: FONT_SORA, fontSize: 15, fontWeight: 600 }}>{sb.big}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ fontSize: 13.5, color: "oklch(55% 0.012 80)", marginTop: 14 }}>{BRAND.platformsNote}</div>

      <div style={{ display: "flex", justifyContent: "center", gap: 24, marginTop: 56, flexWrap: "wrap" }}>
        {SHOTS.map((variant) => (
          <div
            key={variant}
            style={{
              filter: "drop-shadow(0 20px 44px oklch(30% 0.02 80 / 0.14))",
              transform: "scale(0.85)",
              transformOrigin: "top center",
            }}
          >
            <HeroPhone variant={variant} />
          </div>
        ))}
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: 28, marginTop: 40, fontSize: 14.5 }}>
        <Link href="/privacy" style={{ color: teal, fontWeight: 600, cursor: "pointer" }}>
          Privacy &amp; security
        </Link>
        <Link href="/support" style={{ color: teal, fontWeight: 600, cursor: "pointer" }}>
          Get support
        </Link>
      </div>
    </main>
  );
}
