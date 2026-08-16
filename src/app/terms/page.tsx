import type { Metadata } from "next";
import { EYEBROW_STYLE, FONT_SORA } from "@/lib/brand";
import { TERMS_EFFECTIVE, TERMS_SECTIONS } from "@/lib/siteData";

export const metadata: Metadata = {
  title: "Terms of service",
  description:
    "The agreement for using SubDrip: what the service is, what it is not, how connected sources work, and the rules both sides follow.",
};

export default function TermsPage() {
  return (
    <main style={{ maxWidth: 820, margin: "0 auto", padding: "72px 32px 88px" }}>
      <div style={EYEBROW_STYLE}>Terms of service</div>
      <h1
        style={{
          fontFamily: FONT_SORA,
          fontSize: "clamp(32px, 4vw, 46px)",
          fontWeight: 700,
          letterSpacing: "-0.03em",
          margin: "14px 0 0",
          textWrap: "balance",
        }}
      >
        The agreement, in plain language.
      </h1>
      <p
        style={{
          fontSize: 18,
          lineHeight: 1.65,
          color: "oklch(48% 0.012 80)",
          margin: "18px 0 0",
          maxWidth: 600,
        }}
      >
        What SubDrip is, what it is not, and the rules both sides follow. Effective {TERMS_EFFECTIVE}.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 36 }}>
        {TERMS_SECTIONS.map((s, idx) => (
          <section
            key={s.id}
            style={{ background: "#fff", border: "1px solid oklch(92% 0.01 80)", borderRadius: 22, padding: 28 }}
          >
            <h2
              style={{
                fontFamily: FONT_SORA,
                fontSize: 18,
                fontWeight: 600,
                margin: 0,
                display: "flex",
                gap: 12,
                alignItems: "baseline",
              }}
            >
              <span
                style={{
                  fontSize: 12.5,
                  fontWeight: 700,
                  color: "oklch(52% 0.06 175)",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {String(idx + 1).padStart(2, "0")}
              </span>
              {s.title}
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 9, marginTop: 14 }}>
              {s.items.map((i) => (
                <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
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
                  <div style={{ fontSize: 14.5, lineHeight: 1.55, color: "oklch(43% 0.012 80)" }}>{i}</div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
