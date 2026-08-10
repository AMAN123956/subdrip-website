"use client";

import Link from "next/link";
import { EYEBROW_STYLE, FONT_SORA } from "@/lib/brand";
import { FEATURES_GRID } from "@/lib/siteData";

export default function FeaturesSection() {
  return (
    <section style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px 88px" }}>
      <div
        style={{
          borderTop: "1px solid oklch(89% 0.01 80)",
          paddingTop: 64,
          display: "flex",
          flexWrap: "wrap",
          alignItems: "flex-end",
          justifyContent: "space-between",
          gap: 16,
        }}
      >
        <div style={{ maxWidth: 620 }}>
          <div style={EYEBROW_STYLE}>What&rsquo;s inside</div>
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
            Everything you need to see recurring spend clearly.
          </h2>
        </div>
        <Link
          href="/features"
          className="hov-border-teal"
          style={{
            border: "1.5px solid oklch(85% 0.01 80)",
            background: "#fff",
            color: "oklch(28% 0.01 80)",
            fontFamily: "var(--font-work-sans), sans-serif",
            fontSize: 14.5,
            fontWeight: 600,
            padding: "12px 20px",
            borderRadius: 12,
            cursor: "pointer",
            whiteSpace: "nowrap",
            textDecoration: "none",
          }}
        >
          All features
        </Link>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
          gap: 16,
          marginTop: 32,
        }}
      >
        {FEATURES_GRID.map((f) => (
          <div
            key={f.title}
            className="hov-card"
            style={{
              background: "#fff",
              border: "1px solid oklch(92% 0.01 80)",
              borderRadius: 20,
              padding: 26,
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}
          >
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 11,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 16,
                background: f.tint,
                color: f.fg,
              }}
            >
              {f.icon}
            </div>
            <div style={{ fontFamily: FONT_SORA, fontSize: 17.5, fontWeight: 600, marginTop: 16 }}>{f.title}</div>
            <p style={{ fontSize: 14.5, lineHeight: 1.6, color: "oklch(50% 0.012 80)", margin: "9px 0 0" }}>{f.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
