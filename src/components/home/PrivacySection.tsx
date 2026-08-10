"use client";

import { EYEBROW_STYLE, FONT_SORA } from "@/lib/brand";
import { PRIVACY_FLOW, PRIVACY_PRACTICES } from "@/lib/siteData";

export default function PrivacySection() {
  return (
    <section style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px 88px" }}>
      <div
        style={{
          borderTop: "1px solid oklch(89% 0.01 80)",
          paddingTop: 64,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: 56,
          alignItems: "center",
        }}
      >
        <div>
          <div style={EYEBROW_STYLE}>Privacy &amp; security</div>
          <h2
            style={{
              fontFamily: FONT_SORA,
              fontSize: "clamp(28px, 3vw, 40px)",
              fontWeight: 700,
              letterSpacing: "-0.026em",
              margin: "14px 0 0",
              maxWidth: 440,
              textWrap: "balance",
            }}
          >
            You stay in control of your data.
          </h2>
          <p
            style={{
              fontSize: 16.5,
              lineHeight: 1.62,
              color: "oklch(48% 0.012 80)",
              margin: "12px 0 0",
              maxWidth: 460,
            }}
          >
            Connecting a source is where people hesitate. These are the rules the app is built on.
          </p>

          <div style={{ display: "flex", flexDirection: "column", marginTop: 28 }}>
            {PRIVACY_PRACTICES.map((pr) => (
              <div
                key={pr.title}
                style={{ display: "flex", gap: 16, padding: "20px 0", borderTop: "1px solid oklch(91% 0.01 80)" }}
              >
                <div
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: "50%",
                    background: "oklch(94% 0.03 175)",
                    color: "oklch(38% 0.075 175)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 12,
                    fontWeight: 700,
                    flexShrink: 0,
                    marginTop: 1,
                  }}
                >
                  ✓
                </div>
                <div>
                  <div style={{ fontFamily: FONT_SORA, fontSize: 16.5, fontWeight: 600 }}>{pr.title}</div>
                  <div style={{ fontSize: 14.5, lineHeight: 1.55, color: "oklch(50% 0.012 80)", marginTop: 5 }}>
                    {pr.body}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ justifySelf: "stretch", width: "100%" }}>
          <div
            style={{
              position: "relative",
              background: "#fff",
              border: "1px solid oklch(92% 0.01 80)",
              borderRadius: 28,
              padding: "30px 32px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: -140,
                left: "50%",
                transform: "translateX(-50%)",
                width: 420,
                height: 420,
                borderRadius: "50%",
                background: "radial-gradient(circle, oklch(93% 0.05 175 / 0.9), transparent 68%)",
              }}
            />

            <div style={{ position: "relative" }}>
              <div
                style={{
                  fontSize: 11.5,
                  fontWeight: 700,
                  letterSpacing: "0.09em",
                  textTransform: "uppercase",
                  color: "oklch(48% 0.07 175)",
                }}
              >
                What happens when you connect
              </div>

              <div
                data-r="connecthead"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 18,
                  marginTop: 18,
                  paddingBottom: 20,
                  borderBottom: "1px solid oklch(94% 0.01 80)",
                }}
              >
                <div
                  data-r="connectring"
                  style={{
                    position: "relative",
                    width: 84,
                    height: 84,
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
                      border: "1.5px solid oklch(86% 0.05 175)",
                      animation: "pulseRing 3.2s ease-in-out infinite",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 14,
                      borderRadius: "50%",
                      border: "1.5px solid oklch(80% 0.06 175)",
                      animation: "pulseRing 3.2s ease-in-out infinite",
                      animationDelay: "0.5s",
                    }}
                  />
                  <div
                    style={{
                      position: "relative",
                      width: 52,
                      height: 52,
                      borderRadius: 18,
                      background: "oklch(40% 0.075 175)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 10px 22px oklch(40% 0.075 175 / 0.3)",
                    }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 3 4.5 6.2v5.1c0 4.5 3.1 8.6 7.5 9.7 4.4-1.1 7.5-5.2 7.5-9.7V6.2Z" />
                      <path d="m9 12 2.2 2.2L15.5 10" />
                    </svg>
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      inset: -2,
                      borderRadius: "50%",
                      borderTop: "2px solid oklch(62% 0.09 175)",
                      borderRight: "2px solid transparent",
                      borderBottom: "2px solid transparent",
                      borderLeft: "2px solid transparent",
                      animation: "scanSpin 4.5s linear infinite",
                    }}
                  />
                </div>
                <div>
                  <div style={{ fontFamily: FONT_SORA, fontSize: 16.5, fontWeight: 600 }}>
                    Read-only from the first second
                  </div>
                  <div style={{ fontSize: 13.5, lineHeight: 1.5, color: "oklch(50% 0.012 80)", marginTop: 4 }}>
                    The scan looks for billing signals and nothing else.
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 22 }}>
                {PRIVACY_FLOW.map((f) => (
                  <div
                    key={f.badge}
                    data-r="flowrow"
                    style={{
                      background: f.bg,
                      border: `1.5px solid ${f.border}`,
                      borderRadius: 18,
                      padding: "16px 18px",
                      display: "flex",
                      alignItems: "center",
                      gap: 14,
                      animation: "fadeUp 0.5s ease backwards",
                      animationDelay: f.delay,
                    }}
                  >
                    <div
                      style={{
                        width: 34,
                        height: 34,
                        borderRadius: 11,
                        background: f.tint,
                        color: f.fg,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontFamily: FONT_SORA,
                        fontSize: 14,
                        fontWeight: 700,
                        flexShrink: 0,
                      }}
                    >
                      {f.badge}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 14.5, fontWeight: 600, color: "oklch(24% 0.01 80)" }}>{f.title}</div>
                      <div style={{ fontSize: 12.5, color: "oklch(52% 0.012 80)", marginTop: 2 }}>{f.meta}</div>
                    </div>
                    <div
                      data-r="flowtag"
                      style={{ fontSize: 11.5, fontWeight: 700, color: f.tagColor, whiteSpace: "nowrap" }}
                    >
                      {f.tag}
                    </div>
                  </div>
                ))}
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginTop: 20,
                  paddingTop: 18,
                  borderTop: "1px solid oklch(94% 0.01 80)",
                }}
              >
                <div style={{ position: "relative", width: 34, height: 34, flexShrink: 0 }}>
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      borderRadius: "50%",
                      background: "oklch(60% 0.1 175 / 0.25)",
                      animation: "pulseRing 2.6s ease-in-out infinite",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 7,
                      borderRadius: "50%",
                      background: "oklch(40% 0.075 175)",
                    }}
                  />
                </div>
                <div style={{ fontSize: 13.5, lineHeight: 1.5, color: "oklch(45% 0.012 80)" }}>
                  Disconnect at any time — scanning stops immediately.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
